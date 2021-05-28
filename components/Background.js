import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView, Platform
} from "react-native";

export default function Background({ children }) {
  return (
    <ImageBackground source={require("../assets/BG.png")} style={styles.image}>
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height" } style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
