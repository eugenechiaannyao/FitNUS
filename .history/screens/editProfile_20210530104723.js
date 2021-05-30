import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Image source={require("../assets/user.png")} style={styles.image} />
        <Text style={styles.text}>edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    margin: 5,
    height: 50,
    width: 50,
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
  },

  text: {
    fontSize: 10,
  },

  
});