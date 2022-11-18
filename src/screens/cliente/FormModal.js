import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { ClienteContext } from "../../contexts";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "../../hooks/useLocation";
import { LoadingScreen } from "../LoadingScreen";
import { FormCliente } from "./components/FormCliente";
export const FormModal = ({ navigation, route }) => {
  const {
    prId = 0,
    prIdsub = 0,
    prNombre = "",
    prDireccion = "",
    prCodigo = "",
    prUbicacion = "",
    prZona = "",
    prRuta = "",
    prTelefono = "",
    prVendedor = 0,
    prNitfa = "",
    prCelular = "",
    prSuc = "",
    prLat = 0,
    prLon = 0,
    prTiponego = "",
    prObs = "",
    prLatiDelta = 0,
    prLonDelta = 0,
  } = route.params.cliente;

  const { creataCliente, isLoading, isSucces, close } = useContext(ClienteContext);
  const { codigo } = useAuth();

  const {
    hasLocation,
    initialPosition,
  } = useLocation();


  const onSave = (value) => {
    const boby = {
      ...value,
      prVendedor: codigo,
    };
    creataCliente(boby);
  };


  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title={prId === 0 ? "Nuevo Cliente" : "Editar Cliente"} />
      </Appbar.Header>
      <View style={styles.container}>
        <FormCliente
          cliente={{
            prId,
            prIdsub,
            prNombre,
            prDireccion,
            prCodigo,
            prUbicacion,
            prZona,
            prRuta,
            prTelefono,
            prVendedor,
            prNitfa,
            prCelular,
            prSuc,
            prLat,
            prLon,
            prTiponego,
            prObs,
            prLatiDelta,
            prLonDelta,
          }}
          navigation={navigation}
          submit={onSave}
          initialPosition={initialPosition}
          isLoading={isLoading}
          isSucces={isSucces}
          close={close}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginVertical: 3,
  },
});
