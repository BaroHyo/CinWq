import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Stacks from './Stacks';
import { DrawerContent } from '../components';
import { AuthContext } from '../contexts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen, LoginScreen } from '../screens';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const MainRoot = () => {

  const { status } = useContext(AuthContext);

 if ( status === 'checking' ) return <LoadingScreen />

  return (
    <>
      {
        (status !== "authenticated")
          ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={LoginScreen} />
            </Stack.Navigator>
          ) :
          (<Drawer.Navigator screenOptions={{ headerShown: false }}
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="StackHome" component={Stacks} />
          </Drawer.Navigator>)
      }
    </>
  )
 
}

export default MainRoot
