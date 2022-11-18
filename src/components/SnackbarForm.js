import React from 'react';
import { Snackbar } from 'react-native-paper';


export const SnackbarForm = ({
    visible,
    close
}) => {
    return (
        <Snackbar
            duration={1000}
            visible={visible}
            onDismiss={close}
            action={{
                label: 'Undo',
                onPress: () => {
                    // Do something
                },
            }}>
            Hey there! I'm a Snackbar.
        </Snackbar>
    )
}
