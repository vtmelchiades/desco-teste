import {
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

const vertexShader = /* glsl */ `
  uniform vec2 uVelocity;
  uniform vec2 uPlaneRes;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 pxToLocal = 1.0 / max(uPlaneRes, vec2(1.0));
    pos.x += sin(uv.y * 3.14159) * uVelocity.x * 14.0 * pxToLocal.x;
    pos.y += sin(uv.x * 3.14159) * uVelocity.y * 14.0 * pxToLocal.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uImageRes;
  uniform vec2 uPlaneRes;
  uniform vec2 uVelocity;
  uniform float uHover;
  uniform float uReveal;
  uniform float uTime;
  uniform float uGrain;
  uniform float uMobile;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 plane, vec2 img) {
    float pr = plane.x / plane.y;
    float ir = img.x / img.y;
    vec2 s = (pr > ir) ? vec2(1.0, ir / pr) : vec2(pr / ir, 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    float zoom = 1.0 - uHover * 0.06 - (1.0 - uReveal) * 0.18;
    vec2 base = (vUv - 0.5) * zoom + 0.5;
    vec2 uv = coverUv(base, uPlaneRes, uImageRes);

    float speed = length(uVelocity);
    vec2 dir = speed > 0.0001 ? uVelocity / speed : vec2(0.0, 1.0);
    float amt = clamp(speed, 0.0, 1.0);

    vec2 radial = (uv - 0.5);
    vec2 caOffset = dir * amt * 0.028 + radial * amt * 0.035 + radial * uHover * 0.006;

    const int TAPS = 9;
    int taps = uMobile > 0.5 ? 5 : TAPS;
    float blurLen = amt * 0.07;

    vec3 col = vec3(0.0);
    float total = 0.0;
    for (int i = 0; i < TAPS; i++) {
      if (i >= taps) break;
      float t = (float(i) / float(taps - 1)) - 0.5;
      vec2 o = dir * t * blurLen;
      float w = 1.0 - abs(t) * 1.3;
      col.r += texture2D(uTexture, uv + o + caOffset).r * w;
      col.g += texture2D(uTexture, uv + o).g * w;
      col.b += texture2D(uTexture, uv + o - caOffset).b * w;
      total += w;
    }
    col /= total;

    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum) * 0.6, col, smoothstep(0.0, 1.0, uReveal));
    col += amt * 0.08 * vec3(0.8, 1.0, 0.0);

    float g = hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5;
    col += g * uGrain;

    float edge = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y)
               * smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
    float mask = step(1.0 - uReveal, vUv.y);
    float alpha = mask * mix(0.85, 1.0, edge);

    gl_FragColor = vec4(col, alpha);
  }
`;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Plane = {
  el: HTMLElement;
  mesh: Mesh<PlaneGeometry, ShaderMaterial>;
  docTop: number;
  docLeft: number;
  width: number;
  height: number;
  loaded: boolean;
  inView: boolean;
  revealed: boolean;
  hoverTarget: number;
  revealTarget: number;
};

type GLElement = HTMLElement & { __glCleanup?: () => void };

export class GLScene {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  scene = new Scene();
  camera: OrthographicCamera;
  isTouch: boolean;
  planes = new Map<HTMLElement, Plane>();
  geometry = new PlaneGeometry(1, 1, 24, 24);
  loader = new TextureLoader();
  textureCache = new Map<string, Texture>();
  vw = 1;
  vh = 1;
  velocity = new Vector2(0, 0);
  pointerVel = new Vector2(0, 0);
  scrollVel = 0;
  lastPointer: { x: number; y: number } | null = null;
  pointerMovedThisFrame = false;
  disposed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.isTouch = window.matchMedia("(pointer: coarse)").matches;
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.camera = new OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
    this.camera.position.z = 10;
    this.loader.setCrossOrigin("anonymous");
    this.resize();
    this.bindInput();
  }

  onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "touch") this.pushPointer(e.clientX, e.clientY, 1);
  };
  onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) this.lastPointer = { x: t.clientX, y: t.clientY };
  };
  onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) this.pushPointer(t.clientX, t.clientY, 2.2);
  };
  onTouchEnd = () => {
    this.lastPointer = null;
  };
  onResize = () => this.resize();

  pushPointer(x: number, y: number, mult: number) {
    if (this.lastPointer) {
      const dx = (x - this.lastPointer.x) / this.vw;
      const dy = (y - this.lastPointer.y) / this.vh;
      this.pointerVel.x = lerp(this.pointerVel.x, dx * 14 * mult, 0.6);
      this.pointerVel.y = lerp(this.pointerVel.y, -dy * 14 * mult, 0.6);
      this.pointerMovedThisFrame = true;
    }
    this.lastPointer = { x, y };
  }

  bindInput() {
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("touchstart", this.onTouchStart, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: true });
    window.addEventListener("touchend", this.onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", this.onTouchEnd, { passive: true });
    window.addEventListener("resize", this.onResize);
    window.addEventListener("orientationchange", this.onResize);
  }
  unbindInput() {
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchcancel", this.onTouchEnd);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("orientationchange", this.onResize);
  }

  setScroll(_scroll: number, velocity: number) {
    this.scrollVel = velocity;
  }

  resize() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.vw, this.vh, false);
    this.camera.left = -this.vw / 2;
    this.camera.right = this.vw / 2;
    this.camera.top = this.vh / 2;
    this.camera.bottom = -this.vh / 2;
    this.camera.updateProjectionMatrix();
  }

  measure(p: Plane) {
    const r = p.el.getBoundingClientRect();
    p.docTop = r.top;
    p.docLeft = r.left;
    if (r.width !== p.width || r.height !== p.height) {
      p.width = r.width;
      p.height = r.height;
      p.mesh.scale.set(Math.max(1, r.width), Math.max(1, r.height), 1);
      (p.mesh.material.uniforms.uPlaneRes.value as Vector2).set(r.width, r.height);
    }
  }

  budgetSrc(src: string) {
    if (!this.isTouch) return src;
    return src.replace(/w_(\d+),h_(\d+)/, (_m, w: string, h: string) => {
      const W = parseInt(w, 10);
      const H = parseInt(h, 10);
      if (W <= 900) return `w_${W},h_${H}`;
      const f = 900 / W;
      return `w_${Math.round(W * f)},h_${Math.round(H * f)}`;
    });
  }

  register(el: HTMLElement, src: string, imgW: number, imgH: number) {
    if (this.planes.has(el)) return;
    const url = this.budgetSrc(src);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTexture: { value: null },
        uImageRes: { value: new Vector2(imgW, imgH) },
        uPlaneRes: { value: new Vector2(1, 1) },
        uVelocity: { value: this.velocity },
        uHover: { value: 0 },
        uReveal: { value: 0 },
        uTime: { value: 0 },
        uGrain: { value: 0.045 },
        uMobile: { value: this.isTouch ? 1 : 0 },
      },
    });
    const mesh = new Mesh(this.geometry, material);
    mesh.visible = false;
    mesh.frustumCulled = false;
    this.scene.add(mesh);
    const plane: Plane = {
      el,
      mesh,
      docTop: 0,
      docLeft: 0,
      width: 1,
      height: 1,
      loaded: false,
      inView: false,
      revealed: false,
      hoverTarget: 0,
      revealTarget: 0,
    };
    this.planes.set(el, plane);

    const cached = this.textureCache.get(url);
    if (cached) {
      material.uniforms.uTexture.value = cached;
      const img = cached.image as HTMLImageElement | undefined;
      if (img?.width) (material.uniforms.uImageRes.value as Vector2).set(img.width, img.height);
      plane.loaded = true;
      el.classList.add("gl-loaded");
    } else {
      this.loader.load(
        url,
        (tex) => {
          if (this.disposed) return;
          tex.colorSpace = SRGBColorSpace;
          tex.minFilter = LinearMipmapLinearFilter;
          tex.magFilter = LinearFilter;
          tex.generateMipmaps = true;
          tex.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
          tex.needsUpdate = true;
          this.textureCache.set(url, tex);
          const img = tex.image as HTMLImageElement;
          (material.uniforms.uImageRes.value as Vector2).set(img.width, img.height);
          material.uniforms.uTexture.value = tex;
          plane.loaded = true;
          el.classList.add("gl-loaded");
        },
        undefined,
        () => el.classList.add("gl-failed"),
      );
    }

    const enter = () => (plane.hoverTarget = 1);
    const leave = () => (plane.hoverTarget = 0);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    (el as GLElement).__glCleanup = () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }

  unregister(el: HTMLElement) {
    const p = this.planes.get(el);
    if (!p) return;
    (el as GLElement).__glCleanup?.();
    this.scene.remove(p.mesh);
    p.mesh.material.dispose();
    this.planes.delete(el);
  }

  pulse(v = 0.6) {
    this.pointerVel.y = v;
  }

  render(time: number) {
    if (this.disposed) return;
    const sv = MathUtils.clamp((this.scrollVel / this.vh) * 6, -1.2, 1.2);
    const target = new Vector2(this.pointerVel.x, this.pointerVel.y + sv);
    const len = target.length();
    if (len > 1) target.multiplyScalar(1 / len);
    const accelerating = target.length() > this.velocity.length();
    this.velocity.lerp(target, accelerating ? 0.18 : 0.075);
    if (this.velocity.length() < 6e-4) this.velocity.set(0, 0);
    if (!this.pointerMovedThisFrame) this.pointerVel.multiplyScalar(0.78);
    this.pointerMovedThisFrame = false;
    this.scrollVel *= 0.85;

    const hw = this.vw / 2;
    const hh = this.vh / 2;
    const t = time * 0.001;

    this.planes.forEach((p) => {
      this.measure(p);
      const top = p.docTop;
      const inView = top < this.vh + 120 && top + p.height > -120;
      p.inView = inView;
      p.mesh.visible = inView && p.loaded;
      if (!inView) return;
      const x = p.docLeft + p.width / 2 - hw;
      const y = -(top + p.height / 2 - hh);
      p.mesh.position.set(x, y, 0);
      if (p.loaded && !p.revealed && top < this.vh * 0.92) {
        p.revealed = true;
        p.revealTarget = 1;
      }
      const u = p.mesh.material.uniforms;
      u.uTime.value = t;
      u.uHover.value = lerp(u.uHover.value as number, p.hoverTarget, 0.08);
      u.uReveal.value = lerp(u.uReveal.value as number, p.revealTarget, 0.045);
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.unbindInput();
    this.planes.forEach((p) => p.mesh.material.dispose());
    this.planes.clear();
    this.textureCache.forEach((t) => t.dispose());
    this.textureCache.clear();
    this.geometry.dispose();
    this.renderer.dispose();
  }
}

export function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}
