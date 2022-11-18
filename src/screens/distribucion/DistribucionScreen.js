import React, { useContext, useEffect, useState } from "react";
import {  StyleSheet, View } from "react-native";
import { Appbar, Card,  Divider, Text,  useTheme } from "react-native-paper";
import { formatDate } from "../../utils/commo";
import DatePicker from "react-native-date-picker";
import { LoadingScreen } from "../LoadingScreen";
import { useAuth } from "../../hooks/useAuth";
import { DistribucionContext } from "../../contexts/DistribucionContext";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const DistribucionScreen = ({ navigation }) => {

  const { destribucion, loadDistribucion, isLoading, fecha, onFecha, setIsLoading } = useContext(DistribucionContext);

  const { colors } = useTheme();
  const { codigo } = useAuth();

  const [open, setOpen] = useState(false);


  useEffect(() => {
    loadDistribucion(codigo, formatDate(fecha));
  }, [fecha]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="DISTRIBUCION" />
        <Appbar.Action
          icon="calendar"
          color={colors.primary}
          onPress={() => setOpen(true)}
        />
      </Appbar.Header>
      <Text variant="titleSmall" style={{marginVertical: 5, marginLeft: 15}}>{formatDate(fecha).toString()}</Text>
      <View style={styles.container}>
        <FlashList
          data={destribucion}
          keyExtractor={(p) => p.peId}
          renderItem={({ item }) => (
            <Card elevation={2}
                  mode="elevated"
                  onPress={() => navigation.navigate("DistribucionDetalle", {
                    pedido: item,
                  })}
                  style={{
                    marginVertical: 1,
                  }}>
              <Card.Content>
                <View style={{
                  flex: 1,
                  flexDirection: "column",
                }}>
                  <Text variant="labelSmall">#{item.peId}</Text>
                  <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Text variant="titleSmall">{item.peCliente.toUpperCase()}</Text>
                    <Text variant="titleSmall">Bs.{item.peTotfac}</Text>
                  </View>
                  <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    {
                      (item.peLat === 0 && item.peLon === 0)
                        ?
                        (<View />) :
                        (
                          <MaterialCommunityIcons
                            name={"map-marker-radius"}
                            color={colors.primary}
                            size={15} />
                        )
                    }
                    <Text variant="labelMedium"
                          style={{
                            color: item.peEstado === "A" ? "red" : "green",
                          }}>
                      {item.peEstado === "A" ? "Pendiente" : "Entregado"}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
          ItemSeparatorComponent={() => <Divider />}
          estimatedItemSize={200}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={fecha}
          onConfirm={(date) => {
            setOpen(false);
            setIsLoading(true);
            onFecha(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
