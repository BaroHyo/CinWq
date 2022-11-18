import React, { useContext } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Appbar, Avatar, Badge, Card, Divider, Paragraph, Title, useTheme } from 'react-native-paper'
import { PedidoContext, ProductoContext } from '../../contexts';
import { financial } from '../../utils/commo';


export const PedidoProducto = ({ navigation, route }) => {

    const { cliente } = route.params;

    const { producto } = useContext(ProductoContext);

    const { cantidad } = useContext(PedidoContext);

    const { colors } = useTheme();


    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                 <Appbar.Content title="Productos" />
                <View>
                    <Badge size={16}
                        style={styles.badge}
                        visible={cantidad > 0}>
                        {cantidad}
                    </Badge>
                    <Appbar.Action icon="cart-outline" onPress={() => navigation.navigate("PedidoResumen", {
                        cliente
                    })} />
                </View>
            </Appbar.Header>
            <View style={styles.container}>
                <FlatList
                    data={producto}
                    keyExtractor={(p) => p.idProducto}
                    renderItem={({ item }) => (
                        <Card elevation={5}
                            style={{
                                marginVertical: 6,
                                borderLeftWidth: 5,
                                borderLeftColor: colors.primary,
                            }}
                            mode="elevated"
                            onPress={() => navigation.navigate("PedidoForm", {
                                cliente,
                                producto: item
                            })}>
                            <Card.Content style={styles.rowView}>
                                <View style={{ justifyContent: "space-between" }}>
                                    <Paragraph>{item.nombre}</Paragraph>
                                    <Paragraph>Precio Venta: {financial(item.precioventa)}</Paragraph>
                                </View>
                                <Avatar.Image size={50} source={require('../../assets/no.jpg')} />
                            </Card.Content>
                        </Card>
                    )}
                    ItemSeparatorComponent={() => (
                        <Divider style={{ marginVertical: 5 }} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 8,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
    },
    chip: {
        margin: 4,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    badge: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    rowView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imagen: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
});
