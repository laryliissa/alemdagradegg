import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Share2,
  Heart,
  Globe,
  Brain,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Lente {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tagBg: string;
  tagText: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  exampleQuestion: string;
}

const LENTES_DATA: Lente[] = [
  {
    id: 'fan-studies',
    number: '01',
    title: 'Fan Studies / Estudos de Fãs',
    subtitle: 'Cultura, Práticas & Criação',
    description:
      'Para olhar para os fãs, suas práticas, comunidades, criações e formas de participação.',
    tag: 'Fandom & Cultura',
    tagBg: 'bg-[var(--k-lilac)]',
    tagText: 'text-white',
    borderColor: 'border-[var(--k-lilac)]',
    icon: Sparkles,
    exampleQuestion:
      'Quando uma prática de fã deixa de ser apenas consumo e se transforma em produção cultural e compartilhamento?',
  },
  {
    id: 'educacao',
    number: '02',
    title: 'Educação & Psicopedagogia',
    subtitle: 'Aprendizagem Informal & Metacognição',
    description:
      'Para pensar aprendizagem, construção de repertório e as diferentes maneiras pelas quais aprendemos ao longo da vida.',
    tag: 'Aprendizagem Informal',
    tagBg: 'bg-[var(--k-pink)]',
    tagText: 'text-white',
    borderColor: 'border-[var(--k-pink)]',
    icon: GraduationCap,
    exampleQuestion:
      'O que aprendemos quando alguma coisa nos interessa profundamente? O que já sabemos e ainda não reconhecemos como conhecimento?',
  },
  {
    id: 'comunicacao',
    number: '03',
    title: 'Comunicação & Estudos de Mídia',
    subtitle: 'Circulação, Redes & Plataformas',
    description:
      'Para observar como conteúdos circulam e como produzimos e compartilhamos significados coletivos.',
    tag: 'Cultura Digital',
    tagBg: 'bg-[var(--k-cyan)]',
    tagText: 'text-[var(--ink)]',
    borderColor: 'border-[var(--k-cyan)]',
    icon: Share2,
    exampleQuestion:
      'Como narrativas transmidiáticas e conteúdos da Hallyu circulam e como os fãs ressignificam esses discursos?',
  },
  {
    id: 'psicologia',
    number: '04',
    title: 'Psicologia & Processos Humanos',
    subtitle: 'Identidade, Afetos & Pertencimento',
    description:
      'Para pensar emoções, identidade, regulação, pertencimento e experiências individuais.',
    tag: 'Afetos & Identidade',
    tagBg: 'bg-[var(--k-acid)]',
    tagText: 'text-[var(--ink)]',
    borderColor: 'border-[var(--ink)]',
    icon: Heart,
    exampleQuestion:
      'Depois de perder um lugar no mundo, onde encontramos pertencimento? Como o investimento afetivo encontra caminhos de sublimação criativa?',
  },
  {
    id: 'sociologia',
    number: '05',
    title: 'Sociologia & Estudos da Cultura',
    subtitle: 'Gênero, Normas Sociais & Idade',
    description:
      'Para olhar para normas sociais, geração, gênero e formas de participação coletiva.',
    tag: 'Sociedade & Adultismo',
    tagBg: 'bg-[#ffcc99]',
    tagText: 'text-[var(--ink)]',
    borderColor: 'border-orange-400',
    icon: Globe,
    exampleQuestion:
      'Por que mulheres com tanto repertório muitas vezes acreditam que não têm autoridade para falar? Como o adultismo tenta deslegitimar a paixão?',
  },
  {
    id: 'neurociencias',
    number: '06',
    title: 'Neurociências & Ciências Cognitivas',
    subtitle: 'Sensorial, Atenção & Neurodivergência',
    description:
      'Para investigar aspectos relacionados à atenção, memória, neurodivergência e processamento sensorial.',
    tag: 'Sensorial & Cognição',
    tagBg: 'bg-[#b8f5d0]',
    tagText: 'text-[var(--ink)]',
    borderColor: 'border-emerald-500',
    icon: Brain,
    exampleQuestion:
      'A multidão é realmente o problema ou o significado compartilhado, o contexto e o pertencimento alteram a experiência sensorial do corpo?',
  },
];

export const LentesDeApoioSection: React.FC = () => {
  const [expandedLente, setExpandedLente] = useState<string | null>(null);

  const toggleLente = (id: string) => {
    setExpandedLente(expandedLente === id ? null : id);
  };

  return (
    <div className="sticker-card p-6 sm:p-8 bg-gradient-to-br from-[#f8f9ff] via-[#f5f0ff] to-[#fff5fa] border-2 border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] rounded-2xl mb-8">
      {/* Header do Espaço */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-dashed border-[var(--ink)] mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-[var(--k-cyan)] text-[var(--ink)] rounded-lg border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--ink)] bg-[var(--k-acid)] px-2.5 py-0.5 rounded border border-[var(--ink)]">
              Território das Aprendizagens
            </span>
          </div>
          <h3 className="display-font text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Minhas lentes de apoio
          </h3>
        </div>

        <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] text-xs font-medium text-neutral-700 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-[var(--k-pink)] shrink-0" />
          <span>6 campos de investigação</span>
        </div>
      </div>

      {/* Frase Guia */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] mb-6">
        <p className="hand-font text-2xl sm:text-3xl text-[var(--ink)] font-bold mb-1">
          “Não são respostas prontas. São campos de conhecimento que me ajudam a fazer perguntas melhores.”
        </p>
        <p className="mono-font text-xs text-neutral-500 uppercase tracking-wider font-semibold">
          ✦ Princípio metodológico da pesquisa Além da Grade
        </p>
      </div>

      {/* Grid de 6 Lentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {LENTES_DATA.map((lente) => {
          const Icon = lente.icon;
          const isExpanded = expandedLente === lente.id;

          return (
            <div
              key={lente.id}
              onClick={() => toggleLente(lente.id)}
              className={`bg-white rounded-xl border-2 border-[var(--ink)] p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer shadow-[3px_3px_0_var(--ink)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_var(--ink)] ${
                isExpanded ? 'ring-2 ring-[var(--k-pink)] bg-[#faf8ff]' : ''
              }`}
            >
              <div>
                {/* Top bar do Card: Número e Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="mono-font text-xs font-black text-neutral-400">
                      {lente.number}
                    </span>
                    <span
                      className={`mono-font text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-[var(--ink)] ${lente.tagBg} ${lente.tagText}`}
                    >
                      {lente.tag}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-lg border border-[var(--ink)] flex items-center justify-center bg-white shadow-[1px_1px_0_var(--ink)]">
                    <Icon className="w-3.5 h-3.5 text-[var(--ink)]" />
                  </div>
                </div>

                {/* Título & Subtítulo */}
                <h4 className="display-font text-base sm:text-lg font-bold text-[var(--ink)] leading-snug mb-1">
                  {lente.title}
                </h4>
                <p className="mono-font text-[11px] text-neutral-500 font-medium mb-3">
                  {lente.subtitle}
                </p>

                {/* Descrição Principal */}
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed mb-3">
                  {lente.description}
                </p>
              </div>

              {/* Botão de Expansão para Pergunta de Investigação */}
              <div className="pt-3 border-t border-dashed border-neutral-300">
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-[11px] mono-font font-bold text-[var(--ink)] hover:text-[var(--k-pink)] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[var(--k-lilac)]" />
                    Pergunta investigativa
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2.5 p-3 rounded-lg bg-[var(--paper)] border border-[var(--ink)] animate-in fade-in duration-200">
                    <p className="text-xs font-semibold text-[var(--ink)] italic leading-relaxed">
                      “{lente.exampleQuestion}”
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
