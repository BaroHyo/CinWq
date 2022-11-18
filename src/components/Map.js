import React, { useEffect, useRef, useState } from "react";
import MapView, { Polyline } from "react-native-maps";
import { FAB } from "react-native-paper";
import { useLocation } from "../hooks/useLocation";
import { LoadingScreen } from "../screens/LoadingScreen";

export const Map = ({ children, navigation, showsUserLocation = true }) => {

    const [showPolyline, setShowPolyline] = useState(true);

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
        <>
            <MapView
                ref={(el) => mapViewRef.current = el}
                style={{ flex: 1 }}
                showsUserLocation={showsUserLocation}
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => followingRef.current = false}>
                <React.Fragment>
                    {
                        showPolyline && (
                            <Polyline
                                coordinates={routeLines}
                                strokeColor="black"
                                strokeWidth={3} />
                        )
                    }
                    {children}
                </React.Fragment>
            </MapView>
            <FAB
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                }}
                small
                icon="close"
                onPress={() => navigation.goBack()}
            />
            <FAB
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 140,
                }}
                small
                icon="crosshairs-gps"
                onPress={centerPosition}
            />
            <FAB
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 80,
                }}
                small
                icon="fountain-pen"
                onPress={() => setShowPolyline(value => !value)}
            />
        </>
    );
};
