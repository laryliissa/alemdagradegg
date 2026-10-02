import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Download,
  BookOpen,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Trash2,
  Heart,
  Star,
  Check,
  Upload,
} from 'lucide-react';

interface ToploaderBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlacedSticker {
  id: string;
  type: 'text' | 'emoji' | 'ribbon';
  content: string;
  x: number; // porcentagem 0-100
  y: number; // porcentagem 0-100
  bg?: string;
  color?: string;
  rotation?: number;
}

interface SavedToploader {
  id: string;
  title: string;
  date: string;
  photoUrl: string;
  holoStyle: string;
  decodenColor: string;
  stickers: PlacedSticker[];
}

const DEFAULT_PHOTOS = [
  {
    id: 'p1',
    name: 'Rock in Rio 2026',
    url: '01.png',
    tag: 'Festival Stray Kids',
  },
  {
    id: 'p2',
    name: 'Nachimbong & Palco',
    url: 'stray-kids-festival.jpeg',
    tag: 'Lightstick',
  },
  {
    id: 'p3',
    name: 'Mesa de Estudos & Zine',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    tag: 'Papelaria',
  },
  {
    id: 'p4',
    name: 'Fones & Música',
    url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=600',
    tag: 'Lo-Fi',
  },
];

const HOLO_PATTERNS = [
  { id: 'none', label: 'Transparente', class: '' },
  {
    id: 'stars',
    label: 'Holo Estrelas ✨',
    class:
      'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[length:14px_14px] animate-pulse',
  },
  {
    id: 'glass',
    label: 'Vidro Quebrado 💎',
    class:
      'bg-gradient-to-tr from-pink-300/30 via-cyan-300/25 to-yellow-300/30 mix-blend-color-dodge backdrop-blur-[0.5px]',
  },
  {
    id: 'hearts',
    label: 'Holo Corações 💖',
    class: 'bg-gradient-to-b from-purple-400/20 via-pink-400/25 to-transparent',
  },
];

const DECODEN_OPTIONS = [
  { id: 'none', label: 'Sem Decoden', borderClass: 'border-white/60' },
  {
    id: 'lilac',
    label: 'Chantilly Lilás',
    borderClass: 'border-[8px] border-[#d8b4fe] shadow-[inset_0_0_8px_rgba(168,85,247,0.4)]',
  },
  {
    id: 'pink',
    label: 'Chantilly Rosa',
    borderClass: 'border-[8px] border-[#f472b6] shadow-[inset_0_0_8px_rgba(244,114,182,0.4)]',
  },
  {
    id: 'yellow',
    label: 'Amarelo Manteiga',
    borderClass: 'border-[8px] border-[#fef08a] shadow-[inset_0_0_8px_rgba(234,179,8,0.3)]',
  },
  {
    id: 'mint',
    label: 'Menta Fresca',
    borderClass: 'border-[8px] border-[#a7f3d0] shadow-[inset_0_0_8px_rgba(16,185,129,0.3)]',
  },
];

const STICKER_PALETTE = [
  // Adesivos de texto e afeto
  { type: 'text' as const, content: '✦ ALÉM DA GRADE', bg: 'bg-[var(--k-acid)]', color: 'text-[var(--ink)]' },
  { type: 'text' as const, content: '♡ STAY 2026', bg: 'bg-[var(--k-pink)]', color: 'text-white' },
  { type: 'text' as const, content: '30+ & FÃ', bg: 'bg-[var(--k-lilac)]', color: 'text-white' },
  { type: 'text' as const, content: '★ SALOMPAS CLUB', bg: 'bg-[var(--k-cyan)]', color: 'text-[var(--ink)]' },
  { type: 'text' as const, content: '행복 (Felicidade)', bg: 'bg-white', color: 'text-[var(--ink)]' },
  { type: 'text' as const, content: '사랑해 (Te Amo)', bg: 'bg-[var(--k-pink)]', color: 'text-white' },
  // Polco deco & SKZOO mascotes
  { type: 'emoji' as const, content: '🐥' }, // BbokAri
  { type: 'emoji' as const, content: '🐺' }, // Wolf Chan
  { type: 'emoji' as const, content: '🐰' }, // Leebit
  { type: 'emoji' as const, content: '🎀' }, // Ribbon
  { type: 'emoji' as const, content: '💖' },
  { type: 'emoji' as const, content: '✨' },
  { type: 'emoji' as const, content: '⭐' },
  { type: 'emoji' as const, content: '🌸' },
  { type: 'emoji' as const, content: '🎫' },
];

const BINDER_STORAGE_KEY = 'alem_da_grade_binder_collection';

export const ToploaderBoardModal: React.FC<ToploaderBoardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'binder'>('editor');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(DEFAULT_PHOTOS[0].url);
  const [selectedHolo, setSelectedHolo] = useState<string>('stars');
  const [selectedDecoden, setSelectedDecoden] = useState<string>('lilac');
  const [stickers, setStickers] = useState<PlacedSticker[]>([
    {
      id: 'stk-1',
      type: 'text',
      content: '✦ ALÉM DA GRADE',
      x: 18,
      y: 12,
      bg: 'bg-[var(--k-acid)]',
      color: 'text-[var(--ink)]',
      rotation: -4,
    },
    {
      id: 'stk-2',
      type: 'emoji',
      content: '🐥',
      x: 75,
      y: 15,
      rotation: 8,
    },
    {
      id: 'stk-3',
      type: 'text',
      content: '♡ STAY 2026',
      x: 35,
      y: 84,
      bg: 'bg-[var(--k-pink)]',
      color: 'text-white',
      rotation: 3,
    },
    {
      id: 'stk-4',
      type: 'emoji',
      content: '✨',
      x: 12,
      y: 75,
      rotation: -10,
    },
  ]);

  const [savedBinders, setSavedBinders] = useState<SavedToploader[]>(() => {
    try {
      const stored = localStorage.getItem(BINDER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const toploaderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(BINDER_STORAGE_KEY, JSON.stringify(savedBinders));
    } catch (e) {
      console.error('Erro ao salvar binder:', e);
    }
  }, [savedBinders]);

  if (!isOpen) return null;

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSticker = (item: (typeof STICKER_PALETTE)[0]) => {
    const newStk: PlacedSticker = {
      id: `stk-${Date.now()}-${Math.random()}`,
      type: item.type,
      content: item.content,
      x: 20 + Math.random() * 50,
      y: 20 + Math.random() * 50,
      bg: item.bg,
      color: item.color,
      rotation: Math.floor(Math.random() * 16) - 8,
    };
    setStickers((prev) => [...prev, newStk]);
  };

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearStickers = () => {
    setStickers([]);
  };

  const handleSaveToBinder = () => {
    const newEntry: SavedToploader = {
      id: `pc-${Date.now()}`,
      title: `Toploader #${savedBinders.length + 1}`,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      photoUrl: selectedPhoto,
      holoStyle: selectedHolo,
      decodenColor: selectedDecoden,
      stickers: [...stickers],
    };
    setSavedBinders((prev) => [newEntry, ...prev]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteFromBinder = (id: string) => {
    setSavedBinders((prev) => prev.filter((b) => b.id !== id));
  };

  // Renderiza e baixa em PNG via Canvas nativo do navegador
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const width = 600;
    const height = 850;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fundo do toploader
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Carrega a foto base
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Desenha imagem centralizada com margem interna
      const pad = 36;
      ctx.drawImage(img, pad, pad, width - pad * 2, height - pad * 2);

      // Efeito Holo
      if (selectedHolo === 'stars') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < 40; i++) {
          const rx = pad + Math.random() * (width - pad * 2);
          const ry = pad + Math.random() * (height - pad * 2);
          ctx.beginPath();
          ctx.arc(rx, ry, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (selectedHolo === 'glass') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, 'rgba(255, 182, 193, 0.25)');
        grad.addColorStop(0.5, 'rgba(179, 136, 255, 0.2)');
        grad.addColorStop(1, 'rgba(212, 255, 0, 0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(pad, pad, width - pad * 2, height - pad * 2);
      }

      // Decoden (Borda tipo chantilly)
      if (selectedDecoden !== 'none') {
        const borderColors: Record<string, string> = {
          lilac: '#d8b4fe',
          pink: '#f472b6',
          yellow: '#fef08a',
          mint: '#a7f3d0',
        };
        ctx.strokeStyle = borderColors[selectedDecoden] || '#d8b4fe';
        ctx.lineWidth = 18;
        ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

        // Pontinhos de chantilly nos cantos
        ctx.fillStyle = borderColors[selectedDecoden] || '#d8b4fe';
        [
          [pad, pad],
          [width - pad, pad],
          [pad, height - pad],
          [width - pad, height - pad],
        ].forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 18, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Moldura acrílica exterior
      ctx.strokeStyle = '#161124';
      ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Washi Tape Superior
      ctx.save();
      ctx.translate(width / 2, 28);
      ctx.rotate(-0.03);
      ctx.fillStyle = '#d4ff00';
      ctx.fillRect(-120, -14, 240, 28);
      ctx.strokeStyle = '#161124';
      ctx.lineWidth = 2;
      ctx.strokeRect(-120, -14, 240, 28);
      ctx.fillStyle = '#161124';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ALÉM DA GRADE • TOPLOADER', 0, 0);
      ctx.restore();

      // Desenha stickers colocados
      stickers.forEach((s) => {
        ctx.save();
        const px = (s.x / 100) * width;
        const py = (s.y / 100) * height;
        ctx.translate(px, py);
        ctx.rotate(((s.rotation || 0) * Math.PI) / 180);

        if (s.type === 'emoji') {
          ctx.font = '42px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(s.content, 0, 0);
        } else {
          ctx.font = 'bold 15px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textMetrics = ctx.measureText(s.content);
          const tw = textMetrics.width + 18;
          const th = 26;

          ctx.fillStyle = s.bg?.includes('pink')
            ? '#eb3f8f'
            : s.bg?.includes('acid')
            ? '#d4ff00'
            : s.bg?.includes('lilac')
            ? '#b388ff'
            : '#ffffff';
          ctx.fillRect(-tw / 2, -th / 2, tw, th);
          ctx.strokeStyle = '#161124';
          ctx.lineWidth = 2;
          ctx.strokeRect(-tw / 2, -th / 2, tw, th);

          ctx.fillStyle = s.color?.includes('white') ? '#ffffff' : '#161124';
          ctx.fillText(s.content, 0, 1);
        }
        ctx.restore();
      });

      // Baixa arquivo
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `toploader-alem-da-grade-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    };

    img.onerror = () => {
      // Fallback simples se imagem cross-origin falhar
      ctx.fillStyle = '#f0e6ff';
      ctx.fillRect(40, 40, width - 80, height - 80);
      ctx.fillStyle = '#161124';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Além da Grade Toploader', width / 2, height / 2);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `toploader-alem-da-grade-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    };

    img.src = selectedPhoto;
  };

  const activeHoloConfig = HOLO_PATTERNS.find((h) => h.id === selectedHolo);
  const activeDecodenConfig = DECODEN_OPTIONS.find((d) => d.id === selectedDecoden);

  return (
    <div className="fixed inset-0 z-50 bg-[var(--ink)]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white border-2 border-[var(--ink)] rounded-2xl shadow-[8px_8px_0_var(--ink)] max-w-5xl w-full max-h-[94vh] flex flex-col my-auto overflow-hidden animate-scaleUp">
        {/* Top Header com Abas */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--k-acid)]/40 flex items-center justify-between shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[var(--k-lilac)] border-2 border-[var(--ink)] rounded-xl text-white shadow-[2px_2px_0_var(--ink)]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="display-font text-lg sm:text-xl font-bold text-[var(--ink)]">
                Estúdio de Photocards & Toploaders
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                Decoden, sleeves holográficas e coleção em binder de 9 bolsos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Abas */}
            <div className="flex bg-white border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-[2px_2px_0_var(--ink)]">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-[var(--k-pink)] text-white'
                    : 'text-[var(--ink)] hover:bg-neutral-100'
                }`}
              >
                Decorar Toploader
              </button>
              <button
                onClick={() => setActiveTab('binder')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'binder'
                    ? 'bg-[var(--k-pink)] text-white'
                    : 'text-[var(--ink)] hover:bg-neutral-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Binder 9 Bolsos ({savedBinders.length})</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border-2 border-transparent hover:border-[var(--ink)] hover:bg-[var(--k-pink)] hover:text-white transition-all ml-2"
              title="Fechar estúdio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            ABA 1: EDITOR DE TOPLOADER (DECODEN & POLCO)
        ======================================================== */}
        {activeTab === 'editor' ? (
          <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-grow grid lg:grid-cols-[1fr_380px] gap-6 items-center bg-[var(--paper)]">
            {/* Visualização Central do Toploader Decorado */}
            <div className="flex flex-col items-center justify-center py-2">
              <div
                ref={toploaderRef}
                className="relative group select-none transition-transform hover:scale-[1.01]"
              >
                {/* Washi Tape Superior */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[var(--k-acid)] opacity-95 rotate-[-2deg] z-30 border border-[var(--ink)] shadow-[2px_2px_0_rgba(0,0,0,0.15)] flex items-center justify-center">
                  <span className="mono-font text-[9px] uppercase font-bold text-[var(--ink)] tracking-wider">
                    ALÉM DA GRADE ✦
                  </span>
                </div>

                {/* Case do Toploader Acrílico com Decoden */}
                <div
                  className={`w-64 sm:w-72 h-[380px] sm:h-[420px] rounded-2xl border-4 border-[var(--ink)] bg-white shadow-[6px_6px_0_var(--ink)] p-3 relative flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    activeDecodenConfig?.borderClass || ''
                  }`}
                >
                  {/* Foto Central do Photocard */}
                  <div className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900 border border-[var(--ink)]">
                    <img
                      src={selectedPhoto}
                      alt="Photocard"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Camada de Efeito Sleeve Holográfico */}
                    <div
                      className={`absolute inset-0 pointer-events-none ${
                        activeHoloConfig?.class || ''
                      }`}
                    />

                    {/* Stickers Decorativos Interativos */}
                    {stickers.map((s) => (
                      <div
                        key={s.id}
                        style={{
                          left: `${s.x}%`,
                          top: `${s.y}%`,
                          transform: `translate(-50%, -50%) rotate(${s.rotation || 0}deg)`,
                        }}
                        className="absolute z-20 group/stk cursor-pointer transition-transform hover:scale-110"
                        title="Clique para remover"
                        onClick={() => removeSticker(s.id)}
                      >
                        {s.type === 'emoji' ? (
                          <span className="text-3xl filter drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                            {s.content}
                          </span>
                        ) : (
                          <span
                            className={`mono-font text-[10px] font-bold uppercase px-2 py-1 border border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] whitespace-nowrap rounded ${
                              s.bg || 'bg-white'
                            } ${s.color || 'text-[var(--ink)]'}`}
                          >
                            {s.content}
                          </span>
                        )}
                        <span className="hidden group-hover/stk:block absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-0.5 text-[8px] z-30">
                          <X className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Detalhe do cantinho chanfrado do toploader acrílico */}
                  <div className="absolute bottom-1 right-2 text-[8px] font-mono text-neutral-400 select-none">
                    35PT ULTRA
                  </div>
                </div>
              </div>

              {/* Botões de Ação do Toploader */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleDownloadImage}
                  className="py-2.5 px-4 bg-[var(--k-acid)] text-[var(--ink)] font-bold text-xs rounded-xl border-2 border-[var(--ink)] hover:bg-yellow-300 transition-all shadow-[2px_2px_0_var(--ink)] flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess ? 'Baixado!' : 'Baixar Imagem (PNG)'}</span>
                </button>

                <button
                  onClick={handleSaveToBinder}
                  className="py-2.5 px-4 bg-[var(--k-pink)] text-white font-bold text-xs rounded-xl border-2 border-[var(--ink)] hover:bg-[var(--k-lilac)] transition-all shadow-[2px_2px_0_var(--ink)] flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{saveSuccess ? 'Guardado no Binder!' : 'Salvar no Binder'}</span>
                </button>

                <button
                  onClick={clearStickers}
                  className="p-2.5 bg-white text-neutral-600 rounded-xl border-2 border-[var(--ink)] hover:bg-neutral-100 transition-colors"
                  title="Limpar todos os adesivos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Coluna Lateral: Ferramentas & Cartela Polco Deco */}
            <div className="space-y-5 bg-white p-4 sm:p-5 rounded-2xl border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]">
              {/* 1. Escolha da Foto */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="mono-font text-[10px] uppercase font-bold text-neutral-700">
                    1. Foto do Photocard
                  </label>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-[var(--k-pink)] hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> Foto Própria
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {DEFAULT_PHOTOS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhoto(p.url)}
                      className={`h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedPhoto === p.url
                          ? 'border-[var(--k-pink)] ring-2 ring-[var(--k-pink)]/50 scale-105'
                          : 'border-neutral-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Sleeve Holográfico */}
              <div>
                <label className="block mono-font text-[10px] uppercase font-bold text-neutral-700 mb-2">
                  2. Manga Protetora (Holo Sleeve)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {HOLO_PATTERNS.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHolo(h.id)}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border text-left transition-all ${
                        selectedHolo === h.id
                          ? 'bg-[var(--k-lilac)]/25 border-2 border-[var(--ink)] font-bold shadow-[2px_2px_0_var(--ink)]'
                          : 'bg-neutral-50 border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Decoden (Chantilly de Confeiteiro) */}
              <div>
                <label className="block mono-font text-[10px] uppercase font-bold text-neutral-700 mb-2">
                  3. Borda Decoden (Chantilly 🎂)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {DECODEN_OPTIONS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDecoden(d.id)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border text-center transition-all ${
                        selectedDecoden === d.id
                          ? 'bg-[var(--k-acid)] border-2 border-[var(--ink)] font-bold shadow-[2px_2px_0_var(--ink)]'
                          : 'bg-neutral-50 border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Cartela de Adesivos Polco Deco */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="mono-font text-[10px] uppercase font-bold text-neutral-700">
                    4. Cartela de Adesivos Polco (Clique para Colar)
                  </label>
                  <span className="text-[10px] text-neutral-500">{stickers.length} no card</span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-neutral-50 border border-neutral-200 rounded-xl custom-scrollbar">
                  {STICKER_PALETTE.map((stk, idx) => (
                    <button
                      key={idx}
                      onClick={() => addSticker(stk)}
                      className={`py-1 px-2.5 rounded-lg border border-[var(--ink)] text-xs font-bold transition-transform hover:scale-105 active:scale-95 flex items-center gap-1 ${
                        stk.type === 'emoji'
                          ? 'text-lg bg-white shadow-xs'
                          : `${stk.bg} ${stk.color} shadow-xs`
                      }`}
                    >
                      <span>{stk.content}</span>
                      <Plus className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             ABA 2: BINDER DIGITAL ESTILO COLEÇÃO K-POP (GRADE 3X3)
          ======================================================== */
          <div className="p-6 overflow-y-auto custom-scrollbar flex-grow bg-neutral-900 text-white flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="display-font text-lg font-bold text-[var(--k-acid)]">
                  Pasta Binder de Coleção (Ultra-Pro 9 Bolsos)
                </h4>
                <p className="text-xs text-neutral-400">
                  Os toploaders que você montou e guardou ficam organizados aqui
                </p>
              </div>

              <button
                onClick={() => setActiveTab('editor')}
                className="py-1.5 px-3 bg-[var(--k-pink)] text-white text-xs font-bold rounded-lg border border-white/40 hover:bg-[var(--k-lilac)]"
              >
                + Montar Novo Card
              </button>
            </div>

            {savedBinders.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-neutral-700 rounded-2xl bg-neutral-950/50">
                <BookOpen className="w-12 h-12 text-neutral-600 mb-3" />
                <h5 className="font-bold text-neutral-300">Seu binder ainda está vazio</h5>
                <p className="text-xs text-neutral-500 max-w-sm mt-1">
                  Vá na aba "Decorar Toploader", escolha seus adesivos, decoden e clique em "Salvar
                  no Binder" para preencher seus 9 bolsos!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {savedBinders.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700 flex flex-col justify-between group hover:border-[var(--k-acid)] transition-all"
                  >
                    <div className="w-full h-48 rounded-lg overflow-hidden relative border border-white/20 mb-2">
                      <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white">
                        {item.title}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="mono-font text-[10px] text-neutral-400">{item.date}</span>
                      <button
                        onClick={() => handleDeleteFromBinder(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                        title="Remover do binder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
