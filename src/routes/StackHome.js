import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ProductoScreen } from '../screens';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';


function CustomNavigationBar({ navigation, back, route }) {

    const theme = useTheme();

    return (
        <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
            {
                route.name === 'Home' ? (
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => navigation.openDrawer()}  >
                        <Avatar.Text
                            size={40}
                            label="XD"
                        />
                    </TouchableOpacity>
                ) :
                    (
                        <Appbar.Content title="My awesome app" />
                    )

            }
        </Appbar.Header>
    );
}



const Stack = createNativeStackNavigator();
const StackHome = () => {


    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Producto" component={ProductoScreen} />
        </Stack.Navigator>
    )
}

export default StackHome