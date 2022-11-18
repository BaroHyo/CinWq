import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Portal, Dialog, MD3Colors } from 'react-native-paper';

export default function DialogWithIcon({ visible, close }) {
    return (
        <Portal>
            <Dialog onDismiss={close} visible={visible}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={styles.title}>Dialog with Icon</Dialog.Title>
                <Dialog.Content>
                    This is a dialog with new component called DialogIcon. When icon is
                    displayed you should center the header.
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={close} color={MD3Colors.error50}>
                        Disagree
                    </Button>
                    <Button onPress={close}>Agree</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
});