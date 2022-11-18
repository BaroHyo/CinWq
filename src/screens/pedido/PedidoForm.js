import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, Card, List, Paragraph, Title } from 'react-native-paper';
import { Contador } from '../../components';
import { PedidoContext } from '../../contexts';
import { financial, generateUUID } from '../../utils/commo';

export const PedidoForm = ({ navigation, route }) => {

  const { producto } = route.params;

  const { setCantidad, detalle, setDetalle } = useContext(PedidoContext);


  const [state, setState] = useState({
    pqte: 0,
    uni: 0,
    camb: 0,
    bp: 0,
    bu: 0,
  });

  const [importe, setImporte] = useState(0);

  const { pqte, uni, camb, bp, bu } = state;

  const increment = (field, value) => {
    const result = value + 1;
    setState({
      ...state,
      [field]: result,
    });
    onImporteIncremet(field);
  };

  const decrement = (field, value) => {
    const result = value - 1;
    setState({
      ...state,
      [field]: result,
    });
    onImporteDecrement(field);
  };

  const onSubmit = () => {
    const { idProducto, nombre, precioventa, codigo } = producto;
    const total = pqte + uni + camb + bp + bu;
    const body = {
      deId: generateUUID(),
      deIdpe: 0,
      deItemNro: 0,
      deIdpro: idProducto,
      deCod: codigo,
      deNombre: nombre,
      deCantiPa: pqte,
      deCantiun: uni,
      deCantica: camb,
      dePrecioU: precioventa, //10
      dePrecioT: importe,//60
      deCantpaqbo: bp,
      deCantunibo: bu,
      totalCantidad: total,
    };

    setCantidad(total);
    setDetalle([...detalle, body]);
    navigation.goBack();
  };

  const onImporteIncremet = (field) => {
    if (field === "pqte") {
      setImporte(importe + 60);
    }
    if (field === "uni") {
      setImporte(importe + 10);
    }
  };
  const onImporteDecrement = (field) => {
    if (field === "pqte") {
      setImporte(importe - 60);
    }
    if (field === "uni") {
      setImporte(importe - 10);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode={"center-aligned"}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={producto.nombre} />
      </Appbar.Header>
      <View style={styles.container}>
        <Card
          mode="elevated"
          elevation={0}>
          <Card.Cover style={{ height: 115 }} source={{ uri: "https://picsum.photos/700" }} />
          <Card.Content>
            <Title>Bs. {financial(producto.precioventa)} </Title>
          </Card.Content>
        </Card>
        <List.Section style={{ marginHorizontal: 5 }}>
          <List.Item
            title="PQTE"
            right={() => <Contador value={pqte}
              increment={() => increment("pqte", pqte)}
              decrement={() => decrement("pqte", pqte)} />} />
          <List.Item
            title="UNI"
            right={() => <Contador value={uni}
              increment={() => increment("uni", uni)}
              decrement={() => decrement("uni", uni)} />} />
          <List.Item
            title="CAMB"
            right={() => <Contador value={camb}
              increment={() => increment("camb", camb)}
              decrement={() => decrement("camb", camb)} />} />
          <List.Item
            title="BP"
            right={() => <Contador value={bp}
              increment={() => increment("bp", bp)}
              decrement={() => decrement("bp", bp)} />} />
          <List.Item
            title="BU"
            right={() => <Contador value={bu}
              increment={() => increment("bu", bu)}
              decrement={() => decrement("bu", bu)} />} />
        </List.Section>
        <Card mode="elevated"
          style={{
            marginHorizontal: 10,
            borderRadius: 13,
          }}
          elevation={5}>
          <Card.Content>
            <Paragraph>Bs. {importe}</Paragraph>
            <Paragraph>Cantidad: {pqte + uni + camb + bp + bu}</Paragraph>
          </Card.Content>
        </Card>
        <View style={styles.viewFooter}>
          <Button style={styles.button}
            mode="contained"
            onPress={onSubmit}>
            AGREGAR
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
