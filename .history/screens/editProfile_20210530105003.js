import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getUser } from "../Api/userApi";

export default function EditProfile() {
    const [user, setUser] = useState(null)

    useEffect(async () => {
        const profile = await getUser()
        setUser(profile)
        console.log(user)
    }, [])

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
    marginBottom: 5,
    margin: 5,
    height: 80,
    width: 80,
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
  },

  text: {
    fontSize: 12,
    alignSelf: "center"
  },

  
});