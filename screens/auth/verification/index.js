import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { resend, deleteUser, logout } from "../../../helpers/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";

const Verification = (props) => {
  const goback = () => {
    logout()
  //   Alert.alert("Restart Verifcation?", "By doing so, your created acount will not be saved.", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     {
  //       text: "Confirm",
  //       onPress: () => {
  //         logout()
  //       }
  //     },
  //   ]);
  };

  useEffect(() => {

    setInterval(() => {
        const user = firebase.auth().currentUser
        if (user) {
          user.reload();
          if (user.emailVerified) {
            props.verify()
          }
        }
  
      }, 1000);
  }, [])

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={goback} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={17} color="lightblue" />
        <Text style={{ color: "lightblue", marginLeft: 3 }}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.info}>
        Please check your email inbox and verify your email
      </Text>
      <TouchableOpacity onPress={resend} style={styles.resendButton}>
        {/* <TextInput value={email}/> */}
        <Text>Resend Verification Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0B2A59",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    color: "gold",
    marginVertical: 30,
  },

  info: {
    color: "gold",
    marginVertical: 10,
    textAlign: 'center'
  },

  resendButton: {
    backgroundColor: "gold",
    width: "60%",
    height: "5%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 30,
  },
});
