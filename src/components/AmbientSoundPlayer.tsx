import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

type SoundPreset = 'chuva' | 'vinil' | 'cafe';

const PRESETS: Record<SoundPreset, { label: string; desc: string; icon: string }> = {
  chuva: {
    label: 'Chuva na Janela',
    desc: 'Gotas suaves e ruído relaxante para foco e leitura',
    icon: '🌧️',
  },
  vinil: {
    label: 'Vinil & Foco Lo-Fi',
    desc: 'Textura acústica acolhedora e frequências calmas',
    icon: '☕',
  },
  cafe: {
    label: 'Café em Hongdae',
    desc: 'Ressonância suave inspirada em pausas aconchegantes',
    icon: '🍵',
  },
};

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState<SoundPreset>('chuva');
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeSourcesRef = useRef<Array<AudioNode>>([]);
  const timerRef = useRef<number | null>(null);

  // Inicializa ou retoma contexto de áudio com proteção para iframes
  const getAudioContext = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch (e) {
      console.warn('Áudio indisponível neste ambiente:', e);
      return null;
    }
  };

  const stopCurrentAudio = () => {
    try {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      activeSourcesRef.current.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // Ignora erros ao parar fontes já finalizadas
        }
      });
      activeSourcesRef.current = [];
    } catch (e) {
      console.warn('Erro ao parar áudio:', e);
    }
  };

  const startAudio = (type: SoundPreset) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      stopCurrentAudio();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (type === 'chuva') {
        // Gerador de ruído rosa suave para simular chuva
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        activeSourcesRef.current.push(whiteNoise, filter);
      } else if (type === 'vinil') {
        // Onda harmônica quente e grave em frequências de relaxamento (Fá / Lá / Dó)
        const freqs = [174.61, 220.0, 261.63]; // F3, A3, C4
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Leve modulação de afinação (vibrato de vinil)
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.3 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
          osc.connect(subGain);
          subGain.connect(masterGain);
          osc.start();

          activeSourcesRef.current.push(osc, lfo, lfoGain, subGain);
        });
      } else if (type === 'cafe') {
        // Acorde harmônico quente e sino procedural calmo
        const chord = [130.81, 164.81, 196.0, 246.94]; // C3, E3, G3, B3 (Cmaj7)
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.05, ctx.currentTime);

          osc.connect(filter);
          filter.connect(subGain);
          subGain.connect(masterGain);
          osc.start();

          activeSourcesRef.current.push(osc, filter, subGain);
        });
      }
    } catch (err) {
      console.error('Erro ao iniciar áudio de ambiente:', err);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        isMuted ? 0 : volume,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      startAudio(preset);
    } else {
      stopCurrentAudio();
    }
    return () => {
      stopCurrentAudio();
    };
  }, [isPlaying, preset]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <aside aria-label="Notas Sonoras e Ambientação" className="fixed bottom-5 right-5 z-40">
      <div
        className={`bg-white border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0_var(--ink)] transition-all duration-200 overflow-hidden ${
          isExpanded ? 'w-72 sm:w-80 p-4' : 'p-2'
        }`}
      >
        {isExpanded ? (
          <div>
            {/* Header da Gaveta */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-[var(--ink)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[var(--k-lilac)] border border-[var(--ink)] rounded-md text-[var(--ink)]">
                  <Music className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="display-font text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    Notas Sonoras
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-medium">Sons para foco & leitura</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-neutral-500 hover:text-[var(--ink)] transition-colors"
                title="Minimizar tocador"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-col gap-2 mb-3">
              {(Object.keys(PRESETS) as SoundPreset[]).map((key) => {
                const item = PRESETS[key];
                const active = preset === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setPreset(key);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl border-2 text-left transition-all ${
                      active
                        ? 'border-[var(--ink)] bg-[var(--bg-dots)] shadow-[2px_2px_0_var(--ink)] font-bold text-[var(--ink)]'
                        : 'border-transparent hover:bg-neutral-100 text-neutral-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <div className="text-xs">{item.label}</div>
                        <div className="text-[10px] text-neutral-500 line-clamp-1">{item.desc}</div>
                      </div>
                    </div>
                    {active && isPlaying && (
                      <span className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-[var(--k-pink)] animate-bounce h-3 rounded-full" />
                        <span className="w-1 bg-[var(--k-lilac)] animate-bounce h-2 rounded-full delay-100" />
                        <span className="w-1 bg-[var(--k-acid)] animate-bounce h-2.5 rounded-full delay-200" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controles de Volume e Play */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-neutral-200">
              <button
                onClick={togglePlay}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[var(--ink)] mono-font text-[11px] font-bold uppercase transition-all shadow-[2px_2px_0_var(--ink)] ${
                  isPlaying
                    ? 'bg-[var(--k-pink)] text-white hover:bg-[var(--k-lilac)]'
                    : 'bg-[var(--k-acid)] text-[var(--ink)] hover:bg-[var(--k-cyan)]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Ouvir
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 flex-grow justify-end">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-neutral-500 hover:text-[var(--ink)]"
                  title={isMuted ? 'Desmutar' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-16 accent-[var(--k-pink)] cursor-pointer"
                  title="Volume de ambientação"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Versão Compacta (Botão Flutuante) */
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`p-2 rounded-xl border-2 border-[var(--ink)] flex items-center justify-center transition-all shadow-[2px_2px_0_var(--ink)] ${
                isPlaying ? 'bg-[var(--k-pink)] text-white' : 'bg-[var(--k-acid)] text-[var(--ink)]'
              }`}
              title={isPlaying ? 'Pausar áudio ambiente' : 'Tocar som ambiente para leitura'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-2.5 py-1 text-left group hover:bg-neutral-50 rounded-lg"
              title="Abrir configurações de som ambiente"
            >
              <div>
                <div className="mono-font text-[10px] uppercase font-bold text-[var(--ink)] flex items-center gap-1">
                  <span>{PRESETS[preset].icon}</span>
                  <span>{PRESETS[preset].label}</span>
                </div>
                <div className="text-[9px] text-neutral-500 font-medium">
                  {isPlaying ? 'Em reprodução' : 'Som de foco'}
                </div>
              </div>
              <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:text-[var(--ink)]" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
