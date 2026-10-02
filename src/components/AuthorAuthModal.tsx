import React, { useState } from 'react';
import { Lock, KeyRound, Check, X, ShieldAlert, Sparkles, LogOut } from 'lucide-react';

interface AuthorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  onUpdatePin: (newPin: string) => boolean;
  defaultPinHint: string;
}

export const AuthorAuthModal: React.FC<AuthorAuthModalProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onLogin,
  onLogout,
  onUpdatePin,
  defaultPinHint,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const ok = onLogin(pinInput);
    if (ok) {
      setErrorMsg('');
      setPinInput('');
      onClose();
    } else {
      setErrorMsg('PIN incorreto. Tente novamente.');
    }
  };

  const handlePinChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      setErrorMsg('O novo PIN deve ter pelo menos 4 dígitos.');
      return;
    }
    const ok = onUpdatePin(newPinInput);
    if (ok) {
      setPinSuccessMsg('Novo PIN salvo com sucesso!');
      setNewPinInput('');
      setIsChangingPin(false);
      setTimeout(() => setPinSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-[var(--ink)] shadow-[8px_8px_0_var(--ink)] rounded-2xl w-full max-w-md overflow-hidden animate-scaleUp">
        {/* Top Header */}
        <div className="bg-[var(--k-acid)] px-5 py-4 border-b-2 border-[var(--ink)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[var(--ink)]" />
            <h3 className="display-font font-bold text-lg text-[var(--ink)]">
              Espaço da Autora (Lary)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-black/10 transition-colors text-[var(--ink)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isAuthenticated ? (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Modo Autora Ativo</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Você pode redigir novos ensaios, editar posts existentes, carregar fotos e salvar
                    rascunhos privados que leitores comuns não veem.
                  </p>
                </div>
              </div>

              {pinSuccessMsg && (
                <div className="p-3 bg-purple-50 text-[var(--ink)] border border-[var(--k-lilac)] rounded-lg text-xs font-semibold">
                  {pinSuccessMsg}
                </div>
              )}

              {isChangingPin ? (
                <form onSubmit={handlePinChangeSubmit} className="space-y-3">
                  <label className="block text-xs font-bold mono-font uppercase text-neutral-600">
                    Definir Novo PIN (mínimo 4 dígitos)
                  </label>
                  <input
                    type="password"
                    maxLength={10}
                    placeholder="Ex: 2026"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[var(--ink)] rounded-lg text-center tracking-widest text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--k-pink)]"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 px-3 bg-[var(--k-pink)] text-white font-bold text-xs rounded-lg border-2 border-[var(--ink)] hover:bg-[var(--k-lilac)] transition-colors"
                    >
                      Salvar Novo PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="py-2 px-3 bg-neutral-200 text-neutral-700 font-bold text-xs rounded-lg hover:bg-neutral-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setIsChangingPin(true)}
                    className="w-full py-2.5 px-4 bg-white border-2 border-[var(--ink)] rounded-xl font-bold text-xs text-[var(--ink)] hover:bg-neutral-50 flex items-center justify-center gap-2 shadow-[2px_2px_0_var(--ink)]"
                  >
                    <KeyRound className="w-4 h-4 text-[var(--k-pink)]" /> Alterar meu PIN de acesso
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-red-50 border-2 border-red-500 rounded-xl font-bold text-xs text-red-700 hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sair do Modo Autora (Voltar como Leitor)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--k-lilac)]/20 border-2 border-[var(--ink)] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0_var(--ink)]">
                  <KeyRound className="w-6 h-6 text-[var(--k-lilac)]" />
                </div>
                <h4 className="font-bold text-[var(--ink)] text-base">Identificação da Autora</h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto">
                  Digite seu PIN pessoal para liberar a escrita de posts, edição e rascunhos
                  privados.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1">
                <input
                  type="password"
                  maxLength={10}
                  placeholder="PIN da Autora"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl text-center tracking-[0.3em] text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-[var(--k-pink)] bg-neutral-50"
                  autoFocus
                />
                <p className="text-[10px] text-neutral-500 text-center mono-font pt-1">
                  (PIN inicial padrão sugerido: <span className="font-bold text-[var(--ink)]">{defaultPinHint}</span>)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[var(--k-pink)] text-white font-bold text-sm rounded-xl border-2 border-[var(--ink)] hover:bg-[var(--k-lilac)] transition-all shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Desbloquear Painel de Escrita</span>
                <Sparkles className="w-4 h-4 text-[var(--k-acid)]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
