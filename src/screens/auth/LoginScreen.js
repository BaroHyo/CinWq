import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Background, Logo, Titulo, Button } from '../../components';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const { codigo, onChange } = useForm({
    codigo: "",
  });

  const onLogin = () => {
    Keyboard.dismiss();
  };

  return (
    <Background>
      <Logo />
      <Titulo>CIN</Titulo>
      <Text variant="headlineSmall">
        Iniciar Sesion
      </Text>
      <Text variant="labelLarge">
        Ingrese su codigo asignado
      </Text>
      <Divider />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          mode="outlined"
          label="Codigo Vendedor"
          keyboardType="numeric"
          value={codigo}
          secureTextEntry={isPasswordSecure}
          right={<TextInput.Icon icon={isPasswordSecure ? "eye" : "eye-off"}
            onPress={() => setIsPasswordSecure(!isPasswordSecure)} />}
          onChangeText={(value) => onChange(value, "codigo")}
        />
        <Button mode="contained" onPress={onLogin}>
          Ingresar
        </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    // backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    /// color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
