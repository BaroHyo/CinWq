import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { menu } from '../config';

const windowWidth = Dimensions.get("window").width;



export const HomeScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FlatList
          data={menu}
          keyExtractor={(p) => p.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <Card style={{ ...styles.container, width: windowWidth * 0.4 }}
              elevation={5}
              mode="elevated"
              onPress={() => navigation.navigate(item.component)}>
              <Card.Title title={item.nombre} />
              <Card.Content style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={item.img} style={styles.image} />
              </Card.Content>
            </Card>
          )}
          onEndReachedThreshold={0.4}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  container: {
    marginHorizontal: 15,
    height: 130,
    width: 170,
    marginBottom: 25,
  },
  titleUser: {
    fontSize: 15,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  image: {
    width: 70,
    height: 70,
  },
});
