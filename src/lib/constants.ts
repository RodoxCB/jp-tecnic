export const SITE = {
  name: "JP Tecnic",
  tagline: "Assistência Técnica de Celulares",
  instagram: "https://www.instagram.com/jp_tecnic/",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5527999999999",
  whatsappMessage:
    "Olá! Vim pelo site da JP Tecnic. Meu celular está com o seguinte problema:",
  schedule: "Seg a Sáb: 8h às 18h",
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
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
] as const;

export const SERVICES = [
  { icon: "smartphone", title: "Troca de tela", description: "Telas quebradas ou com manchas? Substituímos com peças de qualidade." },
  { icon: "battery", title: "Troca de bateria", description: "Celular descarregando rápido? Nova bateria e mais autonomia para você." },
  { icon: "cpu", title: "Reparo em placa", description: "Problemas internos? Diagnóstico preciso e reparo especializado." },
  { icon: "plug", title: "Problemas de carregamento", description: "Conector, cabo ou placa — identificamos e resolvemos a causa." },
  { icon: "settings", title: "Formatação e otimização", description: "Sistema lento ou travando? Deixamos seu aparelho mais rápido." },
  { icon: "shield", title: "Remoção de conta Google (FRP)", description: "Desbloqueio de conta Google com procedimento seguro." },
  { icon: "apple", title: "Remoção de conta Apple", description: "Sob análise — entre em contato para avaliarmos seu caso." },
] as const;

export const STEPS = [
  { step: 1, title: "Você entra em contato pelo WhatsApp", description: "Mande uma mensagem contando o que aconteceu com seu celular." },
  { step: 2, title: "Explica o problema do seu celular", description: "Descreva os sintomas — quanto mais detalhes, melhor o diagnóstico." },
  { step: 3, title: "Recebe diagnóstico com valor e prazo", description: "Orçamento claro, sem surpresas. Você decide se aprova ou não." },
  { step: 4, title: "O serviço é realizado com transparência", description: "Acompanhamos você em cada etapa do conserto." },
  { step: 5, title: "Entrega com garantia", description: "Aparelho pronto e garantia no serviço realizado." },
] as const;

export const DIFFERENTIALS = [
  { icon: "zap", title: "Atendimento rápido", description: "Resposta ágil e prazos realistas para você não ficar sem celular." },
  { icon: "badge-dollar-sign", title: "Preço justo", description: "Orçamento transparente, sem taxas escondidas." },
  { icon: "search", title: "Transparência no diagnóstico", description: "Explicamos o problema e a solução antes de qualquer reparo." },
  { icon: "map-pin", title: "Atendimento local", description: "Atendemos Domingos Martins, Paraju, Marechal Floriano e região." },
  { icon: "headphones", title: "Suporte pós-serviço", description: "Dúvidas depois do conserto? Estamos aqui para ajudar." },
] as const;

export const REVIEWS = [
  {
    name: "Carlos M.",
    location: "Domingos Martins",
    text: "Troquei a tela do meu Samsung e ficou perfeito. Atendimento rápido e preço justo. Recomendo demais!",
  },
  {
    name: "Fernanda S.",
    location: "Paraju",
    text: "Meu celular não carregava mais. Diagnosticaram na hora e consertaram no mesmo dia. Muito profissionais.",
  },
  {
    name: "Ricardo L.",
    location: "Marechal Floriano",
    text: "Transparentes do início ao fim. Explicaram tudo antes de começar o serviço. Voltarei com certeza.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Quanto tempo leva o conserto?",
    answer: "Depende do problema. Troca de tela e bateria costumam ser no mesmo dia. Reparos em placa podem levar de 1 a 3 dias úteis. Informamos o prazo no orçamento.",
  },
  {
    question: "Tem garantia?",
    answer: "Sim! Todos os serviços têm garantia. O prazo varia conforme o tipo de reparo e informamos na hora da entrega.",
  },
  {
    question: "Precisa agendar?",
    answer: "Não é obrigatório, mas recomendamos chamar no WhatsApp antes para confirmar disponibilidade e agilizar o atendimento.",
  },
  {
    question: "Quais marcas atendem?",
    answer: "Atendemos as principais marcas: Samsung, Motorola, Xiaomi, Apple, LG e outras. Consulte-nos pelo WhatsApp.",
  },
  {
    question: "Faz retirada e entrega?",
    answer: "Sim! Podemos buscar o aparelho na sua região ou você pode entregar diretamente. Combine pelo WhatsApp.",
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop", alt: "Troca de tela de smartphone" },
  { src: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop", alt: "Reparo de placa de celular" },
  { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop", alt: "Smartphone consertado" },
  { src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop", alt: "Troca de bateria" },
  { src: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop", alt: "Diagnóstico técnico" },
  { src: "https://images.unsplash.com/photo-1574944985070-8f9484d89672?w=600&h=600&fit=crop", alt: "Assistência técnica mobile" },
] as const;
