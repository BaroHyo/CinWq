import React, { useEffect, useState } from "react";
import { View, Platform, Dimensions, StyleSheet, FlatList } from "react-native";
import { Appbar, Card, Chip, Paragraph, Searchbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useClienteSearch } from "../../hooks/useClienteSearch";
import { LoadingScreen } from "../LoadingScreen";

const screenWidth = Dimensions.get("window").width;


export const ClienteBuscarScreen = ({ navigation }) => {


  const { top } = useSafeAreaInsets();


  const { isFetching, simpleClienteList } = useClienteSearch();
  const [clienteFiltered, setClienteFiltered] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {

    if (term.length === 0) {
      return setClienteFiltered([]);
    }

    setClienteFiltered(
      simpleClienteList.filter(
        (cli) => cli.prNombre.toLocaleLowerCase()
          .includes(term.toLocaleLowerCase()),
      ),
    );
  }, [term]);


  if (isFetching) {
    return <LoadingScreen />;
  }


  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="CLIENTE" />
      </Appbar.Header>
      <View style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={(value) => setTerm(value)}
          value={term}
          style={{
            position: "absolute",
            zIndex: 999,
            width: screenWidth - 40,
            top: (Platform.OS === "ios") ? top : top + 20,
          }}
        />
        <FlatList
          data={clienteFiltered}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          // Header
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 10,
              marginTop: (Platform.OS === "ios") ? top + 60 : top + 80,
            }}>{term}</Text>
          )}

          renderItem={({ item }) => (
            <Card
              style={{
                marginVertical: 5,
              }}
              elevation={4}
              mode="elevated"
              onPress={() => navigation.navigate("PedidoProducto", {
                cliente: item,
              })}>
              <Card.Content>
                <View style={styles.rowView}>
                  <Paragraph>{item.prNombre}</Paragraph>
                  <Chip>{item.prCodigo}</Chip>
                </View>
                <Paragraph>Direccion: {item.prDireccion}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
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
