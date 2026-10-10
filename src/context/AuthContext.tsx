import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language, UserRole } from '../types';
import { store } from '../services/store';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    fullName: string;
    email: string;
    mobile: string;
    preferredLanguage: Language;
    interests: string[];
    password?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  quickLoginAsMember: () => void;
  quickLoginAsAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sattva_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // Sync with store if user details change
    const unsubscribe = store.subscribe(() => {
      if (currentUser) {
        const freshUser = store.getUserById(currentUser.uid);
        if (freshUser) {
          setCurrentUser(freshUser);
          localStorage.setItem('sattva_auth_user', JSON.stringify(freshUser));
        }
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = store.getUsers().find(u => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      // If logging in with the prompt's authorized admin email
      if (normalizedEmail === 'tanmoydari4@gmail.com' || normalizedEmail === 'admin@sattvaliving.com') {
        const adminUser: User = {
          uid: 'user-admin-auto',
          fullName: 'Tanmoy Dari (Wellness Administrator)',
          email: normalizedEmail,
          mobile: '+91 98300 12345',
          preferredLanguage: 'en',
          interests: ['lifestyle', 'nutrition', 'mindfulness'],
          role: 'admin',
          membershipStatus: 'active',
          wellnessGoals: 'Guiding community members towards sustainable living.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        store.saveUser(adminUser);
        setCurrentUser(adminUser);
        localStorage.setItem('sattva_auth_user', JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, error: 'No member found with this email. Please check your credentials or register.' };
    }

    if (user.membershipStatus === 'inactive') {
      return { success: false, error: 'Your membership account is currently inactive. Please contact support.' };
    }

    setCurrentUser(user);
    localStorage.setItem('sattva_auth_user', JSON.stringify(user));
    return { success: true };
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    mobile: string;
    preferredLanguage: Language;
    interests: string[];
    password?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = userData.email.trim().toLowerCase();
    const existing = store.getUsers().find(u => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const isSystemAdmin = normalizedEmail === 'tanmoydari4@gmail.com' || normalizedEmail === 'admin@sattvaliving.com';
    const role: UserRole = isSystemAdmin ? 'admin' : 'member';

    const newUser: User = {
      uid: `user-${Date.now()}`,
      fullName: userData.fullName.trim(),
      email: normalizedEmail,
      mobile: userData.mobile.trim(),
      preferredLanguage: userData.preferredLanguage,
      interests: userData.interests,
      role,
      membershipStatus: 'active',
      wellnessGoals: 'Build consistent daily walking and peaceful morning routines.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.saveUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('sattva_auth_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sattva_auth_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    store.saveUser(updated);
    setCurrentUser(updated);
    localStorage.setItem('sattva_auth_user', JSON.stringify(updated));
  };

  const quickLoginAsMember = () => {
    const member = store.getUserById('user-member-1') || store.getUsers().find(u => u.role === 'member');
    if (member) {
      setCurrentUser(member);
      localStorage.setItem('sattva_auth_user', JSON.stringify(member));
    }
  };

  const quickLoginAsAdmin = () => {
    const admin = store.getUserById('user-admin-1') || store.getUsers().find(u => u.role === 'admin');
    if (admin) {
      setCurrentUser(admin);
      localStorage.setItem('sattva_auth_user', JSON.stringify(admin));
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        quickLoginAsMember,
        quickLoginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
