import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoot from './routes';
import { AuthProvider } from './contexts';

const AppState = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <MainRoot />
      </AppState>
    </NavigationContainer>
  );
}