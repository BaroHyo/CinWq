import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Modal,
    Image,
    Animated,
} from 'react-native';
import { IconButton, Text } from 'react-native-paper';


export const ModalPoup = ({ visible, close }) => {

    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <IconButton
                                icon="close"
                                size={30}
                                onPress={close}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../assets/success.png')}
                            style={{ height: 150, width: 150, marginVertical: 10 }}
                        />
                    </View>
                    <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                        Felicidades el registro fue exitoso
                    </Text>
                </Animated.View>
            </View>
        </Modal>
    );
}

ModalPoup.propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func
}


const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});