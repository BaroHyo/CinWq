import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Card, Chip, FAB, Paragraph, Title, useTheme } from 'react-native-paper';
import DatePicker from "react-native-date-picker";
import { PedidoContext } from '../../contexts';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/commo';
import { LoadingScreen } from '../LoadingScreen';



export const PedidoScreen = ({ navigation }) => {



  const { pedido, loadPedido, isLoading, fecha, onFecha, setIsLoading } = useContext(PedidoContext);

  const [open, setOpen] = useState(false);

  const { codigo } = useAuth();
  const { colors } = useTheme();



  useEffect(() => {
    loadPedido(codigo, formatDate(fecha));
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
        <Appbar.Content title="PEDIDO" />
        <Appbar.Action
          icon="calendar"
          color={colors.primary}
          onPress={() => setOpen(true)}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={pedido}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card elevation={5}
              style={{
                marginVertical: 3.5,
                borderLeftWidth: 5,
                borderLeftColor: colors.primary,
              }}
              mode="elevated">
              <Card.Content style={styles.rowView}>
                <View>
                  <Paragraph>{item.peCliente}</Paragraph>
                  <Paragraph>Nro. Pedido{item.peId}</Paragraph>
                </View>
                <View>
                  <Title>Bs. {item.peTotfac}</Title>
                  <Chip >{formatDate(item.peFechaVe)}</Chip>
                </View>
              </Card.Content>
            </Card>
          )}
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
      <FAB
        icon="plus"
        style={{
          ...styles.fab,
          backgroundColor: colors.primary,
        }}
        onPress={() => navigation.navigate("PedidoCliente")}
        variant="tertiary"
      />
    </View>
  )
}

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
