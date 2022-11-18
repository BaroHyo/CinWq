import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Card, Divider, Text, Button } from "react-native-paper";
import { formatDate } from "../../utils/commo";
import { DistribucionContext } from "../../contexts/DistribucionContext";

export const DetalleScreen = ({ navigation, route }) => {

  const { peId, peCliente, peFechaVe, peEstado, peTotfac, peObs, detaPedido, peLat, peLon } = route.params.pedido;
  const { cambiarEstado, isLoading } = useContext(DistribucionContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="DETALLE" />
      </Appbar.Header>
      <View style={{
        flex: 1,
        marginHorizontal: 5,
        marginTop: 5,
        flexDirection: "column",
      }}>
        <View style={{ flex: 3 }}>
          <View style={{ marginVertical: 5 }}>
            <Text variant="titleMedium">PEDIDO</Text>
          </View>
          <Card>
            <Card.Content>
              <Text variant="labelMedium">NRO. PEDIDO: {peId}</Text>
              <Text variant="titleSmall">CLIENTE: {peCliente.toUpperCase()}</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <Text variant="labelMedium">FECHA: {formatDate(peFechaVe).toString()}</Text>
                <Text variant="labelMedium"
                      style={{
                        color: peEstado === "A" ? "red" : "green",
                      }}>
                  {peEstado === "A" ? "Pendiente" : "Entregado"}
                </Text>
              </View>
              <Text variant="labelMedium">OBS.: {peObs}</Text>
              <Divider bold style={{ marginVertical: 2 }} />
              <Text variant="titleSmall">BS. {peTotfac}</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{ flex: 5 }}>
          <View style={{ marginVertical: 5 }}>
            <Text variant="titleMedium">DETALLE</Text>
          </View>
          <Card>
            <Card.Content>
              <View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}>
                  <Text variant="titleSmall">Pa</Text>
                  <Text variant="titleSmall">Un</Text>
                  <Text variant="titleSmall">Ca</Text>
                  <Text variant="titleSmall">B/U</Text>
                  <Text variant="titleSmall">B/P</Text>
                  <Text variant="titleSmall">P/U</Text>
                  <Text variant="titleSmall">P/T</Text>
                </View>
              </View>
              <Divider bold />
              <FlatList
                data={detaPedido}
                renderItem={({ item }) => (
                  <View>
                    <View style={{ marginVertical: 4 }}>
                      <Text variant="bodyMedium">{item.deNombre}</Text>
                    </View>

                    <View style={{ marginVertical: 4 }}>
                      <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <Text variant="bodySmall">{item.deCantiPa.toString()}</Text>
                        <Text variant="bodySmall">{item.deCantiun.toString()}</Text>
                        <Text variant="bodySmall">{item.deCantica.toString()}</Text>
                        <Text variant="bodySmall">{item.deCantpaqbo.toString()}</Text>
                        <Text variant="bodySmall">{item.deCantunibo.toString()}</Text>
                        <Text variant="bodySmall">{item.dePrecioU.toString()}</Text>
                        <Text variant="bodySmall">{item.dePrecioT.toString()}</Text>
                      </View>
                    </View>
                    <Divider bold />
                  </View>
                )}
              />
            </Card.Content>
          </Card>

        </View>
        <View style={{ flex: 3 }}>
          <Button style={{ marginVertical: 5 }}
                  mode="contained"
                  onPress={() => cambiarEstado(peId)}
                  loading={isLoading}>
            ENTREGAR
          </Button>
          <Button style={{ marginVertical: 5 }} mode="contained"
                  onPress={() => navigation.navigate("MapDistribucionScreen", {
                    pedido: {
                      peId,
                      peCliente,
                      peLat,
                      peLon,
                      peEstado,
                    },
                  })}>
            VER MAPA
          </Button>
        </View>
      </View>
    </View>
  );
};


