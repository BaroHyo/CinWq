import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const Logo = () => (
    <Image source={require('../assets/avatar.png')} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    },
});
