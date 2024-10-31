import React from "react";
import { useFormik } from "formik";
import Text from "./Text";
import { View, TextInput, StyleSheet } from "react-native-web";
import { Pressable } from "react-native";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    borderColor:'#ccc',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
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

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ margin: 15 }}>
        <TextInput
          style={[
            styles.inputText,
            formik.touched.username && formik.errors.username && styles.inputError
          ]}
          placeholder={formik.errors.username && formik.touched.username ? formik.errors.username : "Username"}
          placeholderTextColor={formik.errors.username && formik.touched.username ? "red" : "grey"}
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        <TextInput
          style={[
            styles.inputText,
            formik.touched.password && formik.errors.password && styles.inputError
          ]}
          placeholder={formik.errors.password && formik.touched.password ? formik.errors.password : "Password"}
          placeholderTextColor={formik.errors.password && formik.touched.password ? "red" : "grey"}
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
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