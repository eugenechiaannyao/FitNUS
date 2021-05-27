import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [userId, setUserId] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = () => {
    console.log('hello')
  }

  return (
      <Background>   
      <Image
        source={require("../assets/nus-logo-gold-b-horizontal.png")}
        style={styles.logo}
      />

      <Image
        source={require("../assets/Girls.png")}
        style={styles.image}
      />
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput placeholder="User ID" style={{paddingHorizontal: 10}} onChangeText={(text) => setUserId({value: text, error: ''})}/>
      </View>
      <View style={styles.input}>
        <AntDesign name='lock' size={24} color="blue" />
        <TextInput placeholder="Password" style={{paddingHorizontal: 10}} onChangeText={(text) => setPassword({value: text, error: ''})}/>
      </View>
      <View></View>
      <TouchableOpacity title="Login" style={styles.loginButton} onPress={handleSubmit}>
        <Text style={{color: '#0B2A59'}}>Login</Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 140,
    alignSelf: "center",
  },

  image: {
      marginBottom: 20,
      width: 150,
      height: 170,
      alignSelf: 'center'
  },

  input: {
    backgroundColor: '#BED1EF',
    flexDirection: "row",
    alignItems: "center",
    width: '80%',
    height: '5%',
    marginVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8
  },

  layout: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue"
  },

  loginButton: {
    marginTop: 15,
    marginBottom: 60,
    width: '80%',
    alignItems: "center",
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#FFC94A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
}
});
