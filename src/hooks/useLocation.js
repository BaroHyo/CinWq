import { useEffect, useState, useRef } from "react";
import Geolocation from "react-native-geolocation-service";
import { Alert } from "react-native";


export const useLocation = () => {

  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState([]);



  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const watchId = useRef();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);


  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        if (!isMounted.current) return;
        setInitialPosition(location);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
        setHasLocation(true);
      });
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => (
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => reject({ err }),
        { enableHighAccuracy: true },
      )

    ));
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted.current) return;
        const location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      (err) => Alert.alert('Error', JSON.stringify(err)), { enableHighAccuracy: true, distanceFilter: 10 },
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current)
      Geolocation.clearWatch(watchId.current);
  };


  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines
  };
};
