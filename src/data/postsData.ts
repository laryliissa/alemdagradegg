export type Territory =
  | 'Espaços & Corpos'
  | 'Mesa de Criação'
  | 'Filtros & Limites'
  | 'Aprendizagens';

export type PostFormat = 'Campo' | 'Ensaio' | 'Caderno de Bordo' | 'Notas';

export interface PostBlock {
  type: 'p' | 'h2' | 'pull-quote' | 'hand-note' | 'list' | 'quote' | 'box';
  content: string | string[];
  colorScheme?: 'lilac' | 'pink' | 'acid' | 'cyan' | 'default';
  caption?: string;
}

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  italicPrompt: string;
  territory: Territory;
  format: PostFormat;
  date: string;
  readTime: string;
  author: string;
  coverImage: string;
  fieldNoteQuestion: string;
  blocks: PostBlock[];
  isFeatured?: boolean;
  createdAt: number;
}

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'stray-kids-festival-2026',
    slug: 'o-gramado-salompas-stray-kids',
    title: 'O gramado, o Salompas e o Stray Kids: o retorno a um festival após 18 anos',
    subtitle:
      'Aos 39 anos, troquei a inconsequência da grade por meias de compressão e um show assistido da lateral do palco. Uma reflexão sobre limites, comportamento de manada e a liberdade de deitar no chão.',
    italicPrompt:
      'Até que ponto o sacrifício físico ainda é usado como régua para medir o amor de um fã?',
    territory: 'Espaços & Corpos',
    format: 'Campo',
    date: '30 Set 2026',
    readTime: '5 min de leitura',
    author: 'Laryliissa',
    coverImage: 'stray-kids-festival.jpeg',
    fieldNoteQuestion:
      'Até que ponto o sacrifício físico ainda é usado como régua para medir o amor de um fã?',
    isFeatured: true,
    createdAt: 1759240000000,
    blocks: [
      {
        type: 'p',
        content: 'Depois de 18 anos, eu retornei a um festival.',
      },
      {
        type: 'p',
        content:
          'Quando fui ao Lupa-Luna, eu tinha por volta dos 20 anos. Fui com uma amiga e lembro que foi uma experiência e tanto. Choveu, os tênis ficaram um nojo, claro, risos.',
      },
      {
        type: 'p',
        content:
          'Mas também lembro de coisas muito boas. Lulu Santos, Charlie Brown Jr. e NX Zero eram alguns dos meus favoritos naquela época. O show do Charlie Brown, principalmente, tinha uma atmosfera muito especial.',
      },
      {
        type: 'p',
        content:
          'Agora, 18 anos depois, eu estava me preparando para viver aquilo de novo. Só que aos 39 anos a preparação é um pouco diferente.',
      },
      {
        type: 'pull-quote',
        content:
          'A gente entope a sola do pé de Salompas, usa meia de compressão para ajudar na circulação e, principalmente, aprende a sentar no chão em qualquer lugar.',
        colorScheme: 'lilac',
      },
      {
        type: 'p',
        content:
          'Eu e minhas amigas optamos por fazer um bate e volta. Para completar, elas ainda enfrentaram voo cancelado em cima da hora e aquele gasto inesperado para conseguir viver a experiência. Guerreiras, com um bom saldo no cartão, risos.',
      },
      {
        type: 'p',
        content:
          'Ficou a lição: na próxima, melhor chegar na cidade pelo menos um dia antes.',
      },
      {
        type: 'h2',
        content: 'Chegando ao festival',
      },
      {
        type: 'p',
        content:
          'Eu não tive problemas com o voo e uma das coisas que mais me chamou atenção foi perceber os olhares das pessoas. Eu já estava praticamente toda no look de festival. E isso ainda é complexo para mim.',
      },
      {
        type: 'p',
        content:
          'Não estou acostumada a receber tantos olhares de julgamento. Então, estar ali, vestida como eu queria, ocupando aquele espaço e simplesmente vivendo a experiência também fazia parte do desafio.',
      },
      {
        type: 'p',
        content:
          'Chegamos por volta das 16h. Pegamos praticamente zero fila, tiramos algumas fotos no letreiro e, meu Deus, quanta gente. Estava tudo lotado. Passamos no locker para guardar as tralhas e fomos para o palco principal, porque os meninos do NEXZ já estavam se apresentando.',
      },
      {
        type: 'p',
        content:
          'E zero surpresa: mais um grupo de K-pop para a coleção. Minha saga de conhecer e amar grupos depois de ver ao vivo continua firme e forte, risos.',
      },
      {
        type: 'h2',
        content: 'Entre a muvuca e os meus limites',
      },
      {
        type: 'p',
        content:
          'Depois disso veio o aperto básico da galera que foi chegando. Nós escolhemos ficar mais para a lateral esquerda do palco. Veio a Hwasa e eu amei a apresentação dela.',
      },
      {
        type: 'p',
        content:
          'Mas já passava das 19h e, para quem tinha acordado às 5h da manhã para fazer cabelo e dormido umas três horas, eu já estava chegando no meu limite.',
      },
      {
        type: 'p',
        content:
          'Então saímos daquele lugar. Descansamos, tomamos Coca-Cola e deitamos no chão, risos.',
      },
      {
        type: 'p',
        content:
          'Depois veio o Alok. E, cara, ele arrasou na setlist. Mais tarde, escolhemos esperar o show do Stray Kids mais próximo de uma das laterais, onde tínhamos um pouco mais de espaço.',
      },
      {
        type: 'p',
        content:
          'Claro que, em vários momentos, foi insalubre. Tinha gente circulando o tempo todo. Até que, em determinado momento, levei um empurrão gratuito de uma menina que surtou porque eu não dei passagem automaticamente no primeiro pedido. Ela simplesmente me empurrou.',
      },
      {
        type: 'hand-note',
        content: '“Mas é uma cavala mesmo.”',
        colorScheme: 'pink',
      },
      {
        type: 'p',
        content:
          'Risos. Todo mundo em volta se indignou e ela saiu batendo os pés, parecendo o Godzilla daqueles filmes antigos.',
      },
      {
        type: 'h2',
        content: 'Ser fã também é uma questão de limite',
      },
      {
        type: 'p',
        content:
          'Minha trajetória como fã tem uma história que explica bastante da pessoa que eu sou hoje. Meu primeiro grande show como “tiete” foi Sandy & Junior. Eu tinha 14 anos.',
      },
      {
        type: 'p',
        content:
          'Fui de salto alto, cheguei às 6 da manhã para pegar fila. Em resumo: vuco-vuco → passar mal → me separar da amiga → assistir ao show pelo telão junto com o resto das 50 mil pessoas.',
      },
      {
        type: 'p',
        content:
          'Então, eu já conheço essa história de querer ficar perto. Por isso, para esse festival, fiz um combinado comigo mesma:',
      },
      {
        type: 'pull-quote',
        content: 'Eu não iria ultrapassar meus limites.',
        colorScheme: 'default',
      },
      {
        type: 'p',
        content: 'E foi exatamente o que fiz:',
      },
      {
        type: 'list',
        content: [
          'Fui confortável.',
          'Levei meus aparatos (Fone com cancelamento de ruído, Capa de chuva, Comida).',
          'Escolhi ficar em lugares onde conseguia respirar e descansar.',
          'Não fiquei tentando chegar cada vez mais perto da grade.',
        ],
      },
      {
        type: 'p',
        content:
          'E sim, está tudo bem ficar mais longe da muvuca para conseguir se regular e não passar mal. Aliás, talvez isso seja uma das coisas mais importantes que eu aprendi nesse festival:',
      },
      {
        type: 'quote',
        content:
          'Você não precisa provar que é fã se colocando em sofrimento.',
      },
      {
        type: 'p',
        content:
          'A paixão é intensa. Mas a gente também precisa se cuidar. A quantidade de eventos ligados à cultura coreana aumentou bastante, e quando você coloca uma multidão de fãs apaixonados no mesmo lugar, a intensidade aparece. Às vezes de um jeito muito bonito. Às vezes de um jeito preocupante (empurra-empurra, gente de fralda para não sair da grade).',
      },
      {
        type: 'p',
        content:
          'Eu ainda quero estar perto. Ainda fico emocionada. Mas eu também quero voltar para casa bem.',
      },
      {
        type: 'h2',
        content: 'E foi aí que aconteceu o meu festival',
      },
      {
        type: 'p',
        content:
          'No final do show, nós nos encontramos e fomos para o transfer. Sim, transfer do aeroporto para a Cidade do Rock e depois de volta, às 3 da manhã. Porque nada de maiores perrengues.',
      },
      {
        type: 'p',
        content:
          'Somos jovens de 30+ e precisamos trabalhar com planejamento, risos. Para mim, isso também faz parte da experiência. Não é só escolher o show. É pensar em como chegar, onde descansar, o que levar e quando parar.',
      },
      {
        type: 'p',
        content:
          'Talvez essa seja uma das maiores diferenças entre aquela menina de 14 anos e a mulher de 39. Eu continuo querendo viver a experiência. Só não preciso mais me abandonar para isso.',
      },
      {
        type: 'p',
        content:
          'E talvez seja justamente isso que existe Além da Grade.',
      },
    ],
  },
  {
    id: 'o-que-voce-gosta-de-fazer-2018',
    slug: 'o-que-voce-gosta-de-fazer-adulta-funcional',
    title: '"O que você gosta de fazer?": o choque no sistema de uma adulta funcional',
    subtitle:
      'Como uma pergunta sem resposta na terapia em 2018 e a batida agressiva de uma trilha sonora racharam a minha grade do adultismo e me devolveram a permissão para sentir.',
    italicPrompt:
      'Onde você escondeu o seu entusiasmo para caber nas expectativas dos outros?',
    territory: 'Aprendizagens',
    format: 'Ensaio',
    date: '25 Set 2026',
    readTime: '6 min de leitura',
    author: 'Laryliissa',
    coverImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    fieldNoteQuestion:
      'O que você faria hoje se nenhuma obrigação ou papel de utilidade estivesse te cobrando?',
    createdAt: 1758800000000,
    blocks: [
      {
        type: 'p',
        content:
          'Em 2018, sentada na poltrona do consultório de terapia, minha psicóloga me fez uma pergunta aparentemente trivial: “O que você, Larissa, gosta de fazer?”.',
      },
      {
        type: 'p',
        content:
          'O silêncio que se seguiu foi constrangedor. Eu conseguia discorrer sobre meu planejamento de aulas, minhas obrigações com a família, o cronograma dos meus alunos e a organização da casa. Mas sobre os meus desejos? Nada.',
      },
      {
        type: 'pull-quote',
        content:
          'A adulta funcional havia engolido a menina curiosa. Eu achava que maturidade era ser sinônimo de utilidade contínua.',
        colorScheme: 'pink',
      },
      {
        type: 'h2',
        content: 'O som que destravou o concreto',
      },
      {
        type: 'p',
        content:
          'Foi em uma madrugada de insônia que me deparei com um videoclipe de K-pop. Não era apenas a estética impecável ou a sincronia absurda das coreografias; era uma energia visceral que eu não sentia há décadas.',
      },
      {
        type: 'p',
        content:
          'Pela primeira vez em anos, meu coração acelerou sem que fosse por ansiedade de prazo. Era entusiasmo puro. Aquele que a gente costuma rotular pejorativamente como "coisa de adolescente".',
      },
      {
        type: 'hand-note',
        content: '“Permitir-se gostar de algo sem utilidade econômica é um ato revolucionário.”',
        colorScheme: 'acid',
      },
      {
        type: 'p',
        content:
          'Comecei a pesquisar as letras, as teorias dos universos narrativos, a aprender os nomes e as dinâmicas dos membros. Percebi que o estudo psicopedagógico e o fascínio de fã bebiam da mesma fonte: a curiosidade humana.',
      },
    ],
  },
  {
    id: 'toploaders-papelaria-aprendizados',
    slug: 'toploaders-papelaria-pequenos-aprendizados',
    title: 'Toploaders, papelaria e pequenos aprendizados',
    subtitle:
      'Às vezes, são os detalhes do cotidiano, como a organização de um binder e fitas washi, que mais nos ensinam sobre foco, regulação e prazer do processo.',
    italicPrompt:
      'O que os seus trabalhos manuais e pequenas manias revelam sobre o seu descanso?',
    territory: 'Mesa de Criação',
    format: 'Caderno de Bordo',
    date: '12 Set 2026',
    readTime: '4 min de leitura',
    author: 'Laryliissa',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    fieldNoteQuestion:
      'Qual é o seu refúgio manual quando o cérebro precisa silenciar o ruído digital?',
    createdAt: 1757680000000,
    blocks: [
      {
        type: 'p',
        content:
          'Existe um ritual quase meditativo em abrir um envelope de photocards, escolher os adesivos que combinam com as cores do card e colar, com pinça e calma, as fitas holográficas em volta do plástico protetor.',
      },
      {
        type: 'pull-quote',
        content:
          'Decorar toploaders não é infantilidade: é regulação sensorial e permissão para o brincar na vida adulta.',
        colorScheme: 'cyan',
      },
      {
        type: 'p',
        content:
          'Para quem tem mente hiperativa e neurodivergência tardia, a mesa de criação é uma âncora. O tato das texturas, a organização dos sleeves e a montagem de um binder trazem a ordem interna que o mundo corporativo tantas vezes desfaz.',
      },
      {
        type: 'list',
        content: [
          'Aprender a desacelerar sem culpa de produzir nada vendável.',
          'Exercitar a coordenação fina e a atenção plena aos detalhes.',
          'Trocar cartas e carinhos tangíveis com pessoas do outro lado do país.',
        ],
      },
    ],
  },
  {
    id: 'prateleiras-relacionais-melhor-companhia',
    slug: 'prateleiras-relacionais-melhor-companhia',
    title: 'Prateleiras relacionais e a melhor companhia',
    subtitle:
      'Sobre encontrar paz nas pausas, organizar os níveis de intimidade online e evitar as "fanwars" que drenam nossa energia mental.',
    italicPrompt:
      'Você sabe delimitar quais espaços virtuais merecem a sua presença e quais sugam sua paz?',
    territory: 'Filtros & Limites',
    format: 'Campo',
    date: '28 Ago 2026',
    readTime: '5 min de leitura',
    author: 'Laryliissa',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    fieldNoteQuestion:
      'Quem são as pessoas que te permitem ser fã com leveza e sem julgamentos?',
    createdAt: 1756380000000,
    blocks: [
      {
        type: 'p',
        content:
          'No fandom, é muito fácil cair na armadilha da hiper-reatividade: discussões intermináveis no Twitter, comparações de streams, cobranças sobre quem votou mais ou quem comprou mais versões de álbuns.',
      },
      {
        type: 'pull-quote',
        content:
          'Não é porque algo está acontecendo na sua timeline que você precisa entrar na briga. O silêncio também é um limite.',
        colorScheme: 'acid',
      },
      {
        type: 'p',
        content:
          'Criei o conceito das "prateleiras relacionais": cada pessoa e cada comunidade ocupa um espaço de proximidade proporcional à segurança emocional que oferece. Minha paz vale muito mais do que ter a última palavra em uma discussão.',
      },
    ],
  },
];
