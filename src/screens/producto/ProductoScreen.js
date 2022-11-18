import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native'
import { Appbar, Avatar, Card, Paragraph, useTheme } from 'react-native-paper';
import { ProductoContext } from '../../contexts';
import { financial } from '../../utils/commo';


export const ProductoScreen = ({ navigation }) => {

  const { producto } = useContext(ProductoContext);

  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="PRODUCTOS" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate("Buscar")} />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={producto}
          keyExtractor={(p) => p.idProducto.toString()}
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
  )
}

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
