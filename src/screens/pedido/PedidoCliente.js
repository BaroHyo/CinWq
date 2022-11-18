import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Card, Paragraph, Title } from 'react-native-paper';
import { ClienteContext } from '../../contexts';

export const PedidoCliente = ({ navigation }) => {

  const { clientes } = useContext(ClienteContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.Content title="CLIENTES" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate("BuscarClientePedido")} />
      </Appbar.Header>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <FlatList
          data={clientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              elevation={3}
              style={{ marginVertical: 6 }}
              mode="elevated"
              onPress={() => navigation.navigate("PedidoProducto", {
                cliente: item
              })}>
              <Card.Content>
                <Paragraph>{item.prNombre}</Paragraph>
                <Paragraph>Codigo: {item.prCodigo}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  )
}

