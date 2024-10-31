import React from "react";
import { useFormik } from "formik";
import Text from "./Text";
import { View, TextInput, StyleSheet } from "react-native-web";
import { Pressable } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  inputText: {
    height: 50,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: '18',
    fontWeight: 'bold',
    texctAlig: 'center',
  }
})

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    username: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ margin: 15 }}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        <Pressable
          style={styles.button}
          onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
      </View>
    </View>
  );
};

export default SignIn;