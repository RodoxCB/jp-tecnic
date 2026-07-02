export const SITE = {
  name: "JP Tecnic",
  tagline: "A gente cuida do seu celular como se fosse nosso",
  instagram: "https://www.instagram.com/jp_tecnic/",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5527997169987",
  whatsappMessage:
    "Oi! Vi o site da JP Tecnic e preciso de uma ajuda. Meu celular está assim:",
  schedule: "De segunda a sábado, das 8h às 18h",
  regions: [
    "Domingos Martins",
    "Paraju",
    "Marechal Floriano",
    "Ponto Alto",
  ],
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
] as const;

export const SERVICES = [
  {
    icon: "smartphone",
    title: "Troca de tela",
    description:
      "Tela trincada ou com mancha? A gente troca com cuidado e usa peça de qualidade.",
  },
  {
    icon: "battery",
    title: "Troca de bateria",
    description:
      "Celular descarregando rápido demais? Colocamos bateria nova pra você voltar a usar tranquilo.",
  },
  {
    icon: "cpu",
    title: "Reparo em placa",
    description:
      "Problema por dentro do aparelho? Olhamos com calma, explicamos o que achamos e consertamos direitinho.",
  },
  {
    icon: "plug",
    title: "Problemas de carregamento",
    description:
      "Não carrega ou só carrega de um jeito? Descobrimos se é conector, cabo ou placa e resolvemos.",
  },
  {
    icon: "settings",
    title: "Formatação e otimização",
    description:
      "Celular lento ou travando? Deixamos o sistema mais leve pra você usar no dia a dia.",
  },
  {
    icon: "shield",
    title: "Remoção de conta Google (FRP)",
    description:
      "Precisa tirar conta Google do aparelho? Fazemos com segurança e te explicamos cada passo.",
  },
  {
    icon: "apple",
    title: "Remoção de conta Apple",
    description:
      "Cada caso é diferente. Manda mensagem que a gente analisa o seu e te fala o que dá pra fazer.",
  },
] as const;

export const STEPS = [
  {
    step: 1,
    title: "Você chama a gente no WhatsApp",
    description: "É só mandar uma mensagem contando o que aconteceu. Simples assim.",
  },
  {
    step: 2,
    title: "Conta o que está acontecendo",
    description: "Quanto mais você explicar, mais fácil fica pra gente entender o problema.",
  },
  {
    step: 3,
    title: "Recebe valor e prazo na hora",
    description: "Passamos o orçamento sem enrolação. Você decide se quer seguir ou não.",
  },
  {
    step: 4,
    title: "Fazemos o serviço com transparência",
    description: "Você fica sabendo o que estamos fazendo. Sem surpresa no meio do caminho.",
  },
  {
    step: 5,
    title: "Entrega pronta e com garantia",
    description: "Seu celular volta pra você funcionando, com garantia no que foi feito.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    icon: "zap",
    title: "Resposta rápida",
    description: "A gente responde logo e combina prazo realista pra você não ficar no escuro.",
  },
  {
    icon: "badge-dollar-sign",
    title: "Preço justo",
    description: "Orçamento claro desde o começo. Sem taxa escondida nem conversa torta.",
  },
  {
    icon: "search",
    title: "Diagnóstico honesto",
    description: "Explicamos o problema e a solução antes de mexer no aparelho.",
  },
  {
    icon: "map-pin",
    title: "Atendimento da região",
    description: "Somos daqui. Atendemos Domingos Martins, Paraju, Marechal Floriano e redondezas.",
  },
  {
    icon: "headphones",
    title: "Suporte depois do conserto",
    description: "Ficou com dúvida depois que pegou o celular? Pode chamar que a gente ajuda.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Carlos M.",
    location: "Domingos Martins",
    text: "Levei meu Samsung com a tela toda quebrada e voltou perfeito. Atenderam rápido, preço honesto. Indico de olhos fechados.",
  },
  {
    name: "Fernanda S.",
    location: "Paraju",
    text: "Meu celular não carregava mais. Olharam na hora, explicaram tudo e consertaram no mesmo dia. Gente muito gente boa.",
  },
  {
    name: "Ricardo L.",
    location: "Marechal Floriano",
    text: "Gostei porque falam a verdade. Mostraram o problema antes de começar e cumpriram o prazo. Com certeza volto.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Quanto tempo demora o conserto?",
    answer:
      "Depende do que precisa ser feito. Troca de tela e bateria, na maioria das vezes, fica pronta no mesmo dia. Reparo em placa pode levar de 1 a 3 dias úteis. A gente te avisa o prazo certinho no orçamento.",
  },
  {
    question: "Tem garantia?",
    answer:
      "Tem sim! Todo serviço sai com garantia. O tempo varia conforme o tipo de conserto e a gente te explica na entrega.",
  },
  {
    question: "Precisa marcar horário?",
    answer:
      "Não precisa, mas é bom mandar mensagem antes. Assim a gente confirma disponibilidade e já te atende mais rápido.",
  },
  {
    question: "Quais marcas vocês consertam?",
    answer:
      "Samsung, Motorola, Xiaomi, Apple, LG e outras. Se tiver dúvida sobre o seu modelo, manda no WhatsApp que a gente confirma.",
  },
  {
    question: "Vocês buscam e entregam o aparelho?",
    answer:
      "Sim! A gente pode buscar na sua região ou você traz aqui. Combina com a gente pelo WhatsApp o jeito que ficar melhor.",
  },
] as const;

export const COPY = {
  hero: {
    badge: "Atendemos a região com agilidade",
    title: "Conserto de celular",
    titleHighlight: "rápido e de confiança",
    subtitle: "Atendemos Domingos Martins, Paraju, Marechal Floriano e redondezas",
    complement: "Tela trincada, bateria fraca ou celular lento? Manda mensagem que a gente resolve junto com você.",
    ctaGallery: "Ver trabalhos realizados",
    trust1: "Garantia em todo serviço",
    trust2: "Orçamento grátis, sem compromisso",
  },
  gallery: {
    title: "Trabalhos que já fizemos",
    subtitle: "Alguns aparelhos de clientes da região que passaram por aqui",
    fallback:
      "Não deu pra carregar as fotos agora. Acessa nosso Instagram que lá tem vários serviços realizados.",
    instagramCta: "Ver mais no Instagram",
    hover: "Ver no Instagram",
  },
  services: {
    title: "O que a gente faz",
    subtitle: "Conserto de celular em Domingos Martins, Paraju, Marechal Floriano e região",
    cta: "Pedir orçamento",
    ctaMessage: "Oi! Vi o site da JP Tecnic e gostaria de um orçamento para:",
  },
  howItWorks: {
    title: "Como funciona",
    subtitle: "Sem complicação: do primeiro contato até a entrega",
    pickup:
      "Se preferir, a gente busca o aparelho aí. Ou você traz aqui. O importante é ficar fácil pra você.",
  },
  differentials: {
    title: "Por que a galera confia na gente",
  },
  reviews: {
    title: "Quem já usou, recomenda",
    subtitle: "Opinião de quem já deixou o celular com a JP Tecnic",
  },
  region: {
    title: "Onde a gente atende",
    subtitle: "Assistência de celular pertinho de você",
  },
  faq: {
    title: "Dúvidas frequentes",
  },
  finalCta: {
    title: "Celular deu problema?",
    subtitle: "Chama no WhatsApp agora que a gente te orienta",
  },
  footer: {
    regions: "Onde atendemos",
    contact: "Fala com a gente",
    schedule: "Horário de atendimento",
    copyright:
      "Assistência técnica de celular em Domingos Martins, Paraju e Marechal Floriano.",
  },
} as const;
