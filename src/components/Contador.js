import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export const Contador = ({ value, increment, decrement }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cajaButton}>
        <IconButton
          icon="minus"
          size={19}
          disabled={value === 0}
          onPress={decrement}
        />
      </View>
      <View style={styles.cajaButton}>
        <Text>{value}</Text>
      </View>
      <View style={styles.cajaButton}>
        <IconButton
          icon="plus"
          size={19}
          onPress={increment}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#eeeeee',
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    width: 90,
  },
  cajaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 25,
  },
});
