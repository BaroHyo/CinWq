import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, Modal, StyleSheet, Text, View } from "react-native";
import { Appbar, Card, Chip, Paragraph, Title, useTheme } from "react-native-paper";
import { formatDate } from "../../utils/commo";
import DatePicker from "react-native-date-picker";
import { LoadingScreen } from "../LoadingScreen";
import { useAuth } from "../../hooks/useAuth";
import { MapaComponent } from "../../components/MapaComponent";
import { DistribucionContext } from "../../contexts/DistribucionContext";
import { Marker } from "react-native-maps";



export const DistribucionMapScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { destribucion, loadDistribucion, isLoading, fecha, onFecha, setIsLoading } = useContext(DistribucionContext);

  const { colors } = useTheme();
  const { codigo } = useAuth();

  useEffect(() => {
    loadDistribucion(codigo, formatDate(fecha));
  }, [fecha]);


  const displayModal = (show) => {
    setIsVisible(show);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="GPS" />
        <Appbar.Action
          icon="calendar"
          color={colors.primary}
          onPress={() => setOpen(true)}
        />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <MapaComponent>
          <View style={{ flex: 1 }}>
            {
              destribucion.map(({ peLat, peLon, peObs, peFechaVe, peEstado }, index) => {
                if (peLat !== 0 && peLon !== 0) {
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: peLat,
                        longitude: peLon,
                      }}
                      title={peObs}
                      description={peFechaVe}
                      pinColor={peEstado === "A" ? "#D51F0A" : "#40BC02"}
                      onPress={() => displayModal(true)}
                    />
                  );
                }

              })
            }
          </View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              Alert.alert("Modal has now been closed.");
            }}>
            <View style={{ flex: 1 }}>

            </View>
          </Modal>
        </MapaComponent>
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
  mainContainer: {
    flex: 1,
  },

});
