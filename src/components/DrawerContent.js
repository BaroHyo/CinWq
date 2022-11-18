import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, useDrawerProgress } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Avatar,
    Caption,
    Drawer,
    Switch,
    Text,
    Title,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';
import Animated, { interpolate } from 'react-native-reanimated';
import { AuthContext, PreferencesContext } from '../contexts';
import { iniciale } from '../utils/commo';

export const DrawerContent = (props) => {


    const { user, logOut } = useContext(AuthContext);
    const { toggleTheme, isThemeDark } = useContext(PreferencesContext);

    const paperTheme = useTheme();

    const progress = useDrawerProgress();

    const translateX = interpolate(progress.value, [-100, 0], [2, 1], {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0],
    });

    const { veNombre, veId } = user;



    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                style={[styles.drawerContent, {
                    backgroundColor: paperTheme.colors.surface,
                    transform: [{ translateX }],
                }]}>
                <View style={styles.userInfoSection}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}>
                        <Avatar.Text
                            label={iniciale(veNombre)}
                            size={45}
                        />
                    </TouchableOpacity>
                    <Title style={styles.title}>{veNombre}</Title>
                    <Caption style={styles.caption}>Codigo: {veId}</Caption>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Perfil"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        label="Configuración"
                        onPress={() => { }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferencias">
                    <TouchableRipple onPress={() => toggleTheme()}>
                        <View style={styles.preference}>
                            <Text>Tema oscuro</Text>
                            <View pointerEvents="none">
                                <Switch
                                    style={[{ backgroundColor: paperTheme.colors.accent }]}
                                    color={'red'}
                                    value={isThemeDark} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <DrawerItem
                        label="Salir"
                        onPress={logOut}
                    />
                </Drawer.Section>
            </Animated.View>
        </DrawerContentScrollView>
    )


}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

