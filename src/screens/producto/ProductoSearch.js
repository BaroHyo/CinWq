import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Platform, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Card, Paragraph, Searchbar, Text, Title, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProductoSearch } from "../../hooks/useProductoSearch";
import { financial } from "../../utils/commo";
import { LoadingScreen } from "../LoadingScreen";


const screenWidth = Dimensions.get("window").width;

export const ProductoSearch = ({ navigation }) => {

  const { top } = useSafeAreaInsets();

  const { colors } = useTheme();

  const { isFetching, simpleProductoList } = useProductoSearch();
  const [productoFiltered, setProductoFiltered] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (term.length === 0) {
      return setProductoFiltered([]);
    }
    setProductoFiltered(
      simpleProductoList.filter(
        (pro) => pro.nombre.toLocaleLowerCase()
          .includes(term.toLocaleLowerCase()),
      ),
    );
  }, [term]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="PRODUCTO" />
      </Appbar.Header>
      <View style={{
        flex: 1,
        marginHorizontal: 5,
      }}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={(value) => setTerm(value)}
          value={term}
          elevation={1}
          style={{
            position: "absolute",
            zIndex: 999,
            width: screenWidth - 15,
            top: (Platform.OS === "ios") ? top : top + 8,
          }} />
        <View style={styles.container}>
          <FlatList
            data={productoFiltered}
            keyExtractor={(p) => p.idProducto.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                paddingBottom: 10,
                marginTop: (Platform.OS === "ios") ? top + 60 : top + 80,
              }}>{term}</Text>
            )}

            renderItem={({ item }) => (
              <Card elevation={5}
                style={{
                  marginVertical: 6,
                  borderLeftWidth: 5,
                  borderLeftColor: colors.primary,
                }}
                mode="elevated"
                onPress={() => navigation.navigate("ProductoScreen", { item })}>
                <Card.Content style={styles.rowView}>
                  <View style={{ justifyContent: "space-between" }}>
                    <Paragraph>{item.nombre}</Paragraph>
                    <Paragraph>Precio Venta: {financial(item.precioventa)}</Paragraph>
                  </View>
                  <Avatar.Image size={50} source={require('../../assets/no.jpg')} />
                </Card.Content>
              </Card>
            )}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
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
});
