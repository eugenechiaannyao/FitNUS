import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../helpers/auth";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export default function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const link =
    "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&amp;client_id=97F0D1CACA7D41DE87538F9362924CCB-184318&amp;resource=sg_edu_nus_oauth&amp;redirect_uri=https%3A%2F%2Fmyaces.nus.edu.sg%3A443%2Fhtd%2Fhtd";

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  const handleSubmit = () => {
    login(userId, password);
  };

  return (
    <Background>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="arrowleft" size={22} color="azure" />
          <Text style={{ color: "azure", fontSize: 15, marginLeft: 7 }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <Image source={require("../assets/Girls.png")} style={styles.image} />
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="Email"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setUserId(text)}
          errorText="Please enter valid email"
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setPassword(text)}
          errorText="Please enter valid password"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.signUpButton}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Login"
        style={styles.loginButton}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#0B2A59" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Reset Password')}>
        <Text style={{ fontSize: 13, color: "#F5DC3C" }}>
          Forgot Your Password?
        </Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: "14%",
    alignSelf: "center",
  },

  image: {
    marginBottom: 20,
    width: 150,
    height: 170,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
    minHeight: 40,
  },

  layout: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },

  loginButton: {
    marginTop: 7,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFC94A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  signUpButton: {
    height: 30,
    marginBottom: 2,
    fontSize: 14,
    color: "#F5DC3C",
  },

  forgotButton: {
    alignItems: "flex-end",
    width: "76%",
    height: 30,
    marginTop: 8,
    marginBottom: 22,
    fontSize: 14,
    color: "#F5DC3C",
  },

  backButton: {
    width: "85%",
    marginBottom: 30,
    alignSelf: "auto",
  },
});
