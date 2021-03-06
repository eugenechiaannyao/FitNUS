import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  fetchFeed,
  fetchCompleted,
  fetchUpcoming,
} from "../store/actions/jios";

import JioTabs from "./jioTabs";
import profile from "../screens/profile";
import JioStart from '../screens/jio/Start'
import JioDetails from '../screens/jio/Details'
import workoutDetails from "../screens/workoutDetails";
import AddExercises from "../screens/startworkout/addExercises";
import EditExercise from "../screens/startworkout/editWorkout";
import JioSearch from '../screens/jio/Search'
import JioLikes from '../screens/jio/Likes'
import PostPage from '../screens/jio/PostPage'

const Stack = createStackNavigator();

const JioStack = (props) => {
  useEffect(() => {
    props.getFeed();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerStyle: { backgroundColor: "powderblue" } }}
    >
      <Stack.Screen
        name="Main"
        component={JioTabs}
        options={{
          headerTitle: "Jio",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Start Jio")}
              style={{ marginRight: 10, flexDirection: "row" }}
            >
              <MaterialCommunityIcons name="plus-thick" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Add Users" component={JioSearch} />
      <Stack.Screen name="Likes" component={JioLikes} />
      <Stack.Screen name="Profile" component={profile} />
      <Stack.Screen name="Post" component={PostPage} />
      <Stack.Screen name="Start Jio" component={JioStart} />
      <Stack.Screen name="Details" component={JioDetails} />
      <Stack.Screen name="Workout Details" component={workoutDetails} />
      <Stack.Screen name="Add Exercises" component={AddExercises} />
      <Stack.Screen name="Edit Set" component={EditExercise} />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(fetchFeed()),
  getUpcoming: () => dispatch(fetchUpcoming()),
  getCompleted: () => dispatch(fetchCompleted()),
});

export default connect(null, mapDispatchToProps)(JioStack);
