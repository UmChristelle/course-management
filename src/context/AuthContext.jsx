import { createContext, useEffect, useMemo, useState } from 'react';
import { loginRequest } from '../lib/api';
import {
  clearStoredSession,
  getStoredSession,
  storeSession,
} from '../lib/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession());
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (session) {
      storeSession(session);
      return;
    }

    clearStoredSession();
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      authLoading,
      async signIn(credentials) {
        setAuthLoading(true);

        try {
          const nextSession = await loginRequest(credentials);
          setSession(nextSession);
          return nextSession;
        } finally {
          setAuthLoading(false);
        }
      },
      signOut() {
        setSession(null);
      },
    }),
    [authLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
