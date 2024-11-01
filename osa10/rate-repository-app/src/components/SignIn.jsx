import React from "react";
import { useFormik } from "formik";
import Text from "./Text";
import { View, TextInput, StyleSheet } from "react-native-web";
import { Pressable } from "react-native";
import theme from "../theme";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

// eslint-disable-next-line react/prop-types
export const SignInContainer = ({formik}) => {
  return (
    <View testID='SignInContainer' style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ margin: 15 }}>
        <TextInput testID="usernameInput"
          style={[
            styles.inputText,
            formik.touched.username && formik.errors.username && styles.inputError
          ]}
          placeholder={formik.errors.username && formik.touched.username ? formik.errors.username : "Username"}
          placeholderTextColor={formik.errors.username && formik.touched.username ? "red" : "grey"}
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          autoCapitalize="none"
        />
        <TextInput testID="passwordInput"
          style={[
            styles.inputText,
            formik.touched.password && formik.errors.password && styles.inputError
          ]}
          placeholder={formik.errors.password && formik.touched.password ? formik.errors.password : "Password"}
          placeholderTextColor={formik.errors.password && formik.touched.password ? "red" : "grey"}
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          autoCapitalize="none"
        />
        <Pressable testID="submitButton"
          style={styles.button}
          onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {

  const navigate = useNavigate();

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // const { data } = await signIn({ username, password });
      // console.log(data);
      await signIn({ username, password });
      navigate('/');
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
    <SignInContainer formik={formik} />
  );
};

export default SignIn;