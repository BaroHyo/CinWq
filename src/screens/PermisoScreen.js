import React, { useContext } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { PermissionsContext } from '../contexts';

export const PermisoScreen = () => {

    const { askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Es necesario el uso del GPS para usar esta aplicación</Text>
            <Button mode="outlined"
                onPress={askLocationPermission}
                style={{ marginVertical: 5 }}>
                Permiso
            </Button>
        </View>
    )
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    texto: {
        color: "#070808",
        width: 250,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
})