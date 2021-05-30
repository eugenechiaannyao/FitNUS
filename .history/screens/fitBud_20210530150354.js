import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "firebase";
import { getUser, getUserHistory } from "../Api/userApi";
import { getWorkouts } from "../Api/workoutApi";
import {logout} from '../Api/authApi'
// import HeaderTitle from "./pages/fitBudComponents/header";
// import HistoryBar from "./pages/fitBudComponents/historyBar";
// import MenuButton from "./pages/fitBudComponents/menuButton";
// import FitBudSuggests from "./pages/fitBudComponents/fitBudSuggests";
// import WorkoutSearch from "./pages/fitBudComponents/workoutSearch";
// import WorkoutSearchButton from "./pages/fitBudComponents/workoutSearchButton";

export default function FitBud({ navigation }) {
  const [history, setHistory] = useState([])
  const [workouts, setWorkouts] = useState([])

  // get history of user
  useEffect(() => {
    const getHistory = getUserHistory()
    .onSnapshot(snapshot => {
      setHistory(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
    )})
    
    return getHistory
  }, [])

  // get workouts
  useEffect(async () => {
    const fetchWorkouts = await getWorkouts()
    .onSnapshot((querySnapshot) => {
      const workouts = [];
      querySnapshot.forEach((documentSnapshot) => {
        workouts.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setWorkouts(workouts)
    });
    console.log(workouts)
    return fetchWorkouts
  }, [])

  const addWorkout = () => {

  }

  const onLogout = () => {
    logout()
  };

  return (
    <>
      <View>
        <Text>FitBud</Text>
      </View>
      <Button title="Logout" onPress={() => onLogout()} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});