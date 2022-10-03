import React from 'react';
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

export const DrawerContent = (props) => {

    const paperTheme = useTheme();

    const progress = useDrawerProgress();

    const translateX = interpolate(progress.value, [-100, 0], [2, 1], {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0],
    });

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                style={[
                    styles.drawerContent,
                    {
                        backgroundColor: paperTheme.colors.surface,
                        transform: [{ translateX }],
                    },
                ]}>
                <View style={styles.userInfoSection}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}>
                        <Avatar.Text
                            label="XD"
                            size={50}
                        />
                    </TouchableOpacity>
                    <Title style={styles.title}>Dawid Urbaniak</Title>
                    <Caption style={styles.caption}>@trensik</Caption>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Profile"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        label="Preferences"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        label="Bookmarks"
                        onPress={() => { }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.preference}>
                            <Text>RTL</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <DrawerItem
                        label="Salir"
                        onPress={() => { }}
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

