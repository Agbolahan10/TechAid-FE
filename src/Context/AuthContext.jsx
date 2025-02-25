import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login logic
    const users = [
      { email: 'it@example.com', password: 'password', role: 'it' },
      {
        email: 'staff@example.com',
        password: 'password',
        role: 'staff',
        profile: { name: 'John Doe', image: 'https://via.placeholder.com/40' },
      },
      { email: 'admin@example.com', password: 'password', role: 'admin' },
    ];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return foundUser.role; // Return the user's role
    }
    return null;
  };

  const register = (name, email, password, role) => {
    // Mock registration logic
    setUser({ 
      email, 
      role,
      profile: { name, image: 'https://via.placeholder.com/40' } 
      });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};