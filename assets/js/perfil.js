// Dados do cartão do Saulo. Para editar o cartão, mude só este arquivo.
window.HM_PROFILE = {
  slug: "saulo",
  name: "Saulo Rocha",
  role: "Corretor de Imóveis",
  photo: "/assets/img/foto.jpg",
  status: "Atendendo agora",
  bio: [
    "Sou Saulo Rocha, corretor de imóveis. Ajudo pessoas e famílias a encontrar o imóvel certo, com conversa franca e atendimento de perto, do primeiro contato até a entrega das chaves.",
    "Gosto de gente e de bons negócios. Conheço o mercado, acompanho cada etapa da negociação e faço questão de explicar tudo com clareza, sem pressa e sem letra miúda.",
    "Quer comprar, vender ou investir? Me chame. Vamos tomar um café e conversar."
  ],
  signature: "Seu próximo imóvel começa com uma boa conversa.",
  whatsapp: "5562998649642",
  whatsappMsg: "Olá, Saulo! Vim pelo seu cartão digital.",
  phone: "+55 62 99864-9642",
  email: "",
  instagram: "saulorocha.corretor",
  creci: "7091",
  company: "Saulo Rocha Imóveis"
};

// Botões que já abrem o WhatsApp com a mensagem pronta
window.HM_INTENTS = [
  { title: "Quero comprar um imóvel", sub: "Casa, apartamento ou lote", icon: "key", msg: "Olá, Saulo! Quero comprar um imóvel. Pode me ajudar?" },
  { title: "Quero vender meu imóvel", sub: "Avaliação e divulgação", icon: "tag", msg: "Olá, Saulo! Quero vender meu imóvel. Podemos conversar?" },
  { title: "Quero investir", sub: "Lançamentos e oportunidades", icon: "chart", msg: "Olá, Saulo! Tenho interesse em investir em imóveis." }
];

// Catálogo de empreendimentos. Cada um vira um cartão com fotos deslizando e tela cheia.
// Fotos: coloque em assets/img/empreendimentos/<nome>/ (01.jpg, 02.jpg…) e liste em "photos".
// Todos os campos são opcionais, menos "name"; o que ficar vazio não aparece.
// Lista vazia = a seção não aparece.
window.HM_PROJECTS = [
  {
    name: "Urban Garden Residence",
    status: "",                // ex.: "Lançamento", "Em obras", "Pronto para morar"
    place: "",                 // ex.: "Setor Bueno · Goiânia"
    bedrooms: "",              // ex.: "2 e 3"
    area: "",                  // ex.: "68 a 92"
    parking: "",               // ex.: "1 ou 2"
    price: "",                 // ex.: "R$ 450 mil"
    description: "Peça o caderno de plantas completo pelo WhatsApp.",
    features: [],              // ex.: ["Piscina", "Academia", "Espaço gourmet"]
    photos: [],                // ex.: ["/assets/img/empreendimentos/urban-garden/01.jpg", "/assets/img/empreendimentos/urban-garden/02.jpg"]
    link: "",                  // site, Instagram ou material do empreendimento (opcional)
    msg: "Olá, Saulo! Quero saber mais sobre o Urban Garden Residence e receber o caderno de plantas."
  }
  // , { name: "Outro empreendimento", status: "Lançamento", place: "Bairro · Cidade", photos: [ ... ] }
];

// Crédito de quem fez o cartão
window.HM_COMPANY = { name: "HM Digital", logo: "/assets/img/logo-hm.png", site: "https://links.hmdigitalgo.com" };
