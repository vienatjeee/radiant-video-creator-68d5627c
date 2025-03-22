
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage when the component mounts
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This is a mock implementation. In a real app, you would validate credentials with a backend
      if (email && password) {
        // Mock user data
        let mockUser: User;
        
        // Check if it's the admin account (hardcoded for demonstration)
        if (email === 'vienna@example.com' && password === 'admin') {
          mockUser = {
            id: '1',
            email: 'vienna@example.com',
            name: 'Vienna Wierks',
            role: 'admin'
          };
        } else {
          // Regular user
          mockUser = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            role: 'user'
          };
        }
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Signed in successfully');
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error('Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Mock signup - in a real app, you'd create a new user in your backend
      if (email && password && name) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user',
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        toast.success('Account created successfully');
        return;
      }
      throw new Error('Please fill all required fields');
    } catch (error) {
      toast.error('Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Signed out');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
