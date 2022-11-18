import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Paragraph } from "react-native-paper";
import DatePicker from "react-native-date-picker";

import { MapaComponent } from "../../components/MapaComponent";
import { PedidoContext } from "../../contexts";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/commo";
import { LoadingScreen } from "../LoadingScreen";
import { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../components/BottomSheet";

export const MapaScreen = ({ navigation }) => {

    const { pedido, loadPedido, isLoading, fecha, onFecha, setIsLoading } = useContext(PedidoContext);
    const [open, setOpen] = useState(false);
    const [detalle, setDetalle] = useState({});
    const { codigo } = useAuth();


    const ref = useRef(null);

    const onPress = useCallback((value) => {
      const isActive = ref?.current?.isActive();
      setDetalle(value);
      if (isActive) {
        ref?.current?.scrollTo(0);
      } else {
        ref?.current?.scrollTo(-300);
      }
    }, []);

    useEffect(() => {
      loadPedido(codigo, formatDate(fecha));
    }, [fecha]);

    if (isLoading) {
      return <LoadingScreen />;
    }

 
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Appbar.Header mode="small">
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="PEDIDO" />
          <Appbar.Action icon="calendar"
                         onPress={() => setOpen(true)} />
        </Appbar.Header>
        <MapaComponent>
          <View style={{ flex: 1 }}>
            {
              pedido.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.peLat,
                    longitude: marker.peLon,
                  }}
                  title={marker.peObs}
                  description={marker.peFechaVe}
                  onPress={() => onPress(marker)}
                />
              ))
            }
          </View>
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
        </MapaComponent>
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>

            <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
              <View style={{ flex: 1, flexDirection: "row", }}>
                <Paragraph>Producto</Paragraph>
                <Paragraph>Paq</Paragraph>
                <Paragraph>Cam</Paragraph>
                <Paragraph>Uni</Paragraph>
                <Paragraph>Paq Bo</Paragraph>
                <Paragraph>Uni Bo</Paragraph>
                <Paragraph> total</Paragraph>
              </View>

            </View>


            {/*{*/}
            {/*  Object.keys(detalle).length !== 0 ?*/}
            {/*    (<>*/}
            {/*        {*/}
            {/*          detalle.detaPedido.map((pedido, i) => (*/}
            {/*            <View key={i} style={{ flex: 1,  flexDirection: "row", justifyContent: "space-between" }}>*/}
            {/*              <Paragraph>Producto</Paragraph>*/}
            {/*              <Paragraph>Paq</Paragraph>*/}
            {/*              <Paragraph>Cam</Paragraph>*/}
            {/*              <Paragraph>Uni</Paragraph>*/}
            {/*              <Paragraph>Paq Bo</Paragraph>*/}
            {/*              <Paragraph>Uni Bo</Paragraph>*/}
            {/*              <Paragraph> total</Paragraph>*/}
            {/*            </View>*/}

            {/*          ))*/}
            {/*        }*/}
            {/*      </>*/}
            {/*    ):(<Paragraph> </Paragraph>)*/}
            {/*}*/}
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
;
