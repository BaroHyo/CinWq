import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, openSettings, PERMISSIONS, request } from "react-native-permissions";


export const PermissionsContext = createContext({});

const permissionInitState = {
    locationStatus: "unavailable",
};


export const PermissionsProvider = ({ children }) => {


    const [permission, setPermission] = useState(permissionInitState);

    useEffect(() => {

        checkLocationPermission();

        AppState.addEventListener("change", state => {
            if (state !== "active") return;
            checkLocationPermission();
        });

    }, []);

    const askLocationPermission = async () => {

        let permissionStatus;

        if (Platform.OS === "ios") {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (permissionStatus === "blocked") {
            openSettings();
        }

        setPermission({
            ...permission,
            locationStatus: permissionStatus,
        });

    };

    const checkLocationPermission = async () => {

        let permissionStatus;

        if (Platform.OS === "ios") {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermission({
            ...permission,
            locationStatus: permissionStatus,
        });

    };


    return (
        <PermissionsContext.Provider value={{
            permission,
            askLocationPermission,
            checkLocationPermission,
        }}>
            {children}
        </PermissionsContext.Provider>
    );

}
