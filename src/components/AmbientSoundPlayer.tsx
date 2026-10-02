import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, ChevronDown, ChevronUp, Coffee, CloudRain, Disc } from 'lucide-react';

type SoundScene = 'cafe_seoul' | 'chuva_lofi' | 'noite_chuvosa';

interface SceneConfig {
  id: SoundScene;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
}

const SCENES: SceneConfig[] = [
  {
    id: 'cafe_seoul',
    title: 'Café em Seul & Rhodes',
    subtitle: 'Piano elétrico Lo-Fi, xícaras quentes e chuva lá fora',
    badge: 'Seoul Lo-Fi',
    icon: '☕',
  },
  {
    id: 'chuva_lofi',
    title: 'Chuva na Janela & Vinil',
    subtitle: 'Textura de fita analógica e gotas suaves para foco e leitura',
    badge: 'Chuva Suave',
    icon: '🌧️',
  },
  {
    id: 'noite_chuvosa',
    title: 'Fim de Tarde em Hongdae',
    subtitle: 'Acordes jazzy relaxantes em 70 BPM e atmosfera acolhedora',
    badge: 'Hongdae Dusk',
    icon: '🎧',
  },
];

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState<SoundScene>('cafe_seoul');
  const [masterVolume, setMasterVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Faders individuais
  const [pianoVol, setPianoVol] = useState(0.7);
  const [rainVol, setRainVol] = useState(0.5);
  const [vinylVol, setVinylVol] = useState(0.35);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const pianoGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const vinylGainRef = useRef<GainNode | null>(null);

  const stepTimerRef = useRef<number | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);

  // Inicialização segura do AudioContext
  const getAudioContext = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch (e) {
      console.warn('Web Audio indisponível:', e);
      return null;
    }
  };

  const stopAllSound = () => {
    if (stepTimerRef.current) {
      window.clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    activeNodesRef.current = [];
  };

  // Atualização em tempo real de volumes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const target = isMuted ? 0 : masterVolume;
      masterGainRef.current.gain.setTargetAtTime(target, audioCtxRef.current.currentTime, 0.05);
    }
  }, [masterVolume, isMuted]);

  useEffect(() => {
    if (pianoGainRef.current && audioCtxRef.current) {
      pianoGainRef.current.gain.setTargetAtTime(pianoVol, audioCtxRef.current.currentTime, 0.05);
    }
  }, [pianoVol]);

  useEffect(() => {
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setTargetAtTime(rainVol, audioCtxRef.current.currentTime, 0.05);
    }
  }, [rainVol]);

  useEffect(() => {
    if (vinylGainRef.current && audioCtxRef.current) {
      vinylGainRef.current.gain.setTargetAtTime(vinylVol, audioCtxRef.current.currentTime, 0.05);
    }
  }, [vinylVol]);

  // Monta e dispara a paisagem sonora Lo-Fi
  const startLoFiSession = (scene: SoundScene) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAllSound();

    // Nó Master
    const master = ctx.createGain();
    master.gain.setValueAtTime(isMuted ? 0 : masterVolume, ctx.currentTime);
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Nós de canais individuais
    const pianoGain = ctx.createGain();
    pianoGain.gain.setValueAtTime(pianoVol, ctx.currentTime);
    pianoGain.connect(master);
    pianoGainRef.current = pianoGain;

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(rainVol, ctx.currentTime);
    rainGain.connect(master);
    rainGainRef.current = rainGain;

    const vinylGain = ctx.createGain();
    vinylGain.gain.setValueAtTime(vinylVol, ctx.currentTime);
    vinylGain.connect(master);
    vinylGainRef.current = vinylGain;

    // 1. GERADOR DE CHUVA (Ruído Rosa Modelado)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }
    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(scene === 'chuva_lofi' ? 700 : 500, ctx.currentTime);

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainSource.start();
    activeNodesRef.current.push(rainSource, rainFilter);

    // 2. GERADOR DE VINIL & FITA CASSETE (Estalos orgânicos e hiss)
    const vinylBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const vData = vinylBuffer.getChannelData(0);
    for (let i = 0; i < vData.length; i++) {
      // 99.8% silêncio, 0.2% estalos suaves de vinil
      const isCrack = Math.random() > 0.9985;
      vData[i] = isCrack ? (Math.random() * 2 - 1) * 0.15 : (Math.random() * 2 - 1) * 0.004;
    }
    const vinylSource = ctx.createBufferSource();
    vinylSource.buffer = vinylBuffer;
    vinylSource.loop = true;

    const vinylFilter = ctx.createBiquadFilter();
    vinylFilter.type = 'bandpass';
    vinylFilter.frequency.setValueAtTime(1800, ctx.currentTime);
    vinylFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    vinylSource.connect(vinylFilter);
    vinylFilter.connect(vinylGain);
    vinylSource.start();
    activeNodesRef.current.push(vinylSource, vinylFilter);

    // 3. PIANO RHODES LO-FI GENERATIVO (Progressão de Acordes Jazzy em 70 BPM)
    // Acordes: Dm9, G13, Cmaj9, Am9 (frequências em Hz)
    const chords = [
      [146.83, 220.0, 261.63, 329.63, 392.0], // Dm9 (D3, A3, C4, E4, G4)
      [196.0, 246.94, 293.66, 329.63, 440.0], // G13 (G3, B3, D4, E4, A4)
      [130.81, 196.0, 246.94, 329.63, 392.0], // Cmaj9 (C3, G3, B3, E4, G4)
      [110.0, 164.81, 220.0, 261.63, 329.63], // Am9 (A2, E3, A3, C4, E4)
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const currentCtx = audioCtxRef.current;
      const activeChord = chords[chordIndex % chords.length];
      chordIndex++;

      activeChord.forEach((freq, noteIdx) => {
        // Pequeno atraso humano (strum arpejado) de 35ms por nota
        const noteTime = currentCtx.currentTime + noteIdx * 0.038;

        const osc = currentCtx.createOscillator();
        // Timbre quente estilo Rhodes (onda triangular filtrada)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        // Tremolo suave característico de teclado vintage
        const tremoloOsc = currentCtx.createOscillator();
        tremoloOsc.frequency.setValueAtTime(4.2, noteTime);
        const tremoloGain = currentCtx.createGain();
        tremoloGain.gain.setValueAtTime(0.2, noteTime);
        tremoloOsc.connect(tremoloGain);

        const noteGain = currentCtx.createGain();
        noteGain.gain.setValueAtTime(0.0001, noteTime);
        // Ataque suave, sustentação calorosa e decaimento lento (estilo fita)
        noteGain.gain.exponentialRampToValueAtTime(0.06 / (noteIdx + 1), noteTime + 0.12);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.8);

        const toneFilter = currentCtx.createBiquadFilter();
        toneFilter.type = 'lowpass';
        toneFilter.frequency.setValueAtTime(750, noteTime);

        osc.connect(toneFilter);
        toneFilter.connect(noteGain);
        noteGain.connect(pianoGain);

        osc.start(noteTime);
        osc.stop(noteTime + 4.0);

        tremoloOsc.start(noteTime);
        tremoloOsc.stop(noteTime + 4.0);
      });
    };

    // Toca o primeiro acorde imediatamente e programa o loop a cada ~3.8 segundos (tempo Lo-Fi relaxante)
    playNextChord();
    stepTimerRef.current = window.setInterval(playNextChord, 3800);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAllSound();
      setIsPlaying(false);
    } else {
      startLoFiSession(currentScene);
      setIsPlaying(true);
    }
  };

  const handleSceneChange = (newScene: SoundScene) => {
    setCurrentScene(newScene);
    if (isPlaying) {
      startLoFiSession(newScene);
    }
  };

  const activeSceneConfig = SCENES.find((s) => s.id === currentScene) || SCENES[0];

  return (
    <aside
      aria-label="Paisagem Sonora Lo-Fi de Cafeteria"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-80"
    >
      <div className="bg-white/95 backdrop-blur-md border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] rounded-2xl overflow-hidden transition-all duration-300">
        {/* Barra Superior do Player */}
        <div className="p-3.5 flex items-center justify-between gap-3 bg-[var(--k-acid)]/30 border-b border-[var(--ink)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={handleTogglePlay}
              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] transition-transform active:scale-95 shrink-0 ${
                isPlaying
                  ? 'bg-[var(--k-pink)] text-white animate-pulse'
                  : 'bg-white text-[var(--ink)] hover:bg-[var(--k-acid)]'
              }`}
              title={isPlaying ? 'Pausar Lo-Fi' : 'Tocar Café em Seul (Lo-Fi)'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="mono-font text-[9px] uppercase font-bold px-1.5 py-0.2 bg-[var(--ink)] text-white rounded">
                  {activeSceneConfig.badge}
                </span>
                {isPlaying && (
                  <span className="inline-flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-[var(--k-pink)] h-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 bg-[var(--k-pink)] h-2 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 bg-[var(--k-pink)] h-3.5 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold text-[var(--ink)] truncate mt-0.5">
                {activeSceneConfig.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[var(--ink)] transition-colors"
              title={isMuted ? 'Desmutar' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[var(--ink)] transition-colors"
              title={isExpanded ? 'Recolher mix' : 'Ajustar instrumentos'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Painel Expandido com Mix de Instrumentos e Cenas */}
        {isExpanded && (
          <div className="p-4 space-y-4 bg-white animate-fadeIn">
            {/* Seletor de Cenas */}
            <div>
              <label className="block mono-font text-[10px] uppercase font-bold text-neutral-500 mb-2">
                Ambiente Sonoro
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => handleSceneChange(scene.id)}
                    className={`py-2 px-2 rounded-xl text-left border border-[var(--ink)] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                      currentScene === scene.id
                        ? 'bg-[var(--k-lilac)]/20 border-2 font-bold shadow-[2px_2px_0_var(--ink)]'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <span className="text-lg">{scene.icon}</span>
                    <span className="text-[10px] text-center leading-tight line-clamp-2">
                      {scene.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Faders de Mix */}
            <div className="space-y-3 pt-2 border-t border-dashed border-neutral-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" /> Piano Lo-Fi
                </span>
                <span className="mono-font text-[10px] text-neutral-500">{Math.round(pianoVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={pianoVol}
                onChange={(e) => setPianoVol(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--k-pink)]"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-sky-600" /> Chuva Suave
                </span>
                <span className="mono-font text-[10px] text-neutral-500">{Math.round(rainVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={rainVol}
                onChange={(e) => setRainVol(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-purple-600" /> Vinil & Fita
                </span>
                <span className="mono-font text-[10px] text-neutral-500">{Math.round(vinylVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={vinylVol}
                onChange={(e) => setVinylVol(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Volume Geral */}
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
              <span className="mono-font text-[10px] uppercase font-bold text-neutral-500 shrink-0">
                Volume Master
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--ink)]"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
