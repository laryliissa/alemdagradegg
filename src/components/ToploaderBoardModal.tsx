import React, { useState } from 'react';
import { X, Sparkles, RotateCcw, Heart, Star, Smile, Check, Shield } from 'lucide-react';

interface ToploaderBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHOTOCARDS = [
  {
    id: 'pc1',
    name: 'Stray Kids no Palco',
    url: 'stray-kids-festival.jpeg',
    alt: 'Show e luzes de festival',
    sub: 'Festival · 2026',
  },
  {
    id: 'pc2',
    name: 'Papelaria & Washi',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    alt: 'Mesa de estudos e criação',
    sub: 'Mesa de Criação',
  },
  {
    id: 'pc3',
    name: 'Fones & Trilha Sonora',
    url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    alt: 'Música e terapia',
    sub: 'Permissão para Sentir',
  },
  {
    id: 'pc4',
    name: 'Retrato de Autora',
    url: 'foto-lary.jpg',
    alt: 'Foto de Laryliissa',
    sub: 'Diário de Campo',
  },
];

const TOPLOADER_STYLES = [
  { id: 'holo', label: 'Holográfico ✦', border: 'border-white/80 shadow-[0_0_15px_rgba(179,136,255,0.4)]' },
  { id: 'lilac', label: 'Borda Lilás', border: 'border-[var(--k-lilac)] shadow-[4px_4px_0_var(--ink)]' },
  { id: 'acid', label: 'Borda Ácida', border: 'border-[var(--k-acid)] shadow-[4px_4px_0_var(--ink)]' },
  { id: 'clean', label: 'Acrílico Puro', border: 'border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]' },
];

const STICKERS_POOL = [
  { id: 's1', text: '✦ ALÉM DA GRADE', bg: 'bg-[var(--k-acid)] text-[var(--ink)]', angle: '-rotate-3' },
  { id: 's2', text: '♡ LIMITES SÃO AFETO', bg: 'bg-[var(--k-pink)] text-white', angle: 'rotate-2' },
  { id: 's3', text: '30+ & FÃ COM ORGULHO', bg: 'bg-[var(--k-lilac)] text-white', angle: '-rotate-6' },
  { id: 's4', text: '★ SALOMPAS CLUB', bg: 'bg-[var(--k-cyan)] text-[var(--ink)]', angle: 'rotate-3' },
  { id: 's5', text: '✿ PAZ > FANWAR', bg: 'bg-white text-[var(--ink)]', angle: '-rotate-1' },
  { id: 's6', text: '✦ FÃ DE CORPO INTEIRO', bg: 'bg-[var(--k-pink)] text-white', angle: 'rotate-4' },
];

export const ToploaderBoardModal: React.FC<ToploaderBoardModalProps> = ({ isOpen, onClose }) => {
  const [selectedPc, setSelectedPc] = useState(PHOTOCARDS[0]);
  const [activeFrame, setActiveFrame] = useState(TOPLOADER_STYLES[0]);
  const [activeStickers, setActiveStickers] = useState<string[]>(['s1', 's2', 's4']);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const toggleSticker = (id: string) => {
    setActiveStickers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSaveToBinder = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--ink)]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-[var(--ink)] rounded-2xl shadow-[8px_8px_0_var(--ink)] max-w-4xl w-full max-h-[92vh] flex flex-col my-auto overflow-hidden">
        {/* Cabeçalho */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--bg-dots)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[var(--k-lilac)] border-2 border-[var(--ink)] rounded-lg text-white">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="display-font text-lg sm:text-xl font-bold text-[var(--ink)]">
                Mural de Toploaders Decorados
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                Personalize seu photocard virtual com stickers e fitas zine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-transparent hover:border-[var(--ink)] hover:bg-[var(--k-pink)] hover:text-white transition-all"
            title="Fechar mural"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Principal (2 Colunas) */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow grid md:grid-cols-[1fr_340px] gap-8 items-center bg-[var(--paper)]">
          {/* Coluna 1: O Toploader com Photocard e Stickers */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative group select-none">
              {/* Washi Tape Superior */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[var(--k-acid)] opacity-95 rotate-[-2deg] z-20 border border-[var(--ink)] shadow-[2px_2px_0_rgba(0,0,0,0.15)] flex items-center justify-center">
                <span className="mono-font text-[9px] uppercase font-bold text-[var(--ink)]">
                  ALÉM DA GRADE
                </span>
              </div>

              {/* Moldura do Toploader (Sleeve) */}
              <div
                className={`w-64 sm:w-72 h-96 sm:h-[420px] rounded-2xl border-4 ${activeFrame.border} bg-white/70 backdrop-blur-xs p-3 relative flex flex-col justify-between overflow-hidden transition-all duration-300`}
                style={{
                  backgroundImage:
                    activeFrame.id === 'holo'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(212,255,0,0.15) 50%, rgba(179,136,255,0.2) 100%)'
                      : undefined,
                }}
              >
                {/* O Photocard Real */}
                <div className="w-full h-full rounded-xl overflow-hidden border-2 border-[var(--ink)] relative shadow-inner bg-neutral-900">
                  <img
                    src={selectedPc.url}
                    alt={selectedPc.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1540039155732-d674140ca1d4?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* Informação do Card */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 text-white">
                    <span className="mono-font text-[10px] uppercase font-bold text-[var(--k-acid)] block">
                      {selectedPc.sub}
                    </span>
                    <h4 className="display-font text-sm font-bold leading-tight">{selectedPc.name}</h4>
                  </div>
                </div>

                {/* Camada de Stickers Aplicados */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 justify-between">
                    {activeStickers.includes('s1') && (
                      <span className="mono-font text-[10px] font-bold px-2 py-0.5 border border-[var(--ink)] rounded shadow-[2px_2px_0_var(--ink)] bg-[var(--k-acid)] text-[var(--ink)] -rotate-3">
                        ✦ ALÉM DA GRADE
                      </span>
                    )}
                    {activeStickers.includes('s4') && (
                      <span className="mono-font text-[10px] font-bold px-2 py-0.5 border border-[var(--ink)] rounded shadow-[2px_2px_0_var(--ink)] bg-[var(--k-cyan)] text-[var(--ink)] rotate-3">
                        ★ SALOMPAS CLUB
                      </span>
                    )}
                  </div>

                  <div className="my-auto flex flex-col items-center gap-2">
                    {activeStickers.includes('s3') && (
                      <span className="mono-font text-[10px] font-bold px-2.5 py-0.5 border border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)] bg-[var(--k-lilac)] text-white -rotate-6">
                        30+ & FÃ COM ORGULHO
                      </span>
                    )}
                    {activeStickers.includes('s5') && (
                      <span className="mono-font text-[10px] font-bold px-2 py-0.5 border border-[var(--ink)] rounded shadow-[2px_2px_0_var(--ink)] bg-white text-[var(--ink)] -rotate-1">
                        ✿ PAZ &gt; FANWAR
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-between items-end">
                    {activeStickers.includes('s2') && (
                      <span className="mono-font text-[10px] font-bold px-2 py-0.5 border border-[var(--ink)] rounded shadow-[2px_2px_0_var(--ink)] bg-[var(--k-pink)] text-white rotate-2">
                        ♡ LIMITES SÃO AFETO
                      </span>
                    )}
                    {activeStickers.includes('s6') && (
                      <span className="mono-font text-[10px] font-bold px-2 py-0.5 border border-[var(--ink)] rounded shadow-[2px_2px_0_var(--ink)] bg-[var(--k-pink)] text-white rotate-4">
                        ✦ FÃ DE CORPO INTEIRO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso de Salvo */}
            {savedNotice && (
              <div className="mt-4 mono-font text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-bounce">
                <Check className="w-3.5 h-3.5" /> Toploader guardado com carinho no seu binder!
              </div>
            )}
          </div>

          {/* Coluna 2: Controles de Decoração */}
          <div className="flex flex-col gap-5">
            {/* Escolha do Photocard */}
            <div>
              <h4 className="mono-font text-xs font-bold uppercase text-[var(--ink)] mb-2 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-[var(--k-pink)]" /> 1. Escolha o Photocard
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {PHOTOCARDS.map((pc) => (
                  <button
                    key={pc.id}
                    onClick={() => setSelectedPc(pc)}
                    className={`p-2 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                      selectedPc.id === pc.id
                        ? 'border-[var(--ink)] bg-white shadow-[2px_2px_0_var(--ink)] font-bold'
                        : 'border-neutral-200 bg-white/60 hover:border-[var(--ink)] text-neutral-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--ink)] shrink-0 bg-neutral-200">
                      <img src={pc.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] line-clamp-1">{pc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Escolha da Moldura (Toploader Sleeve) */}
            <div>
              <h4 className="mono-font text-xs font-bold uppercase text-[var(--ink)] mb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[var(--k-lilac)]" /> 2. Estilo do Toploader
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {TOPLOADER_STYLES.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setActiveFrame(frame)}
                    className={`p-2 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                      activeFrame.id === frame.id
                        ? 'border-[var(--ink)] bg-[var(--k-lilac)] text-white shadow-[2px_2px_0_var(--ink)]'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[var(--ink)]'
                    }`}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Adesivos / Stickers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="mono-font text-xs font-bold uppercase text-[var(--ink)] flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[var(--k-acid)]" /> 3. Colar Adesivos
                </h4>
                <button
                  onClick={() => setActiveStickers([])}
                  className="mono-font text-[10px] text-neutral-500 hover:text-[var(--k-pink)] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Limpar
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STICKERS_POOL.map((stk) => {
                  const active = activeStickers.includes(stk.id);
                  return (
                    <button
                      key={stk.id}
                      onClick={() => toggleSticker(stk.id)}
                      className={`mono-font text-[10px] font-bold px-2.5 py-1 rounded-lg border-2 transition-all ${
                        active
                          ? `${stk.bg} border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] -translate-y-0.5`
                          : 'bg-white border-neutral-300 text-neutral-400 opacity-60 hover:opacity-100 hover:border-[var(--ink)]'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {stk.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botão de Guardar */}
            <div className="pt-2">
              <button
                onClick={handleSaveToBinder}
                className="w-full mono-font text-xs font-bold uppercase py-3 rounded-xl bg-[var(--k-pink)] text-white border-2 border-[var(--ink)] hover:bg-[var(--k-lilac)] transition-all shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" /> Guardar no meu Binder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
