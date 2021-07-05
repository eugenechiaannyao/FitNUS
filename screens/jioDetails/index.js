import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WorkoutSearch from "../../components/fitBudComponents/workoutSearch";
import ExListItem from "../../components/detailsComponents/ExListItem";
import { Divider } from "react-native-paper";
import firebase from "firebase";
import { styles } from "./styles";


const JioDetails = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [info, setInfo] = useState({});
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchWorkouts = firebase.firestore().collection('Workouts').onSnapshot((querySnapshot) => {
      const workouts = [];
      querySnapshot.forEach((documentSnapshot) => {
        workouts.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setInfo(props.route.params?.info);
      setWorkouts(workouts);
    });

    if (props.route.params?.exercises) {
      setDetails(props.route.params?.exercises);
    }
    return fetchWorkouts;
  }, [props.route.params?.info, props.route.params?.exercises]);

  const submitJio = async () => {
    firebase
      .firestore()
      .collection("jios")
      .add({
        ...info,
        details,
        user: firebase.auth().currentUser.uid,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
        likes: [],
      }).then(props.navigation.navigate('Main'));
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 12,
      }}
    >
      <ScrollView style={{height: '90%'}}>
        <WorkoutSearch
          navigation={props.navigation}
          workouts={workouts}
          jio={true}
        />
        <Divider style={{marginVertical: 15}}/>
        <Text style={styles.setsTitle}>
          Exercise Sets
        </Text>
        <FlatList
          data={details}
          keyExtractor={(item) => item.key}
          renderItem={ExListItem}
          scrollEnabled={false}
        />
        </ScrollView>
        {details && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => submitJio()}
          >
            <Ionicons name="add" color="blue" size={18} />
            <Text
              style={styles.addButtonText}
            >
              Add Jio
            </Text>
          </TouchableOpacity>
        )}      
    </View>
  );
};

export default JioDetails;

