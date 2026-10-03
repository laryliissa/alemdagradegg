import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Briefcase,
  Clock,
  Smartphone,
  Headphones,
  Shield,
  HelpCircle,
  CheckCircle2,
  Heart,
  Smile,
  AlertCircle,
} from 'lucide-react';

interface ManifestoDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoDrawerModal: React.FC<ManifestoDrawerModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--ink)]/80 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-end sm:items-center p-0 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifesto-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:w-[94vw] md:w-[92vw] max-w-4xl h-[95vh] sm:h-[92vh] bg-white border-x-2 border-t-2 sm:border-2 border-[var(--ink)] sm:rounded-2xl shadow-2xl flex flex-col relative animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        {/* Header do Manifesto */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--bg-dots)] shrink-0 sm:rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[var(--k-pink)] text-white border border-[var(--ink)] rounded-lg shadow-[2px_2px_0_var(--ink)]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                O Manifesto Oficial
              </span>
              <span className="block text-[10px] mono-font text-neutral-500 font-semibold">
                ALÉM DA GRADE • Caderno de Campo Aberto
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--ink)] hover:text-white hover:bg-[var(--k-pink)] border border-transparent hover:border-[var(--ink)] transition-colors focus-visible"
            aria-label="Fechar manifesto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo sem barra de rolagem feia (rolagem suave e invisível) */}
        <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto no-scrollbar bg-[var(--paper)] sm:rounded-b-2xl">
          <article className="prose max-w-none">
            {/* Título Principal */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 bg-[var(--k-acid)] border-2 border-[var(--ink)] px-3 py-1 rounded-full shadow-[2px_2px_0_var(--ink)] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[var(--ink)]" />
                <span className="mono-font text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
                  Texto Fundador
                </span>
              </div>
              <h1
                id="manifesto-title"
                className="display-font text-3xl sm:text-5xl font-bold leading-[1.1] text-[var(--ink)] mb-3"
              >
                ALÉM DA GRADE
              </h1>
              <p className="display-font text-xl sm:text-2xl text-neutral-800 font-semibold mb-4 leading-snug">
                Um manifesto sobre paixão, sensibilidade e vida adulta
              </p>
              <p className="mono-font text-xs font-bold uppercase tracking-widest text-neutral-600 border-b-2 border-dashed border-[var(--ink)] pb-4 flex flex-wrap items-center gap-1.5">
                <span>Por Laryliissa</span>
                <span>•</span>
                <span className="text-[var(--k-pink)] font-black">Cultura de fã</span>
                <span>•</span>
                <span className="text-emerald-700 font-black">Neurodivergência</span>
                <span>•</span>
                <span className="text-[var(--k-lilac)] font-black">Aprendizagem</span>
                <span className="lowercase font-bold text-neutral-500">e</span>
                <span className="text-orange-600 font-black">Afeto</span>
              </p>
            </div>

            {/* Parágrafo Introdutório */}
            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-4">
              <span className="float-left text-6xl display-font font-bold leading-none pr-3 pt-2 text-[var(--k-lilac)]">
                E
              </span>
              m 2018, sentada em uma sessão de terapia, ouvi uma pergunta aparentemente simples:
            </p>

            {/* Destaque 1: Pergunta da Terapeuta (Mantida na mesma linha) */}
            <div className="my-8 flex justify-center">
              <div className="relative bg-[#fff9d2] px-4 sm:px-8 py-5 sm:py-6 rounded-xl border-2 border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] transform -rotate-1 max-w-xl w-full text-center">
                {/* Washi Tape decorativa no topo */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-[var(--k-pink)]/70 backdrop-blur-sm border border-[var(--ink)] rotate-2 shadow-sm pointer-events-none" />
                <HelpCircle className="w-5 h-5 text-[var(--ink)] mx-auto mb-1.5 opacity-60" />
                <blockquote className="hand-font text-2xl sm:text-3xl text-[var(--ink)] font-bold m-0 p-0 border-none leading-tight whitespace-normal sm:whitespace-nowrap">
                  “O que você, Laryssa, gosta de fazer?”
                </blockquote>
              </div>
            </div>

            <p className="text-xl font-bold text-[var(--k-pink)] mb-6">
              Eu não soube responder.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Conseguia listar sem hesitar meus papéis práticos: mãe, esposa, profissional com mais de duas décadas dedicadas aos processos de aprendizagem e à educação especial. Conseguia falar sobre trabalho, responsabilidades, tarefas e tudo aquilo que precisava ser feito. Mas, quando a pergunta era sobre mim, sobre aquilo que eu gostava, alguma coisa travava.
            </p>

            {/* Caixa sobre a Adulta Funcional */}
            <div className="bg-[#f0e6ff] p-5 sm:p-6 rounded-xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] my-6">
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-900 m-0">
                A mulher por trás de todas aquelas funções parecia ter desaparecido. Meu cotidiano era guiado pelo pragmatismo, pelas expectativas alheias e por uma ideia muito estreita do que significava ser uma <span className="bg-[var(--k-acid)] px-1.5 py-0.5 rounded font-bold border border-[var(--ink)]">"adulta funcional"</span>. Eu havia aprendido a deixar meus gostos de lado, camuflar meus entusiasmos e esconder aquilo que me fazia vibrar para caber melhor nas caixas que esperavam de mim.
              </p>
            </div>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-4">
              A resposta para aquela pergunta não veio de um manual.
            </p>

            {/* Destaque em faixa mantida na mesma linha */}
            <div className="my-5 bg-white p-3.5 sm:p-4 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
              <p className="hand-font text-xl sm:text-2xl md:text-2xl text-[var(--k-pink)] font-bold m-0 text-center whitespace-normal sm:whitespace-nowrap">
                Ela começou a aparecer quando me permiti voltar a ser fã.
              </p>
            </div>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Ao mergulhar na cultura Hallyu, na música do K-pop, nas histórias dos K-dramas e nas comunidades que se formam ao redor dessas paixões, comecei a reencontrar uma parte de mim que estava adormecida. Percebi que aquilo que eu gostava não era apenas uma forma de passar o tempo.
            </p>

            {/* Verbos de Ação */}
            <div className="bg-[var(--bg-dots)] p-5 sm:p-6 border-2 border-[var(--ink)] rounded-2xl my-7 font-bold text-base sm:text-lg text-[var(--ink)] shadow-[4px_4px_0_var(--ink)] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--k-pink)]" />
                <span>Eu queria entender.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--k-lilac)]" />
                <span>Queria pesquisar.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--k-acid)]" />
                <span>Queria aprender.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--k-cyan)]" />
                <span>Queria criar.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>Queria conhecer pessoas.</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--k-pink)] font-black pt-1">
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>Queria descobrir outras culturas, outras formas de pensar e outras maneiras de ocupar o mundo.</span>
              </div>
            </div>

            {/* Diagnóstico na vida adulta & Rituais de Ancoragem */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] my-8">
              <div className="inline-block mono-font text-[10px] font-bold uppercase tracking-wider bg-[#b8f5d0] text-[var(--ink)] px-2.5 py-1 rounded border border-[var(--ink)] mb-3">
                Neurodivergência & Rituais
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 mb-4">
                E quanto mais eu me envolvia, mais perguntas apareciam. Com o <strong className="text-[var(--ink)] bg-[#fcffcc] px-1">diagnóstico de autismo na vida adulta</strong> e a convivência em novas comunidades de mulheres, passei a olhar para minhas próprias formas de sentir, focar, aprender e me relacionar de outra maneira.
              </p>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 m-0">
                Organizar photocards em um binder, montar um toploader, planejar uma ida a um café temático, pesquisar um grupo, aprender palavras de outra língua, viajar para um show ou passar horas investigando algo que despertou minha curiosidade não precisavam ser vistos como distrações fúteis. Podiam ser experiências, <strong className="text-[var(--k-lilac)]">rituais de ancoragem sensorial</strong>, produção de repertório e formas de expressão que diziam algo profundo sobre mim e sobre a maneira como eu me relacionava com o mundo.
              </p>
            </div>

            <p className="mono-font text-xs font-bold uppercase tracking-wider text-neutral-500 text-center mb-2">
              ✦ A Pergunta-Mãe que orienta a investigação
            </p>

            {/* Destaque 2: Pergunta-Mãe (Mantida na mesma linha em telas médias e maiores) */}
            <div className="my-7">
              <blockquote className="bg-[var(--k-acid)] px-4 sm:px-6 py-5 sm:py-6 border-3 border-[var(--ink)] rounded-2xl shadow-[5px_5px_0_var(--ink)] transform rotate-1 text-center m-0">
                <Sparkles className="w-5 h-5 text-[var(--ink)] mx-auto mb-1.5" />
                <p className="display-font text-xl sm:text-2xl md:text-3xl font-black text-[var(--ink)] m-0 leading-snug whitespace-normal sm:whitespace-nowrap">
                  O que acontece quando aquilo que amamos nos coloca em movimento?
                </p>
              </blockquote>
            </div>

            {/* Divisor Neobrutalista */}
            <div className="my-12 border-b-2 border-dashed border-[var(--ink)]" />

            {/* Seção: Por que Além da Grade? */}
            <div className="mb-6">
              <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--k-pink)] bg-[#ffe6f2] px-3 py-1 rounded border border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] inline-block mb-3">
                A Filosofia da Recusa
              </span>
              <h2 className="display-font text-3xl sm:text-4xl font-bold text-[var(--ink)] mb-4">
                Por que “Além da Grade”?
              </h2>
            </div>

            <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Existe uma ideia muito forte nos fandoms de que o afeto precisa ser medido pelo sacrifício, e a grade virou uma espécie de troféu, regado a sofrimento e sacrifício intenso, ainda mais aqui no Brasil, que não tem lugares marcados nem uma organização mais delimitada para a entrada dos fãs. Parece ainda que inventaram uma regra invisível de que, para ser validada como fã, você precisa esgotar o seu corpo e mente: virar noites na fila, esquecer de beber água, ignorar o próprio cansaço e disputar cada milímetro só para estar o mais perto possível.
            </p>

            {/* Caixa de Destaque: Performance Digital e Romantização da Exaustão */}
            <div className="bg-[#fff2f2] p-5 sm:p-6 rounded-2xl border-2 border-red-300 shadow-[4px_4px_0_var(--ink)] my-6">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs mono-font uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                Exaustão & Performance Digital
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 m-0">
                E hoje, tudo isso ainda carrega uma camada extra de ansiedade: a pressão enlouquecedora de ter que render as melhores fotos, os vídeos com o ângulo perfeito e produzir o conteúdo definitivo para postar. É a <strong>romantização da exaustão e da performance digital</strong>, como se o tamanho do seu perrengue e a galeria do seu celular fossem as únicas formas de provar o seu amor.
              </p>
            </div>

            {/* Destaque 3: Afeto vs Sacrifício (Frase-guia em destaque com fonte balanceada) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] my-7">
              <p className="display-font text-lg sm:text-xl md:text-2xl font-bold leading-snug text-[var(--k-lilac)] mb-4">
                Para mim, ficar além da grade significa o oposto: é perceber que a intensidade do meu amor não precisa ser medida pelo tamanho do meu sacrifício.
              </p>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 m-0">
                É poder comparecer ao evento com abafadores de ruído, escolher um setor onde haja oxigênio e rota de fuga, sentar quando necessário e desfrutar da arte com dignidade.
              </p>
            </div>

            <p className="text-lg font-bold text-[var(--ink)] mb-4">
              Mais do que a barreira física do palco, a grade é uma metáfora para todas as estruturas que tentam nos domesticar na vida adulta:
            </p>

            {/* As Três Metáforas da Grade */}
            <div className="grid grid-cols-1 gap-4 my-6">
              {/* Grade 1: Adultismo e Preconceito de Gênero */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--k-pink)] border border-[var(--ink)] flex items-center justify-center shadow-[1px_1px_0_var(--ink)] shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="display-font text-base sm:text-lg font-bold text-[var(--ink)] m-0">
                    A grade do adultismo e do preconceito de gênero
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed m-0">
                  Essa cobrança social que infantiliza e ridiculariza as paixões femininas. Enquanto o entusiasmo masculino por esportes ou jogos é validado como hobby legítimo, os afetos das mulheres por grupos, narrativas e universos culturais são rotulados como "futilidade", "imaturidade" ou "coisa de adolescente". <strong className="text-[var(--k-pink)]">Recusar essa grade é reivindicar o direito ao encantamento na vida adulta.</strong>
                </p>
              </div>

              {/* Grade 2: Ambiente de Trabalho */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--k-cyan)] border border-[var(--ink)] flex items-center justify-center shadow-[1px_1px_0_var(--ink)] shrink-0">
                    <Briefcase className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                  <h3 className="display-font text-base sm:text-lg font-bold text-[var(--ink)] m-0">
                    A grade do ambiente de trabalho
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed m-0">
                  A exigência de uma postura permanentemente séria, polida e pasteurizada, que sufoca nossa subjetividade e massacra nosso potencial criativo em nome de uma falsa ideia de competência fria.
                </p>
              </div>

              {/* Grade 3: Redes Desreguladas */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--k-acid)] border border-[var(--ink)] flex items-center justify-center shadow-[1px_1px_0_var(--ink)] shrink-0">
                    <Smartphone className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                  <h3 className="display-font text-base sm:text-lg font-bold text-[var(--ink)] m-0">
                    A grade das redes desreguladas
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed m-0">
                  A pressão para nos expormos sem defesas, provarmos o tempo todo que somos "fãs o suficiente" e engajarmos em discussões que não são nossas.
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800 my-6">
              Ficar além da grade é escolher ser fã sem abrir mão da própria integridade e do respeito ao próprio corpo e mente. Minha pesquisa investiga como a recusa da devoção sacrificial e a criação de limites saudáveis geram uma aprendizagem viva, aquela que nasce justamente quando a comunidade se mostra imperfeita ou desafiadora. É esse aprendizado prático de impor filtros e proteger nossa sensibilidade que reconstrói nosso pertencimento real e devolve a qualidade de vida à caminhada adulta.
            </p>

            {/* Destaque 4: Frases de Libertação (Cada frase mantida na mesma linha) */}
            <div className="bg-gradient-to-br from-[#f8f5ff] to-[#fff0f7] p-6 sm:p-7 rounded-2xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] my-8">
              <p className="display-font text-xl sm:text-2xl font-black text-[var(--ink)] mb-4 text-center sm:text-left whitespace-normal sm:whitespace-nowrap">
                Estar além da grade é um ato de libertação.
              </p>
              <div className="space-y-2.5">
                <div className="bg-white px-4 py-3 rounded-xl border-2 border-[var(--ink)] flex items-center gap-2.5 text-xs sm:text-sm font-bold text-neutral-800 shadow-[2px_2px_0_var(--ink)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--k-pink)] shrink-0" />
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    É poder chegar perto sem precisar se machucar para provar alguma coisa.
                  </span>
                </div>
                <div className="bg-white px-4 py-3 rounded-xl border-2 border-[var(--ink)] flex items-center gap-2.5 text-xs sm:text-sm font-bold text-neutral-800 shadow-[2px_2px_0_var(--ink)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    É poder se afastar quando for necessário.
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-white px-3.5 py-3 rounded-xl border-2 border-[var(--ink)] text-center text-xs sm:text-sm font-black text-neutral-800 shadow-[2px_2px_0_var(--ink)] whitespace-nowrap">
                    É poder sentar.
                  </div>
                  <div className="bg-white px-3.5 py-3 rounded-xl border-2 border-[var(--ink)] text-center text-xs sm:text-sm font-black text-neutral-800 shadow-[2px_2px_0_var(--ink)] whitespace-nowrap">
                    É poder respirar.
                  </div>
                  <div className="bg-[#fcffcc] px-3.5 py-3 rounded-xl border-2 border-[var(--ink)] text-center text-xs sm:text-sm font-black text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] whitespace-nowrap">
                    É poder dizer não.
                  </div>
                </div>
              </div>
            </div>

            {/* Divisor Neobrutalista */}
            <div className="my-12 border-b-2 border-dashed border-[var(--ink)]" />

            {/* Seção: O que você encontrará neste Caderno de Bordo */}
            <div className="mb-6">
              <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--ink)] bg-[var(--k-cyan)] px-3 py-1 rounded border border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] inline-block mb-3">
                Mapa de Navegação
              </span>
              <h2 className="display-font text-3xl sm:text-4xl font-bold text-[var(--ink)] mb-4">
                O que você encontrará neste Caderno de Bordo
              </h2>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-800">
                Este blog não é um portal de notícias rápidas nem uma página de fofocas. Ele é o meu caderno de campo aberto. Aqui, uno meu olhar de pesquisadora de processos de aprendizagem à minha vivência honesta de quem habita esse universo por dentro, divididos em cinco territórios:
              </p>
            </div>

            {/* Os Cinco Territórios */}
            <div className="space-y-3.5 my-8">
              {/* Território 1 */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] flex items-start gap-4">
                <span className="text-2xl p-2 bg-[#ffe6f2] rounded-lg border border-[var(--ink)] shrink-0">
                  💖
                </span>
                <div>
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">
                    Paixões
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed m-0">
                    O direito de gostar, o resgate do entusiasmo e a crítica ao adultismo.
                  </p>
                </div>
              </div>

              {/* Território 2 */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] flex items-start gap-4">
                <span className="text-2xl p-2 bg-[#f0e6ff] rounded-lg border border-[var(--ink)] shrink-0">
                  ✂️
                </span>
                <div>
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">
                    Mesa de Criação
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed m-0">
                    Práticas manuais, toploaders, colecionismo e a arteterapia do cotidiano na regulação do estresse.
                  </p>
                </div>
              </div>

              {/* Território 3 */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] flex items-start gap-4">
                <span className="text-2xl p-2 bg-[#fcffcc] rounded-lg border border-[var(--ink)] shrink-0">
                  🎫
                </span>
                <div>
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">
                    Além da Grade
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed m-0">
                    O corpo no espaço coletivo, conforto sensorial, acessibilidade e a recusa do sacrifício em eventos.
                  </p>
                </div>
              </div>

              {/* Território 4 */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] flex items-start gap-4">
                <span className="text-2xl p-2 bg-[#e6ffff] rounded-lg border border-[var(--ink)] shrink-0">
                  🛡️
                </span>
                <div>
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">
                    Filtros & Limites
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed m-0">
                    Higiene digital, literacia relacional e a gestão de vínculos sem atritos desgastantes.
                  </p>
                </div>
              </div>

              {/* Território 5 */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] flex items-start gap-4">
                <span className="text-2xl p-2 bg-[#b8f5d0] rounded-lg border border-[var(--ink)] shrink-0">
                  📓
                </span>
                <div>
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">
                    Caderno de Aprendizagens
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed m-0">
                    Autoetnografia, neurodivergência e os aprendizados informais que reconstroem nossa autonomia.
                  </p>
                </div>
              </div>
            </div>

            {/* Boas-Vindas e Assinatura com a frase de encerramento na mesma linha */}
            <div className="text-center pt-8 border-t-2 border-dashed border-[var(--ink)] pb-4 mt-10">
              <p className="display-font text-xl font-bold text-neutral-800 mb-4">
                Seja bem-vinda a este espaço.
              </p>
              <div className="bg-[var(--paper)] px-4 sm:px-6 py-4 rounded-2xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] max-w-lg mx-auto mb-6">
                <p className="hand-font text-2xl sm:text-3xl text-[var(--k-pink)] transform -rotate-1 font-bold leading-tight m-0 whitespace-normal sm:whitespace-nowrap">
                  “Porque o entusiasmo não precisa pedir licença para existir.”
                </p>
              </div>
              <div className="flex justify-center">
                <span className="mono-font text-sm font-black uppercase tracking-widest text-[var(--ink)] bg-[var(--k-acid)] px-5 py-2.5 border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] rounded-full">
                  @LaryLiissa
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
