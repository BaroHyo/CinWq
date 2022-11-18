import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Chip,
  Paragraph,
  Title,
  useTheme,
  Text,
  Divider,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import CinApi from "../../apis/CinApi";
import { PedidoContext } from "../../contexts";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/commo";
import { Contador } from "../../components";


export const PedidoResumen = ({ navigation, route }) => {


  const [correl, setCorrel] = useState("");
  const { cliente } = route.params;
  const { user, codigo } = useAuth();

  const { detalle, createPedido, setDetalle, setCantidad, fecha, loadPedido } = useContext(PedidoContext);


  useEffect(() => {
    const corre = async () => {
      const { data } = await CinApi.get(`/Vendedor/ObtenerVendedor/${codigo}`);
      console.log(data.response.veCorrel);
      setCorrel(data.response.veCorrel);
    };
    corre()
      // make sure to catch any error
      .catch(console.error);
  }, []);


  const onSubmit = () => {

    const { veCorrel, veId } = user;

    const { prNombre, prIdsub, prLat, prLon, prNitfa } = cliente;


    const bobyDetalle = detalle.map((detalle, i) => {
      return {
        ...detalle,
        deItemNro: i + 1,
        deId: 0,
        deIdpe: correl,
      };
    });


    const body = {
      peId: correl,
      peIdsub: prIdsub,
      peCliente: prNombre,
      peNit: "0",// prNitfa,
      peTipo: "E",
      peFechaVe: fecha,
      peUserVe: veId,
      peTotfac: 0,
      peTpago: "E",
      peSuc: "0",
      peEstado: "P",
      peDetalle: "Prueba",
      peLat: prLat,
      peLon: prLon,
    };

    createPedido(body, bobyDetalle);
    setCantidad(0);
    setDetalle([]);

    loadPedido(veId, formatDate(fecha));

    navigation.popToTop();

  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mi Pedido" />
      </Appbar.Header>
      <ScrollView style={{
        flex: 1,
        marginHorizontal: 15,
      }}>
        <View style={{ marginVertical: 2 }}>
          <Text variant="titleSmall">Datos generales:</Text>
        </View>
        <Card>
          <Card.Content>
            <Text variant="labelSmall">#44554</Text>
            <Text variant="titleSmall">Cliente</Text>
            <Text variant="labelSmall">Direccion</Text>
            <Text variant="labelSmall">Nit</Text>
           </Card.Content>
        </Card>
        <View style={{ marginVertical: 2 }}>
          <Text variant="titleSmall">Estas llevando:</Text>
        </View>
        <View style={{ marginVertical: 1 }}>
          {
            detalle.map((item, i) => (
              <Card elevation={5}
                    style={{ marginVertical: 1 }}
                    mode="elevated"
                    key={i}>
                <Card.Content>
                  <View style={{ flexDirection: "column" }}>
                    <Text variant="bodySmall">{item.deNombre}</Text>
                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <Text variant="labelSmall">PQTE</Text>
                        <Contador value={0}
                                  increment={() => console.log(1)}
                                  decrement={() => console.log(2)} />
                      </View>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <Text variant="labelSmall">UNI</Text>
                        <Contador value={0}
                                  increment={() => console.log(1)}
                                  decrement={() => console.log(2)} />
                      </View>
                    </View>

                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <Text variant="labelSmall">CAMB</Text>
                        <Contador value={0}
                                  increment={() => console.log(1)}
                                  decrement={() => console.log(2)} />
                      </View>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <Text variant="labelSmall">BP</Text>
                        <Contador value={0}
                                  increment={() => console.log(1)}
                                  decrement={() => console.log(2)} />
                      </View>
                    </View>

                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <Text variant="labelSmall">BU</Text>
                        <Contador value={0}
                                  increment={() => console.log(1)}
                                  decrement={() => console.log(2)} />
                      </View>
                      <View style={{
                        flex: 1,
                        marginHorizontal: 8,
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                       <View style={{
                         alignItems: "center",
                         justifyContent: "center",
                         width: 200,
                         height: 25,
                       }}>
                         <IconButton
                           icon="delete"
                           size={30}
                           onPress={() => console.log(2)}
                         />
                       </View>
                      </View>
                    </View>

                  </View>
                </Card.Content>
              </Card>
            ))
          }
        </View>
        <View style={{ marginVertical: 1 }}>
          <Card>
            <Card.Content>
              <Text variant="titleSmall">Catital</Text>
              <Text variant="titleSmall">Catital</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{ marginVertical: 10, marginHorizontal: 8 }}>

          <Button mode="contained" onPress={() => console.log("Pressed")}>
            Press me
          </Button>
        </View>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  viewFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "75%",
  },
  textInput: {
    marginVertical: 1,
  },
  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
});
