import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function EditProfile() {
    return (
        <View style={styles.container}>
            <Text>edit</Text>
            <TouchableOpacity><Image source={require("../assets/user.png")} style={styles.image} /></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    image: {
        marginBottom: 25,
        width: "25%",
        height: "15%",
        alignSelf: "center",
        borderRadius: 120,
        backgroundColor: "#D3D3D3",
      },


})