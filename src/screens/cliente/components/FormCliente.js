import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
  Modal,
  Alert,
  Image,
} from "react-native";
import {
  Appbar,
  Button,
  Paragraph,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useForm } from "../../../hooks/useForm";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import { useGeocoding } from "../../../hooks/useGeocoding";
import { useLocation } from "../../../hooks/useLocation";
import { ModalPoup } from "../../../components/ModalPoup";
import { LoadingScreen } from "../../LoadingScreen";
import Locationiq from "../../../utils/api";


const MapForm = ({ latitude, longitude, style }) => {

  const mapViewRef = useRef();
  const followingRef = useRef(true);

  return (
    <MapView
      ref={(el) => mapViewRef.current = el}
      style={style}
      showsUserLocation={false}
      showsMyLocationButton={false}
      rotateEnabled={false}
      scrollEnabled={false}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 1 / 600,
        longitudeDelta: 2 / 600,
      }}
      onTouchStart={() => followingRef.current = false}>
      <>
        <Marker coordinate={{ latitude, longitude }} />
      </>
    </MapView>
  );
};


const MapLocation = ({ initialPositionForm, direccion, close }) => {

  const [address, setaddress] = useState({});
  const [region, setRegion] = useState({});

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
  } = useLocation();

  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();

  const mapViewRef = useRef();

  const followingRef = useRef(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!followingRef.current) return;
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  }, [userLocation]);


  const getAddress = async (latitude, longitude) => {
    const key = "pk.32b790ffec52a831ac358dfd15412c91";
    const resp = await Locationiq.get(`/reverse?key=${key}&lat=${latitude}&lon=${longitude}&format=json`);
    setaddress(resp.data.address);
  };

  const onRegionChange = (value) => {
    setRegion(value);
    const { latitude, longitude } = region;
    getAddress(latitude, longitude);
  };


  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={close} />
      </Appbar.Header>
      <MapView
        ref={(el) => mapViewRef.current = el}
        style={{
          height: height,
          width: width,
        }}
        initialRegion={{
          latitude: initialPositionForm.latitude,
          longitude: initialPositionForm.longitude,
          latitudeDelta: 1 / 600,
          longitudeDelta: 2 / 600,
        }}
        onRegionChangeComplete={onRegionChange}
        onTouchStart={() => followingRef.current = false}
      />
      <View style={{ left: "50%", top: "50%", marginLeft: -24, marginTop: -48, position: "absolute" }}>
        <Image style={{ height: 48, width: 48 }} source={require("../../../assets/custom-marker.png")} />
      </View>
      <View style={styles.viewFooter}>
        <TextInput
          label="DIRECCION"
          mode="outlined"
          underlineColor="transparent"
          multiline
          numberOfLines={4}
          value={`${address.road}, ${address.neighbourhood}`}
          style={{ ...styles.textInput, backgroundColor: colors.surface, marginHorizontal: 15, marginVertical: 8 }}
        />
        <Button mode="contained"
                onPress={close}
                style={{ marginVertical: 5, marginHorizontal: 15 }}>
          Obtener Ubicacion
        </Button>
      </View>
    </View>
  );
};


const ModalMapa = ({ children, visible, close }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        close();
      }}>
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
          {children}
        </View>
      </View>
    </Modal>
  );

};


export const FormCliente = ({ cliente, navigation, initialPosition, submit, isLoading, isSucces, close }) => {
  const {
    prId,
    prIdsub,
    prNombre,
    prDireccion,
    prCodigo,
    prUbicacion,
    prZona,
    prRuta,
    prTelefono,
    prVendedor,
    prNitfa,
    prNombrefa,
    prCelular,
    prSuc,
    prLat,
    prLon,
    prTiponego,
    prObs,
    prLatiDelta,
    prLonDelta,
    onChange,
  } = useForm({
    prId: cliente.prId,
    prIdsub: cliente.prIdsub,
    prNombre: cliente.prNombre,
    prDireccion: "",// `${address.road}, ${address.neighbourhood}`, //cliente.prDireccion,
    prCodigo: cliente.prCodigo,
    prUbicacion: cliente.prUbicacion,
    prZona: cliente.prZona,
    prRuta: cliente.prRuta,
    prTelefono: cliente.prTelefono,
    prVendedor: cliente.prVendedor,
    prNitfa: cliente.prNitfa,
    prNombrefa: "",
    prCelular: cliente.prCelular,
    prSuc: cliente.prSuc,
    prLat: cliente.prLat,
    prLon: cliente.prLon,
    prTiponego: cliente.prTiponego,
    prObs: cliente.prObs,
    prLatiDelta: cliente.prLatiDelta,
    prLonDelta: cliente.prLonDelta,
  });
  const { latitude, longitude } = initialPosition;

  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const onClose = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Paragraph>Datos General</Paragraph>
        <TextInput
          label="NOMBRE"
          mode="outlined"
          underlineColor="transparent"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prNombre}
          onChangeText={(value) => onChange(value, "prNombre")}
        />
        <TextInput
          label="CODIGO"
          mode="outlined"
          underlineColor="transparent"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prCodigo}
          onChangeText={(value) => onChange(value, "prCodigo")}
        />
        <Paragraph>Datos Contactos</Paragraph>
        <TextInput
          label="TELEFONO"
          mode="outlined"
          underlineColor="transparent"
          keyboardType="numeric"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prTelefono}
          onChangeText={(value) => onChange(value, "prTelefono")}
        />
        <TextInput
          label="CELULAR"
          mode="outlined"
          underlineColor="transparent"
          keyboardType="numeric"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prCelular}
          onChangeText={(value) => onChange(value, "prCelular")}
        />
        <Paragraph>Datos Facturacion</Paragraph>
        <TextInput
          label="NIT"
          mode="outlined"
          underlineColor="transparent"
          keyboardType="numeric"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prNitfa}
          onChangeText={(value) => onChange(value, "prNitfa")}
        />
        <TextInput
          label="RAZON SOCIAL"
          mode="outlined"
          underlineColor="transparent"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prNombrefa}
          onChangeText={(value) => onChange(value, "prNombrefa")}
        />

        <Paragraph>Datos Distribucion</Paragraph>
        <View style={styles.textInput}>
          <Text style={{ fontSize: 9 }}>RUTA</Text>
          <View style={{
            flex: 1,
            borderWidth: 1,
          }}>
            <Picker
              label="RUTA"
              mode="dropdown"
              style={{
                backgroundColor: colors.surface,
                color: "black",
              }}
              selectedValue={prRuta}
              onValueChange={(value) => onChange(value, "prRuta")}>
              <Picker.Item label="LUNES" value="lunes" />
              <Picker.Item label="MARTES" value="martes" />
              <Picker.Item label="MIERCOLES" value="miercoles" />
              <Picker.Item label="JUEVES" value="jueves" />
              <Picker.Item label="VIERNES" value="viernes" />
              <Picker.Item label="SABADO" value="Sabado" />
            </Picker>
          </View>
        </View>
        <TextInput
          label="ZONA"
          mode="outlined"
          underlineColor="transparent"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prZona}
          onChangeText={(value) => onChange(value, "prZona")}
        />
        <TextInput
          label="TIPO NEGOCIO"
          mode="outlined"
          underlineColor="transparent"
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          value={prTiponego}
          onChangeText={(value) => onChange(value, "prTiponego")}
        />
        <Paragraph>Datos Geolocalización</Paragraph>
        <TouchableRipple
          onPress={() => setModalVisible(true)}
          rippleColor="rgba(0, 0, 0, .32)"
          style={{ marginVertical: 3 }}>
          <MapForm
            latitude={latitude}
            longitude={longitude}
            style={{ height: height / 4, width: width }} />
        </TouchableRipple>
        <TextInput
          label="DIRECCION"
          mode="outlined"
          underlineColor="transparent"
          multiline
          numberOfLines={3}
          value={prDireccion}
          style={{ ...styles.textInput, backgroundColor: colors.surface }}
          onChangeText={(value) => onChange(value, "prDireccion")}
        />
        <View style={{ marginVertical: 3 }}>
          <Button
            mode="contained"
            loading={isLoading}
            onPress={
              () => submit({
                prId,
                prIdsub,
                prNombre,
                prDireccion,
                prCodigo,
                prUbicacion,
                prZona,
                prRuta,
                prTelefono,
                prVendedor,
                prNitfa,
                prCelular,
                prSuc,
                prLat: latitude,
                prLon: longitude,
                prTiponego,
                prObs: "Pruebas",
                prLatiDelta: 1 / 600,
                prLonDelta: 2 / 600,
              })
            }
            style={{
              marginVertical: 10,
              backgroundColor: colors.primary,
            }}>
            Guardar
          </Button>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{
              marginVertical: 10,
              backgroundColor: colors.error,
            }}>
            Cancelar
          </Button>
        </View>
      </ScrollView>
      <ModalMapa visible={modalVisible} close={onClose}>
        <MapLocation initialPositionForm={initialPosition}
                     direccion={prDireccion}
                     close={onClose} />
      </ModalMapa>

      <ModalPoup visible={isSucces} close={() => {
        close();
        navigation.goBack();
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 8,
  },
  textInput: {
    marginVertical: 3,
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "red",
    opacity: 0.6,
  },
  viewFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    height: 230,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
});
