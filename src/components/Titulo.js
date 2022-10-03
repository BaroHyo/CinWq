import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const Titulo = ({ children }) => (
    <Text style={styles.titulo}>{children}</Text>
);

const styles = StyleSheet.create({
    titulo: {
        fontSize: 26,
        // color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});
