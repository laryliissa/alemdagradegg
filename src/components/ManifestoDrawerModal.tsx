import React, { useEffect } from 'react';
import { X, Sparkles, BookOpen } from 'lucide-react';

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
      <div className="w-full sm:w-auto h-[92vh] sm:h-[88vh] bg-white border-x-2 border-t-2 sm:border-2 border-[var(--ink)] sm:rounded-2xl shadow-2xl flex flex-col max-w-3xl relative animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        {/* Header do Manifesto */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--bg-dots)] shrink-0 sm:rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[var(--k-pink)] text-white border border-[var(--ink)] rounded">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
              O Manifesto Oficial
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--ink)] hover:text-white hover:bg-[var(--k-pink)] transition-colors focus-visible"
            aria-label="Fechar manifesto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar bg-[var(--paper)] sm:rounded-b-2xl">
          <article className="prose max-w-none">
            <h1
              id="manifesto-title"
              className="display-font text-3xl sm:text-5xl font-bold leading-[1.1] text-[var(--ink)] mb-4"
            >
              ALÉM DA GRADE<br />
              <span className="text-2xl sm:text-3xl text-neutral-700 block mt-2">
                Um manifesto sobre paixão, sensibilidade e vida adulta
              </span>
            </h1>
            <p className="mono-font text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 border-b-2 border-dashed border-[var(--ink)] pb-4">
              Por Laryliissa • Cultura de fã, aprendizagem, afeto e neurodivergência
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              <span className="float-left text-6xl display-font font-bold leading-none pr-3 pt-2 text-[var(--k-lilac)]">
                E
              </span>
              m 2018, sentada em uma sessão de terapia, ouvi uma pergunta aparentemente simples:
            </p>

            <p className="hand-font text-3xl sm:text-4xl text-[var(--k-pink)] my-6 text-center transform -rotate-1 font-bold">
              “O que você, Larissa, gosta de fazer?”
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Eu não soube responder.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Conseguia listar sem hesitar meus papéis práticos: mãe, esposa, profissional da educação.
              Conseguia falar sobre trabalho, responsabilidades, tarefas e tudo aquilo que precisava
              ser feito. Mas, quando a pergunta era sobre mim, sobre aquilo que eu gostava, alguma coisa travava.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              A mulher por trás de todas aquelas funções parecia ter desaparecido. Meu cotidiano era
              guiado pelo pragmatismo, pelas expectativas dos outros e por uma ideia muito estreita
              do que significava ser uma adulta funcional. Eu havia aprendido a deixar meus gostos de
              lado, controlar meus entusiasmos e esconder aquilo que me fazia vibrar para caber melhor
              nas caixas que esperavam de mim.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              A resposta para aquela pergunta não veio de um manual.<br />
              Ela começou a aparecer quando me permiti voltar a ser fã.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Ao mergulhar na cultura Hallyu, na música do K-pop, nas histórias dos K-dramas e nas
              comunidades que se formam ao redor dessas paixões, comecei a reencontrar uma parte de mim
              que estava adormecida. Percebi que aquilo que eu gostava não era apenas uma forma de passar o tempo.
            </p>

            <div className="bg-[var(--bg-dots)] p-6 border-2 border-[var(--ink)] rounded-xl my-8 font-bold text-lg text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
              Eu queria entender.<br />
              Queria pesquisar.<br />
              Queria aprender.<br />
              Queria criar.<br />
              Queria conhecer pessoas.<br />
              Queria descobrir outras culturas, outras formas de pensar e outras maneiras de ocupar o mundo.
            </div>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              E quanto mais eu me envolvia, mais perguntas apareciam. Com o tempo, também comecei a
              olhar para minhas próprias formas de sentir, focar, aprender e me relacionar de outra maneira.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Organizar photocards em um binder, montar um toploader, planejar uma ida a um café
              temático, pesquisar um grupo, aprender palavras de outra língua, viajar para um show ou
              passar horas tentando entender alguma coisa que despertou minha curiosidade não precisavam
              ser vistos apenas como distrações. Podiam ser experiências, práticas, encontros e formas
              de expressão que diziam alguma coisa sobre mim.
            </p>

            <blockquote className="bg-[var(--k-acid)] p-6 border-2 border-[var(--ink)] rounded-xl shadow-[4px_4px_0_var(--ink)] transform rotate-1 my-10 text-center">
              <p className="display-font text-2xl sm:text-3xl font-bold leading-snug text-[var(--ink)]">
                O que acontece quando aquilo que amamos nos coloca em movimento?
              </p>
            </blockquote>

            <h2 className="display-font text-3xl font-bold text-[var(--ink)] mt-12 mb-6">
              Por que “Além da Grade”?
            </h2>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Nos estádios e casas de shows, a grade diante do palco parece ocupar um lugar quase
              sagrado. Existe uma ideia de que fã de verdade é aquela que está disposta a se
              sacrificar para provar o quanto ama.
            </p>

            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Passar horas ou dias em filas, abrir mão de água, sono, descanso e conforto, disputar cada
              espaço e ultrapassar os próprios limites para conseguir chegar o mais perto possível do artista.
              Como se sofrer fosse uma prova de amor.
            </p>

            <p className="text-lg font-bold leading-relaxed text-[var(--k-lilac)] mb-6">
              Para mim, estar além da grade é justamente isso: perceber que a intensidade do meu afeto
              não precisa ser medida pelo tamanho do meu sacrifício.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f0e6ff] p-4 border-2 border-[var(--ink)] rounded-xl text-sm font-bold text-center shadow-[2px_2px_0_var(--ink)]">
                É poder chegar perto sem precisar se machucar para provar alguma coisa.
              </div>
              <div className="bg-[#ffe6f2] p-4 border-2 border-[var(--ink)] rounded-xl text-sm font-bold text-center shadow-[2px_2px_0_var(--ink)]">
                É poder se afastar quando for necessário.
              </div>
              <div className="bg-[#e6ffff] p-4 border-2 border-[var(--ink)] rounded-xl text-sm font-bold text-center shadow-[2px_2px_0_var(--ink)]">
                É poder sentar. É poder respirar.
              </div>
              <div className="bg-[#fcffcc] p-4 border-2 border-[var(--ink)] rounded-xl text-sm font-bold text-center shadow-[2px_2px_0_var(--ink)]">
                É poder dizer não.
              </div>
            </div>

            <h2 className="display-font text-3xl font-bold text-[var(--ink)] mt-12 mb-4">
              Minhas lentes de apoio
            </h2>
            <p className="text-lg font-medium leading-relaxed text-neutral-800 mb-6">
              Não são respostas prontas. São campos de conhecimento que me ajudam a fazer perguntas melhores:
            </p>

            <div className="space-y-4 mb-10">
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-[var(--ink)] block mb-1">
                  1. Fan Studies / Estudos de Fãs
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para olhar para os fãs, suas práticas, comunidades, criações e formas de participação.
                </p>
              </div>
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-[var(--k-pink)] block mb-1">
                  2. Educação & Psicopedagogia
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para pensar aprendizagem, construção de repertório e as diferentes maneiras pelas quais aprendemos ao longo da vida.
                </p>
              </div>
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-[var(--k-cyan)] block mb-1">
                  3. Comunicação & Estudos de Mídia
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para observar como conteúdos circulam e como produzimos e compartilhamos significados coletivos.
                </p>
              </div>
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-[var(--k-lilac)] block mb-1">
                  4. Psicologia & Processos Humanos
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para pensar emoções, identidade, regulação, pertencimento e experiências individuais.
                </p>
              </div>
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-neutral-600 block mb-1">
                  5. Sociologia & Estudos da Cultura
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para olhar para normas sociais, geração, gênero e formas de participação coletiva.
                </p>
              </div>
              <div className="bg-white p-5 border-2 border-[var(--ink)] rounded-xl shadow-[3px_3px_0_var(--ink)]">
                <span className="display-font text-xl font-bold text-[#7cb305] block mb-1">
                  6. Neurociências & Ciências Cognitivas
                </span>
                <p className="text-sm font-medium text-neutral-700">
                  Para investigar aspectos relacionados à atenção, memória, neurodivergência e processamento sensorial.
                </p>
              </div>
            </div>

            <div className="text-center pt-8 border-t-2 border-dashed border-[var(--ink)] pb-4">
              <p className="hand-font text-3xl sm:text-4xl text-[var(--k-pink)] transform -rotate-2 font-bold mb-6">
                "Porque o entusiasmo não precisa pedir licença para existir."
              </p>
              <div className="flex justify-center">
                <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--ink)] bg-[var(--k-acid)] px-4 py-2 border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] rounded-full">
                  @Laryliissa
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
