import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";
import { getUser } from "../Api/userApi";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [photoURL, setPhoto] = useState('')

  useEffect(() => {
    const profile = getUser()
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setUser(snapshot.data());
        setName(user.name)
        setBio(user.bio)
        setPhoto(user?.photoURL)
      });
    return profile;
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require("../assets/user.png")} style={styles.image} />
        <Text style={styles.text}>edit</Text>
      </TouchableOpacity>

      <View style={styles.input}>
          <Text>Name</Text>
          <TextInput style={styles.fields} onChangeText={text => setName(name)} value={name}></TextInput>
      </View>

      <View style={styles.input}>
          <Text>Bio</Text>
          <TextInput value={bio}></TextInput>
      </View>



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
    alignSelf: "center",
  },

  input: {
      width: '80%',
      alignItems: 'flex-start',
      marginVertical: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
  },

  fields: {
      marginTop: 3
      paddingVertical: 2,
      

      
  }
});