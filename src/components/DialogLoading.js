import React from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { Dialog, MD2Colors, MD3Colors, Paragraph, Portal } from "react-native-paper";

const isIOS = Platform.OS === "ios";

export const DialogLoading = ({ visible, close }) => {
  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Content>
          <View style={styles.flexing}>
            <ActivityIndicator
              color={MD3Colors.tertiary30}
              size={isIOS ? "large" : 48}
              style={styles.marginRight}
            />
            <Paragraph>Loading.....</Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};


const styles = StyleSheet.create({
  flexing: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginRight: {
    marginRight: 16,
  },
});
