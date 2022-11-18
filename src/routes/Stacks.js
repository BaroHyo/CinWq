import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ClienteScreen,
  HomeScreen,
  PedidoScreen,
  ProductoScreen,
  ProductoSearch,
  PedidoCliente,
  PedidoProducto,
  PedidoForm,
  PedidoResumen,
  PermisoScreen,
  MapaScreen,
  FormModal,
  BuscarScreen,
} from "../screens";
import { PermissionsContext } from "../contexts";
import {
  DetalleScreen,
  DistribucionMapScreen,
  DistribucionScreen,
  MapDistribucionScreen,
} from "../screens/distribucion";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { ClienteBuscarScreen } from "../screens/pedido";

const Stack = createNativeStackNavigator();

const StackProducto = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ProductoScreen"
        component={ProductoScreen} />
      <Stack.Screen
        name="Buscar"
        component={ProductoSearch} />
    </Stack.Navigator>
  );
};

const StackDistribucion = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DistribucionHome"
        component={DistribucionScreen} />
      <Stack.Screen
        name="DistribucionDetalle"
        component={DetalleScreen} />
      <Stack.Screen
        name="MapDistribucionScreen"
        component={MapDistribucionScreen} />
    </Stack.Navigator>
  );
};

const StackCliente = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name="ClienteScreen"
          component={ClienteScreen} />
        <Stack.Screen
          name="BuscarCliente"
          component={BuscarScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack.Screen
          name="FormModal"
          component={FormModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const StackPedido = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PedidoScreen"
        component={PedidoScreen} />
      <Stack.Screen
        name="PedidoCliente"
        component={PedidoCliente} />
      <Stack.Screen
        name="PedidoProducto"
        component={PedidoProducto} />
      <Stack.Screen
        name="PedidoForm"
        component={PedidoForm} />
      <Stack.Screen
        name="PedidoResumen"
        component={PedidoResumen} />
      <Stack.Screen
        name="BuscarClientePedido"
        component={ClienteBuscarScreen} />
    </Stack.Navigator>
  );
};


const Tab = createBottomTabNavigator();


const TabDestribucion = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Distribución"
                  component={StackDistribucion}
                  options={{
                    tabBarIcon: ({ color }) => (
                      <AwesomeIcon name="truck" color={color} size={26} />
                    ),
                  }}
      />
      <Tab.Screen name="Gps"
                  component={DistribucionMapScreen}
                  options={{
                    tabBarIcon: ({ color }) => (
                      <AwesomeIcon name="map" color={color} size={26} />
                    ),
                  }} />
    </Tab.Navigator>
  );
};


const Stacks = () => {

  const { permission } = useContext(PermissionsContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      {
        (permission.locationStatus === "granted") ?
          (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Producto" component={StackProducto} />
              <Stack.Screen name="Cliente" component={StackCliente} />
              <Stack.Screen name="Pedido" component={StackPedido} />
              <Stack.Screen name="Mapa" component={MapaScreen} />
              <Stack.Screen name="TabDestribucion" component={TabDestribucion} />
            </>
          ) :
          (
            <Stack.Screen name="PermisoScreen"
                          component={PermisoScreen}
            />
          )
      }


    </Stack.Navigator>
  );
};

export default Stacks;
