import { useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts';


export const useAuth = () => {
    
    const context = useContext(AuthContext);

    if (!context) Alert.alert('Mensaje', 'Auth context must be use inside AuthProvider');

    return context;
};

