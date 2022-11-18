import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Card, Chip, FAB, Paragraph, useTheme } from "react-native-paper";
import { ClienteContext } from "../../contexts";
import { FlashList } from "@shopify/flash-list";


export const ClienteScreen = ({ navigation }) => {

  const { clientes } = useContext(ClienteContext);
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="CLIENTES" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate("BuscarCliente")} />
      </Appbar.Header>
      <View style={styles.container}>
        <FlashList
          data={clientes}
          renderItem={({ item }) => (
            <Card
              style={{
                marginVertical: 5,
              }}
              elevation={4}
              mode="elevated"
              onPress={() => {
              }}>
              <Card.Content>
                <View style={styles.rowView}>
                  <Paragraph>{item.prNombre}</Paragraph>
                  <Chip>{item.prCodigo}</Chip>
                </View>
                <Paragraph>Direccion: {item.prDireccion}</Paragraph>
              </Card.Content>
            </Card>
          )}
          estimatedItemSize={200}
        />
      </View>
      <FAB
        icon="plus"
        style={{
          ...styles.fab,
          backgroundColor: colors.primary,
        }}
        onPress={() => navigation.navigate("FormModal", {
          cliente: {},
        })}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagen: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
