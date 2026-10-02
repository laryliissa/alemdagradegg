import { useState, useEffect } from 'react';

const PIN_KEY = 'alem_da_grade_author_pin';
const AUTH_STATE_KEY = 'alem_da_grade_author_authenticated';
const DEFAULT_PIN = '2026';

export function useAuthorAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STATE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentPin, setCurrentPin] = useState<string>(() => {
    try {
      return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated) {
        sessionStorage.setItem(AUTH_STATE_KEY, 'true');
      } else {
        sessionStorage.removeItem(AUTH_STATE_KEY);
      }
    } catch (e) {
      console.error('Erro ao persistir sessão da autora:', e);
    }
  }, [isAuthenticated]);

  const login = (pinInput: string): boolean => {
    if (pinInput.trim() === currentPin.trim()) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STATE_KEY);
    } catch {
      // ignore
    }
  };

  const updatePin = (newPin: string): boolean => {
    if (newPin.trim().length >= 4) {
      const trimmed = newPin.trim();
      setCurrentPin(trimmed);
      try {
        localStorage.setItem(PIN_KEY, trimmed);
      } catch (e) {
        console.error('Erro ao salvar novo PIN:', e);
      }
      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    login,
    logout,
    updatePin,
    defaultPinHint: DEFAULT_PIN,
  };
}
