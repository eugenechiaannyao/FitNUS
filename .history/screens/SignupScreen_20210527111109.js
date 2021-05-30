import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState({ input: '', pressed: false });
  const [userId, setUserId] = useState({ input: '', pressed: false})
  const [password, setPassword] = useState({ input: '', pressed: false})

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(form)
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(form.userId, form.password)
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));
  };

  return (
    <Background>
      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Name"
          style={{ paddingHorizontal: 10 }}
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="User ID"
          style={{ paddingHorizontal: 10 }}
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={handleChange}
        />
      </View>
      <TouchableOpacity
        title="Sign Up"
        style={styles.loginButton}
        onPress={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
    </Background>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    height: "14%",
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 13,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
  },

  link: {
    fontWeight: 'bold',
    color: '#FFC94A',
  },
});