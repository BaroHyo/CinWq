import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

export const MapMin = ({ styles, latitude, longitude }) => {


  const mapViewRef = useRef();

  const followingRef = useRef(true);

  useEffect(() => {
    if (!followingRef.current) return;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  }, [latitude, longitude]);

  return (
    <React.Fragment>
      <MapView
        ref={(el) => mapViewRef.current = el}
        style={styles}
        rotateEnabled={false}
        scrollEnabled={false}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 1 / 300,
          longitudeDelta: 2 / 300,
        }}
        onTouchStart={() => followingRef.current = false}>
        <React.Fragment>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </React.Fragment>
      </MapView>
    </React.Fragment>
  );
};
