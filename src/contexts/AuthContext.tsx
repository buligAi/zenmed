import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  role: 'doctor' | 'patient' | 'pharmacy' | 'drugCompany' | 'admin';
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          
          // Validate token with backend
          try {
            await api.get('/auth/validate');
            if (mounted) {
              setUser(parsedUser);
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            if (mounted) {
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setInitialized(true);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Demo login for development
      const demoUser: User = {
        id: '1',
        name: 'Dr. John Doe',
        role: 'doctor',
        email
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const value = {
    user,
    loading,
    error,
    initialized,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}