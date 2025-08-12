// auth/AuthProvider.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  login: async () => { },
  logout: async () => { },
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const clearSessionOnStartup = async () => {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      router.replace('/'); // Redirige al login
      setLoading(false);
    };

    clearSessionOnStartup();
  }, [router]);

  // Cargar estado al iniciar
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (savedIsLoggedIn === 'true') {
          setIsLoggedIn(true);
          router.replace("/(tabs)/explore");
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, [router]);

  // ...existing code...
  const login = async () => {
    try {
      console.log('first')
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      router.replace("/(tabs)/explore");

    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  // ...existing code...

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);