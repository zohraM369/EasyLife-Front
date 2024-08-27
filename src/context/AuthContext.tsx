import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import authService from '../services/authServices';
import User from '../interfaces/UserInterface';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
 user: User | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  sendVerificationCode: (email: string) => Promise<string>;
  verifyCode: (email: string, code: string) => boolean;
  logout: () => void;
  updateEmail: (userId: string, newEmail: string, password: string) => Promise<void>;
  updatePassword: (userId: string, oldPassword: string, newPassword: string) => Promise<void>;
  updateName: (userId: string, newName: string, password: string) => Promise<void>;
  updateImage: (userId: string, profileImage: Blob) => Promise<void>;
}



const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {  
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      try {
        const serializedUser = JSON.stringify(user);
        console.log('Saving user to localStorage:', serializedUser);
        //mettre le user dans le localstorage 
        localStorage.setItem('user', serializedUser);
      } catch (e) {
        console.error('Error saving user to localStorage', e);
      }
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (userData: { email: string; password: string }) => {
    const response = await authService.login(userData);
    
    return response;
  };

  const logout = async () => {
    const result = authService.logout();
    setUser(null);
    toast.warn(result.msg);
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);
  };

  const updateEmail = async (userId: string, newEmail: string, password: string) => {
    await authService.updateEmail(userId, newEmail, password);
  };

  const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    await authService.updatePassword(userId, oldPassword, newPassword);
  };

  const updateName = async (userId: string, newName: string, password: string) => {
    await authService.updateName(userId, newName, password);
  };

  const updateImage = async (userId: string, profileImage: Blob) => {
    try {
      const updatedUser = await authService.updateImage(userId, profileImage);
      setUser(updatedUser); // Update user in state
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
      toast.success('Profile image updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile image.');
    }
  };

  const sendVerificationCode = async (email: string) => {
    console.log(email)
    let result = await authService.sendEmail(email) // lazem traja3li lcode 
    console.log(result)
    return result 
  };

  const verifyCode = (email: string, code: string) => {
    const result= authService.verifyCode({email:email,code:code}).then(result=>{
     if (result.data.user) {
      setUser(result.data.user);
     // localStorage.setItem('token',result?.data.token)
      if(result?.data.user.role == "user") {
        navigate('/dashboard')
      }else {
      navigate('/admin_dashboard')

      }
    }
    })
    
    return result
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout,sendVerificationCode, verifyCode,updateEmail, updatePassword, updateName, updateImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
