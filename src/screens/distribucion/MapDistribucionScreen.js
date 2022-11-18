import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { MapaComponent } from "../../components/MapaComponent";
import { Marker } from "react-native-maps";


export const MapDistribucionScreen = ({ navigation, route }) => {

  const {
    peId,
    peCliente,
    peLat,
    peLon,
    peEstado,
  } = route.params.pedido;


  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={`#${peId}`} />

      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <MapaComponent>
            <View style={{ flex: 1 }}>
            <Marker
              coordinate={{
                latitude: peLat,
                longitude: peLon,
              }}
              title={peCliente}
              pinColor={peEstado === "A" ? "#D51F0A" : "#40BC02"}
             />
          </View>
        </MapaComponent>

      </View>

    </View>
  );
};
