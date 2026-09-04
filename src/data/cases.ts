export type MediaItem =
  | { type: "image"; id: string; w: number; h: number; alt?: string; span?: "full" | "half" | "third" }
  | { type: "video"; youtubeId: string; poster?: string; title: string; span?: "full" | "half" };

export type CaseSection = {
  heading?: string;
  paragraphs: string[];
  media?: MediaItem[];
};

export type CaseDetail = {
  /** Frase de abertura em destaque (voz Desco). */
  lead: string;
  /** Texto original do case, em parágrafos. */
  body: string[];
  deliverables: string[];
  /** Mídia principal logo abaixo do texto. */
  featured?: MediaItem;
  /** Galeria / blocos adicionais. */
  sections?: CaseSection[];
  externalLink?: { label: string; href: string };
};

export type CaseItem = {
  index: string;
  slug?: string; // se ausente, sem página própria (link externo)
  client: string;
  title: string;
  discipline: string;
  year: string;
  id: string; // thumbnail
  ratio: number;
  texW: number;
  texH: number;
  statement: string;
  tags: string[];
  detail?: CaseDetail;
};

export const SITE_CASES_URL = "https://www.agenciadesco.com/cases";

export const FEATURED_CASES: CaseItem[] = [
  {
    index: "01",
    slug: "noroeste-paixao-pelo-que-somos",
    client: "E.C. Noroeste",
    title: "Paixão pelo que somos",
    discipline: "Identidade de torcida / Campanha institucional",
    year: "2025",
    id: "30f9f1_bcd23c46d12e4fd9b79de86e66dd24cb~mv2.jpg",
    ratio: 16 / 9,
    texW: 1600,
    texH: 900,
    statement:
      "Um clube de 1910 não precisa ser lembrado. Precisa ser sentido. Trocamos a nostalgia por um manifesto de pertencimento escrito no presente do indicativo.",
    tags: ["Estratégia", "Filme", "Arquibancada"],
    detail: {
      lead: "Mais do que comunicação: uma imersão na paixão de ser Norusca — e a tradução disso em marca, campanha e conteúdo.",
      body: [
        "O projeto com o Noroeste foi mais do que um simples trabalho de comunicação. Foi uma verdadeira imersão na paixão do clube e sua torcida.",
        "Desde o momento em que arrumamos a casa, com a criação de um manual de marca e a definição de uma nova campanha, até a humanização das mídias e o fortalecimento da conexão com a torcida, o objetivo sempre foi traduzir o orgulho e essa paixão de ser Norusca que abrange gerações.",
        "A entrada na Série A1 do Paulistão exigia algo à altura, e conseguimos criar algo que refletisse o novo momento do clube e toda sua torcida: “Paixão Pelo Que Somos”. O novo visual, com cores marcantes e conteúdo relevante, rapidamente ganhou força nas redes sociais, gerando números impressionantes de engajamento.",
        "E tudo foi possível graças a uma equipe empenhada e apaixonada.",
      ],
      deliverables: ["Manual de marca", "Plataforma de campanha", "Filme manifesto", "Conteúdo para redes", "Identidade de arquibancada"],
      featured: {
        type: "video",
        youtubeId: "zATSyzcpCeI",
        poster: "30f9f1_ddf6346adfe746d9b85e41369d520d9a~mv2.jpg",
        title: "E.C. Noroeste — Paixão pelo que somos (filme)",
      },
      sections: [
        {
          heading: "Sistema visual",
          paragraphs: [
            "Cores marcantes, tipografia de impacto e uma linguagem que funciona igual no telão do estádio e no story de 15 segundos.",
          ],
          media: [
            { type: "image", id: "30f9f1_f78e5d9cf9534dd09f81d643f57f2492~mv2.jpg", w: 3000, h: 828, span: "full" },
            { type: "image", id: "30f9f1_ed549638009142738d69aa70ca84cfce~mv2.jpg", w: 8000, h: 4500, span: "full" },
          ],
        },
      ],
    },
  },
  {
    index: "02",
    slug: "tintas-maestria-sao-paulo-morumbis",
    client: "Tintas Maestria",
    title: "São Paulo Futebol Clube",
    discipline: "Licenciamento / Campanha de lançamento",
    year: "2024",
    id: "30f9f1_cb1c16e0737844409c35911a832cdf4c~mv2.jpg",
    ratio: 1712 / 648,
    texW: 1712,
    texH: 648,
    statement:
      "Uma marca regional de tintas assina com o Tricolor. A tentação era gritar. Escolhemos a precisão: o produto como uniforme, a parede como campo.",
    tags: ["Parceria", "KV", "Ponto de venda"],
    detail: {
      lead: "Uma parceria de campeões. A Maestria é a tinta do São Paulo Futebol Clube — e o MorumBIS é a prova.",
      body: [
        "Buscamos mostrar e ressaltar que a Maestria é a tinta do São Paulo Futebol Clube, apresentando como essa história iniciou; os projetos realizados através dessa parceria, como a pintura do gramado do Morumbi e a criação da tinta feita especialmente para as cadeiras da arquibancada do estádio; e exaltar os produtos Maestria, principalmente o Stadium Plus.",
      ],
      deliverables: ["Filme institucional", "Key visual", "Conteúdo digital", "Material de ponto de venda"],
      featured: {
        type: "video",
        youtubeId: "JJJhAPUTGSg",
        poster: "30f9f1_9129c9370c924790af575becde1a3df4~mv2.jpg",
        title: "Tintas Maestria — Parceria São Paulo F.C.",
      },
      sections: [
        {
          heading: "Do gramado à arquibancada",
          paragraphs: [
            "A tinta que pinta o gramado, as cadeiras e os corredores do MorumBIS é a mesma que vai para a parede da sua casa. Esse foi o argumento — e ele não precisou de exagero.",
          ],
          media: [
            { type: "image", id: "30f9f1_7d0d26f19b044fc5ae6eaf256bf567ba~mv2.jpg", w: 900, h: 900, span: "half" },
            { type: "image", id: "30f9f1_cb1c16e0737844409c35911a832cdf4c~mv2.jpg", w: 1712, h: 648, span: "half" },
          ],
        },
      ],
    },
  },
  {
    index: "03",
    slug: "picinin-meio-seculo-em-familia",
    client: "Picinin Alimentos",
    title: "Meio século em família",
    discipline: "Campanha comemorativa 50 anos",
    year: "2024",
    id: "30f9f1_b516eb5e7cba4a7ba9bb3c41d7d506f4~mv2.jpg",
    ratio: 1712 / 648,
    texW: 1712,
    texH: 648,
    statement:
      "Cinquenta anos cabem em uma mesa. Documentamos a família real, sem figurantes, e deixamos que a comida fizesse o discurso.",
    tags: ["Documental", "Institucional", "Embalagem"],
    detail: {
      lead: "O que são 50 anos? Para a Picinin, meio século de existência cabe em uma palavra: família.",
      body: [
        "O que são 50 anos? Um marco importante para uma empresa, são meio século de existência! Para a Picinin Alimentos, este marco se expressa na campanha “Meio Século em Família”.",
        "Através do audiovisual, nosso objetivo foi passar um sentimento familiar, com a Picinin fazendo parte dos momentos ao redor da mesa e das diferentes famílias que existem, e mostrar a conexão dos laços familiares que são unidos pelos sentimentos e pela comida, porque a comida faz parte dos legados, memórias e histórias de uma família.",
      ],
      deliverables: ["Filme institucional", "Série de filmes curtos", "Conteúdo para TV e digital", "Selo comemorativo"],
      featured: {
        type: "video",
        youtubeId: "gexIicazIxg",
        poster: "30f9f1_0cad99ca00544299bbabab9ec4656d18~mv2.jpg",
        title: "Picinin — Meio Século em Família (filme)",
      },
      sections: [
        {
          heading: "Uma mesa, muitas famílias",
          paragraphs: [
            "Cada filme acompanha uma família diferente. Nenhuma delas é igual à outra — e é exatamente isso que as une à marca.",
          ],
          media: [
            {
              type: "video",
              youtubeId: "Wa03trR3qdQ",
              poster: "30f9f1_fb3196ec819443b98b7e3aeb1bdb7d8e~mv2.jpg",
              title: "Picinin — Meio Século em Família (2)",
              span: "half",
            },
            {
              type: "video",
              youtubeId: "oAMYOXwqfEI",
              poster: "30f9f1_46fa8c13fe4b460ba6259d82a90f4347~mv2.jpg",
              title: "Picinin — Meio Século em Família (3)",
              span: "half",
            },
            {
              type: "video",
              youtubeId: "7HhP9ZkTX6E",
              title: "Picinin — Meio Século em Família (4)",
              span: "full",
            },
          ],
        },
      ],
    },
  },
  {
    index: "04",
    client: "Copical Tintas",
    title: "É sempre Copical",
    discipline: "Posicionamento / Plataforma de marca",
    year: "2023",
    id: "30f9f1_6b0734484b0142468ceaf7c2ab4d3c17~mv2.jpg",
    ratio: 1712 / 648,
    texW: 1712,
    texH: 648,
    statement:
      "Uma frase que funciona como carimbo. Repetível, teimosa, impossível de confundir. A plataforma que sustentou a virada dos 50 anos da marca.",
    tags: ["Plataforma", "Assinatura", "Filme 50 anos"],
  },
  {
    index: "05",
    slug: "quem-faz-faz-fib",
    client: "FIB",
    title: "Quem faz, faz FIB",
    discipline: "Campanha de vestibular",
    year: "2025",
    id: "30f9f1_7e3911f67be14e9fa5d749fdb57ffc34~mv2.jpg",
    ratio: 3000 / 1490,
    texW: 1600,
    texH: 795,
    statement:
      "Vestibular não se vende com sorriso de banco de imagem. Colocamos alunos reais fazendo coisas reais e transformamos o verbo em pertencimento.",
    tags: ["Educação", "Social", "OOH"],
    detail: {
      lead: "Mais do que uma campanha de vestibular: um projeto completo de construção de marca para o Vestibular 2026.",
      body: [
        "Para a campanha do Vestibular 2026, assumimos o desafio de criar não apenas uma comunicação de impacto, mas uma experiência integrada de marca que acompanhasse o candidato em cada etapa do processo.",
        "Desenvolvemos todo o conceito criativo, KV e a tag que guiou a campanha: Quem Faz, Faz FIB!",
        "A partir dela, construímos um ecossistema completo de comunicação: filme para TV, conteúdos digitais, spot de rádio, materiais impressos, flyers, anúncios e todas as peças necessárias para uma campanha de vestibular sólida e memorável.",
        "Cada detalhe foi pensado, produzido e acompanhado de perto pela agência, do primeiro rascunho até a entrega final e monitoramento dos resultados.",
        "O resultado é uma campanha forte, coerente e totalmente alinhada ao posicionamento da instituição, reforçando a essência de quem faz, acontece e transforma.",
      ],
      deliverables: ["Conceito e KV", "Filme para TV", "Spot de rádio", "Conteúdo digital", "Impressos e OOH", "Monitoramento de resultados"],
      featured: {
        type: "video",
        youtubeId: "G2Mofd-DMl8",
        poster: "30f9f1_5c6c01f9ed8e472aad9140f986903c21~mv2.jpg",
        title: "FIB — Quem Faz, Faz FIB (filme)",
      },
      sections: [
        {
          heading: "Alunos reais, ação real",
          paragraphs: [
            "Sem banco de imagem. Quem aparece na campanha é quem faz a FIB acontecer todos os dias — em sala, no laboratório e na rua.",
          ],
          media: [
            { type: "image", id: "30f9f1_b23bdc282188442d931d59d06ff94b85~mv2.jpg", w: 4829, h: 3219, span: "half" },
            { type: "image", id: "30f9f1_e7e3f68802b143fd9e9ff6d88148f9d8~mv2.jpg", w: 6000, h: 4000, span: "half" },
            { type: "image", id: "30f9f1_abccee5a70924722b212a488f29b1b0d~mv2.jpg", w: 1920, h: 1289, span: "full" },
          ],
        },
      ],
      externalLink: {
        label: "Veja os outros vídeos da campanha",
        href: "https://www.youtube.com/playlist?list=PLcngR1s-HiG0TIG4I3WoOCGxDoiMH2idw",
      },
    },
  },
  {
    index: "06",
    slug: "case-coala-original-como-voce-eliana",
    client: "Coala Essências",
    title: "Original como você",
    discipline: "Branding / Campanha de produto",
    year: "2023",
    id: "30f9f1_8bc2c333b4704f1aa9caa50e86414dd2~mv2.jpg",
    ratio: 1712 / 648,
    texW: 1712,
    texH: 648,
    statement:
      "Perfumaria fala de desejo com clichês. Falamos de identidade com fatos: cada frasco é uma assinatura, não uma imitação.",
    tags: ["Branding", "Fotografia", "Varejo"],
    detail: {
      lead: "Uma tagline para aproximar quem usa Coala há mais de 30 anos — no momento em que a marca lança novas linhas e entra em novos mercados.",
      body: [
        "Criação de uma tagline que aproximasse o público que há mais de 30 anos utiliza os produtos, em um momento que a marca está lançando diversas novas linhas e entrando em mercados diferenciados.",
      ],
      deliverables: ["Tagline e conceito", "Estratégia de redes sociais", "VT com Eliana", "Merchan SBT"],
      featured: {
        type: "image",
        id: "30f9f1_6f1fba3dc8c842d39a1480f01d6cbff2~mv2.jpg",
        w: 2000,
        h: 850,
        alt: "Coala Essências — Original como você, com Eliana",
      },
      sections: [
        {
          heading: "Digital · Pré-lançamento",
          paragraphs: [
            "Estratégia de redes sociais com interação direta com o público.",
            "Criação de VT com a apresentadora Eliana como garota-propaganda. O vídeo foi utilizado como apoio dentro dos merchans nacionais.",
          ],
          media: [
            {
              type: "video",
              youtubeId: "Mz7lnAeqk9A",
              poster: "30f9f1_a51e22e7123140c8a340293287269af2~mv2.jpg",
              title: "Coala — Original como você (VT com Eliana)",
              span: "full",
            },
            { type: "image", id: "30f9f1_5f7e2ba0ba334b2f893dfe4e4736fd33~mv2.jpg", w: 1024, h: 827, span: "half" },
            { type: "image", id: "30f9f1_2028f46e8463488fa8841d24b1434ea4~mv2.jpg", w: 1024, h: 711, span: "half" },
          ],
        },
        {
          heading: "Merchan",
          paragraphs: ["Com apresentadores renomados do SBT, nos programas de maior audiência da emissora."],
          media: [
            {
              type: "video",
              youtubeId: "UnuJU5MRbhA",
              poster: "30f9f1_78b65f9a8c22469c8bfd21693d02761e~mv2.jpg",
              title: "Coala — Merchan SBT (1)",
              span: "half",
            },
            {
              type: "video",
              youtubeId: "H9Jb7oasdtc",
              poster: "30f9f1_f53fed966dfd42448c843261285dfcae~mv2.jpg",
              title: "Coala — Merchan SBT (2)",
              span: "half",
            },
            {
              type: "video",
              youtubeId: "2-NsxhzVNqQ",
              poster: "30f9f1_b7dbd1e90e794d218a1233ce9950e285~mv2.jpg",
              title: "Coala — Merchan SBT (3)",
              span: "full",
            },
          ],
        },
      ],
    },
  },
  {
    index: "07",
    slug: "case-o-rei-do-deboche",
    client: "Açaí da Barra",
    title: "O rei do deboche",
    discipline: "Tom de voz / Conteúdo contínuo",
    year: "2023",
    id: "30f9f1_a0cae4fb61104bff8baa35be8c8894a9~mv2.jpg",
    ratio: 3000 / 1104,
    texW: 1600,
    texH: 589,
    statement:
      "Uma franquia de açaí com licença para rir de si mesma. Construímos um personagem, não um mascote — e ele responde comentário por comentário.",
    tags: ["Personagem", "Social", "Franquias"],
    detail: {
      lead: "A lenda que aparece todo verão e faz até quem não gosta de açaí, gostar. Com Tirullipa no comando.",
      body: [
        "Teve como principal objetivo a divulgação do novo garoto-propaganda da marca em sua campanha de verão, o humorista e influenciador Tirullipa. O mote criativo para desenvolvimento do roteiro da campanha veio das informações obtidas através das redes sociais, onde semanalmente recebemos relatos de pessoas que não gostavam de açaí e, ao provar o Açaí da Barra, começaram a gostar. Assim nasceu o Rei do Deboche, a lenda que aparece todo verão e faz até quem não gosta de açaí, gostar.",
        "Em um segundo momento da campanha, lançamos a vertente promocional, onde a cada R$ 25,00 em compras em qualquer unidade da franquia, o cliente ganhava um copo exclusivo, além, é claro, de sinalização interna e forte trabalho nas redes sociais.",
      ],
      deliverables: ["Personagem e roteiro", "Filmes de campanha", "Promoção e brinde", "Sinalização de loja", "Redes sociais"],
      featured: {
        type: "video",
        youtubeId: "0GTfior-FyU",
        poster: "30f9f1_b7e42cfcf10048ef88c6264aacbb1dda~mv2.jpg",
        title: "Açaí da Barra — O Rei do Deboche (filme)",
      },
      sections: [
        {
          heading: "A lenda em ação",
          paragraphs: ["Uma campanha construída para ser respondida. Cada filme abre uma conversa — e o Rei responde."],
          media: [
            {
              type: "video",
              youtubeId: "nCs0lZllTvE",
              poster: "30f9f1_9c077e22968c4f4983bd5882b9be093d~mv2.jpg",
              title: "Açaí da Barra — O Rei do Deboche (2)",
              span: "half",
            },
            {
              type: "video",
              youtubeId: "PoRQB0k7n7Y",
              poster: "30f9f1_1ff496a337304b65964bb549667026f8~mv2.jpg",
              title: "Açaí da Barra — O Rei do Deboche (3)",
              span: "half",
            },
          ],
        },
        {
          heading: "Promoção e ponto de venda",
          paragraphs: ["A cada R$ 25 em compras, um copo exclusivo. Sinalização interna e material de loja em todas as unidades da franquia."],
          media: [
            { type: "image", id: "30f9f1_da4c5553e85d463797546e3e2307a23b~mv2.jpg", w: 2000, h: 3125, span: "third" },
            { type: "image", id: "30f9f1_9a6daa4219494bfbbaadbe05c54abf8c~mv2.jpg", w: 1872, h: 972, span: "third" },
            { type: "image", id: "30f9f1_fcc7735c0f5d49c69bec757748fbb756~mv2.jpg", w: 1872, h: 972, span: "third" },
            { type: "image", id: "30f9f1_65630afda2734aa29750dff28c33f8d4~mv2.jpg", w: 1872, h: 972, span: "half" },
            { type: "image", id: "30f9f1_75bb3db985ed4ec0b7e4707ad451f99b~mv2.jpg", w: 1872, h: 972, span: "half" },
            { type: "image", id: "30f9f1_7b5c19590e1b41e9b8b07bce85221287~mv2.jpg", w: 1024, h: 532, span: "full" },
          ],
        },
      ],
    },
  },
  {
    index: "08",
    client: "Franzolin",
    title: "Nações Timburi",
    discipline: "Lançamento imobiliário",
    year: "2023",
    id: "30f9f1_842f4706e0b8448a89d37ee887ab8fea~mv2.jpg",
    ratio: 3000 / 1145,
    texW: 1600,
    texH: 611,
    statement:
      "Loteamento é promessa de futuro vendida no presente. Tiramos o render brilhante da frente e colocamos o terreno, a rua e o horizonte.",
    tags: ["Imobiliário", "Lançamento", "Mídia"],
  },
];

export const ARCHIVE_CASES: CaseItem[] = [
  {
    index: "09",
    slug: "multiway-so-a-maestria-tem",
    client: "Tintas Maestria",
    title: "Multiway só a Maestria tem",
    discipline: "Lançamento de produto",
    year: "2024",
    id: "30f9f1_d731c907f90748c089fe6ee946e8328c~mv2.jpg",
    ratio: 1712 / 648,
    texW: 856,
    texH: 324,
    statement: "",
    tags: ["Produto"],
    detail: {
      lead: "Humor como ferramenta de lançamento: nova embalagem, mesma tecnologia exclusiva — e só a Maestria tem.",
      body: [
        "Partindo de uma vertente humorística para o audiovisual, a campanha “Multiway só a Maestria Tem” surgiu para marcar o lançamento e divulgação do produto – agora com uma nova embalagem –, ressaltando a tecnologia exclusiva da Tintas Maestria sobre a linha Multiway.",
      ],
      deliverables: ["Conceito de campanha", "Filmes", "Conteúdo digital", "Material de ponto de venda"],
      featured: {
        type: "video",
        youtubeId: "gpGV5_XjJ3w",
        poster: "30f9f1_cf722916b7ba46d0992af0979bcebe29~mv2.jpg",
        title: "Tintas Maestria — Multiway só a Maestria tem (filme 1)",
      },
      sections: [
        {
          heading: "Segundo filme e embalagem",
          paragraphs: ["A nova embalagem no centro da cena. O humor abre a porta; a tecnologia fecha o argumento."],
          media: [
            {
              type: "video",
              youtubeId: "Hl7mcSUnkHk",
              poster: "30f9f1_1e2d393fafd343dfa33258778654a0bd~mv2.jpg",
              title: "Tintas Maestria — Multiway só a Maestria tem (filme 2)",
              span: "full",
            },
            { type: "image", id: "30f9f1_047bd5d47d5b4a5db31f58548413ed26~mv2.jpg", w: 1920, h: 1080, span: "full" },
          ],
        },
      ],
    },
  },
  {
    index: "10",
    client: "Tintas Maestria",
    title: "Confut Sudamericana",
    discipline: "Ativação / Evento",
    year: "2024",
    id: "30f9f1_11d53916c9f444a1abb27dea877bdf51~mv2.jpg",
    ratio: 16 / 9,
    texW: 960,
    texH: 540,
    statement: "",
    tags: ["Evento"],
  },
  {
    index: "11",
    client: "Witzler Energia",
    title: "Energia move tudo",
    discipline: "Campanha institucional",
    year: "2024",
    id: "30f9f1_86f3a40076484370b00ad4e4cae55325~mv2.jpg",
    ratio: 1,
    texW: 800,
    texH: 800,
    statement: "",
    tags: ["Energia"],
  },
  {
    index: "12",
    client: "Mezzani Alimentos",
    title: "Selo 79 anos",
    discipline: "Design / Embalagem",
    year: "2024",
    id: "30f9f1_dea334fdd33f4c15a7db8229e8fc228c~mv2.jpg",
    ratio: 16 / 9,
    texW: 960,
    texH: 540,
    statement: "",
    tags: ["Design"],
  },
  {
    index: "13",
    client: "Jalovi Papelaria",
    title: "Volta às aulas 2025",
    discipline: "Campanha sazonal",
    year: "2025",
    id: "30f9f1_b4e599b185fc4aebae93e455c598e453~mv2.jpg",
    ratio: 16 / 9,
    texW: 960,
    texH: 540,
    statement: "",
    tags: ["Varejo"],
  },
  {
    index: "14",
    client: "Zella",
    title: "Redesign + campanha institucional",
    discipline: "Identidade visual",
    year: "2023",
    id: "30f9f1_0ff58e25e6264db382168ad035e92c72~mv2.jpg",
    ratio: 1278 / 543,
    texW: 1278,
    texH: 543,
    statement: "",
    tags: ["Identidade"],
  },
  {
    index: "15",
    client: "Bild",
    title: "Reativação Lafite",
    discipline: "Imobiliário",
    year: "2023",
    id: "30f9f1_c016a7398e404874b6301fc660d51f6d~mv2.jpg",
    ratio: 1920 / 780,
    texW: 1200,
    texH: 488,
    statement: "",
    tags: ["Imobiliário"],
  },
  {
    index: "16",
    client: "Dilute Premium",
    title: "Mix Now",
    discipline: "Lançamento de produto",
    year: "2024",
    id: "30f9f1_18876ddef31845cbac5aa876c52b631f~mv2.jpg",
    ratio: 1,
    texW: 800,
    texH: 800,
    statement: "",
    tags: ["Bebidas"],
  },
  {
    index: "17",
    slug: "case-picinin-feijao-premium",
    client: "Picinin Alimentos",
    title: "Feijão que dá gosto",
    discipline: "Campanha de produto",
    year: "2023",
    id: "30f9f1_ae0f12b604b54c0eade808f16af5538b~mv2.jpg",
    ratio: 1712 / 648,
    texW: 856,
    texH: 324,
    statement: "",
    tags: ["Alimentos"],
    detail: {
      lead: "Uma campanha que dá gosto: TV, redes, ponto de venda e endomarketing para o Feijão Premium Picinin 2023.",
      body: [
        "Uma campanha que dá gosto! Assim é a campanha do Feijão Premium Picinin 2023. Com um time incrível, desenvolvemos o planejamento de campanha que vai desde vídeos para a TV, redes sociais, sinalização de ponto de venda, endomarketing e muito mais!",
      ],
      deliverables: ["Planejamento de campanha", "Filme para TV", "Redes sociais", "Ponto de venda", "Endomarketing", "Merchan e conteúdo editorial"],
      featured: {
        type: "video",
        youtubeId: "rywvF1sXp8M",
        poster: "30f9f1_5a803947238d433bbfab9b44cbf6096b~mv2.jpg",
        title: "Picinin — Feijão que dá gosto (filme)",
      },
      sections: [
        {
          heading: "Campanha",
          paragraphs: ["O produto no centro da mesa e a mesa no centro da casa. Fotografia e filme com a mesma luz e o mesmo apetite."],
          media: [
            { type: "image", id: "30f9f1_650ebd85e1ac4c0eb2816ff51b83e9a8~mv2.jpg", w: 2000, h: 850, span: "full" },
            { type: "image", id: "30f9f1_1e6eab4f7cee44eba5c47ee56cc24ceb~mv2.jpg", w: 5507, h: 3671, span: "half" },
            { type: "image", id: "30f9f1_050b23cb70384808af26a1cc90d4b4fe~mv2.jpg", w: 4492, h: 2995, span: "half" },
            { type: "image", id: "30f9f1_876d9bad62eb405eaaabdedc56a310dd~mv2.jpg", w: 1920, h: 1080, span: "full" },
          ],
        },
        {
          heading: "Merchan · Revista de Sábado",
          paragraphs: [
            "Colaboramos com o Revista de Sábado para integrar a campanha em um episódio especial. Durante o programa, foi apresentado o produto, destacando sua qualidade, e uma receita deliciosa, incentivando os telespectadores a experimentar o Feijão Premium Picinin.",
          ],
          media: [
            { type: "image", id: "30f9f1_9292786bba7f4b4ea26c6982d3f2baaf~mv2.jpg", w: 1920, h: 764, span: "half" },
            { type: "image", id: "30f9f1_8d092bf3fa1a4d5e8d00022897c3729e~mv2.jpg", w: 1920, h: 764, span: "half" },
            { type: "image", id: "30f9f1_36143a9f2c2e44dd9f9a4df4634d1d9c~mv2.jpg", w: 1920, h: 764, span: "half" },
            { type: "image", id: "30f9f1_c6c0c86db55a4e92a1d5bac6fc77895e~mv2.jpg", w: 1920, h: 764, span: "half" },
          ],
        },
        {
          heading: "Especial publicitário · G1",
          paragraphs: [
            "Em parceria com o G1, um dos principais portais de notícias do Brasil, levamos conteúdos concentrados em matérias informativas sobre o feijão, incluindo curiosidades, sua história e sua importância.",
          ],
          media: [
            { type: "image", id: "30f9f1_3a279beb36bb45919d698142a3f2c67c~mv2.jpg", w: 1920, h: 764, span: "full" },
            { type: "image", id: "30f9f1_35ee72edceb6415abf7ea5b79c33930b~mv2.jpg", w: 1920, h: 743, span: "half" },
            { type: "image", id: "30f9f1_410dd4d9fbd249c3a75a01f5382e35c4~mv2.jpg", w: 1920, h: 743, span: "half" },
            { type: "image", id: "30f9f1_5c6cb1d07db942b8855f233e47a96c56~mv2.jpg", w: 1920, h: 737, span: "half" },
            { type: "image", id: "30f9f1_deda3012b2f649708b570ed55b7e00a8~mv2.jpg", w: 1920, h: 737, span: "half" },
            { type: "image", id: "30f9f1_3b71b64ca3c842c1a4918bb3c019de15~mv2.jpg", w: 1920, h: 612, span: "full" },
          ],
        },
      ],
    },
  },
  {
    index: "18",
    client: "Copical Tintas",
    title: "Campanha 50 anos",
    discipline: "Filme institucional",
    year: "2024",
    id: "30f9f1_a1d1e5ceb1f9462db5e2f9f11f6d502d~mv2.jpg",
    ratio: 16 / 9,
    texW: 960,
    texH: 540,
    statement: "",
    tags: ["Filme"],
  },
];

export const ALL_CASES = [...FEATURED_CASES, ...ARCHIVE_CASES];
export const CASES_WITH_PAGE = ALL_CASES.filter((c) => c.slug && c.detail);

export function getCaseBySlug(slug: string) {
  return CASES_WITH_PAGE.find((c) => c.slug === slug);
}

export function getAdjacentCases(slug: string) {
  const i = CASES_WITH_PAGE.findIndex((c) => c.slug === slug);
  const n = CASES_WITH_PAGE.length;
  return {
    prev: CASES_WITH_PAGE[(i - 1 + n) % n],
    next: CASES_WITH_PAGE[(i + 1) % n],
  };
}

export function caseHref(c: CaseItem) {
  return c.slug && c.detail ? `/cases/${c.slug}` : SITE_CASES_URL;
}
