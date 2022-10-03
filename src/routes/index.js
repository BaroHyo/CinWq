import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackHome from './StackHome';
import { DrawerContent } from '../components';
import { AuthContext } from '../contexts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const MainRoot = () => {

  const { status } = useContext(AuthContext);

  // if (status !== "authenticated") {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen
  //         name="Login"
  //         component={LoginScreen} />
  //     </Stack.Navigator>
  //   )
  // } else {
  //   return (
  //     <Drawer.Navigator screenOptions={{ headerShown: false }}
  //       drawerContent={props => <DrawerContent {...props} />}>
  //       <Drawer.Screen name="StackHome" component={StackHome} />
  //     </Drawer.Navigator>
  //   )
  // }

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="StackHome" component={StackHome} />
    </Drawer.Navigator>
  )

}

export default MainRoot
