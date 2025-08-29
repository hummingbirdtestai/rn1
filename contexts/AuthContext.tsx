// src/contexts/AuthContext.tsx
<<<<<<< HEAD
import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ Create a wrapper so both web + native storage behave the same (async)
let storage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

try {
  if (typeof window !== "undefined" && window.localStorage) {
    // Web: wrap localStorage in Promise to look like AsyncStorage
    storage = {
      getItem: async (key) => window.localStorage.getItem(key),
      setItem: async (key, value) => window.localStorage.setItem(key, value),
      removeItem: async (key) => window.localStorage.removeItem(key),
    };
  } else {
    // React Native: use AsyncStorage
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    storage = AsyncStorage;
  }
} catch {
  // Fallback: no storage
  storage = {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
  };
}

interface Session {
  token: string;
  profile?: any;
}

interface AuthContextType {
  session: Session | null;
  user: any;
  loading: boolean;
  login: (token: string, profile?: any) => Promise<void>;
=======
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  session: any;
  user: any;
  loading: boolean;
>>>>>>> ed10f2b (Add files via upload)
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Normalize helper
  const normalizeProfile = (profile: any) => {
    if (!profile) return null;
    return {
      id: profile.id || profile.user_id || null, // always guarantee id
      email: profile.email ?? null,
      name: profile.name ?? profile.full_name ?? null,
      ...profile, // keep other properties
    };
  };

  // 🔹 Load session from storage on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await storage.getItem("auth_token");
        const profileStr = await storage.getItem("auth_profile");

        if (token) {
          const parsedProfile = profileStr ? JSON.parse(profileStr) : null;
          setSession({ token, profile: normalizeProfile(parsedProfile) });
        }
      } catch (err) {
        console.error("❌ Error loading session:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  // 🔹 Save login state
  const login = async (token: string, profile?: any) => {
    try {
      const normalizedProfile = normalizeProfile(profile);

      await storage.setItem("auth_token", token);
      await storage.setItem("auth_profile", JSON.stringify(normalizedProfile));

      setSession({ token, profile: normalizedProfile });
    } catch (err) {
      console.error("❌ Error saving session:", err);
    }
  };

  // 🔹 Clear session on logout
  const logout = async () => {
    try {
      await storage.removeItem("auth_token");
      await storage.removeItem("auth_profile");
      setSession(null);
    } catch (err) {
      console.error("❌ Error clearing session:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.profile ?? null, // ✅ now guaranteed to have id
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
=======
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current session
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) setSession(data.session);
      setLoading(false);
    };
    init();

    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null, // supabase.auth user object
      loading,
      logout,
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
>>>>>>> ed10f2b (Add files via upload)
}
