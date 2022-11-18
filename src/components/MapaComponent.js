import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useLocation } from "../hooks/useLocation";
import { LoadingScreen } from "../screens";
import MapView from "react-native-maps";

export const MapaComponent = ({ children }) => {

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

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

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    followingRef.current = true;
    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={(el) => mapViewRef.current = el}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => followingRef.current = false}>
        {children}
      </MapView>
    </View>
  );
};
