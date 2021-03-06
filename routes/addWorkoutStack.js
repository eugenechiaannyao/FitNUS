import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StartWorkout from "../screens/startworkout";
import Map from "../screens/map";
import AddExercises from "../screens/startworkout/addExercises";
import { ExerciseDetails } from "../screens/startworkout/exerciseDetails";
import EditExercise from "../screens/startworkout/editWorkout";
import workoutDetails from "../screens/workoutDetails";
import SelectWorkoutType from "../screens/startworkout/selectWorkout";
import RunMap from "../screens/startworkout/runMap";

const Stack = createStackNavigator();

const addWorkoutStack = ({ navigation, route }) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Start Workout"
          component={StartWorkout} 
        ></Stack.Screen>
        <Stack.Screen
          name="Select Workout Type"
          component={SelectWorkoutType}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Add Exercises"
          component={AddExercises}
        ></Stack.Screen>
        <Stack.Screen
          name="Exercise Details"
          component={ExerciseDetails}
        ></Stack.Screen>
        {/* pass status of exercise into map navigation to display polyline */}
        <Stack.Screen name="Map" component={Map}></Stack.Screen>
        <Stack.Screen name="Edit" component={EditExercise}></Stack.Screen>
        <Stack.Screen name="Workout Summary" component={workoutDetails} />
        <Stack.Screen name="Run Map" component={RunMap} />
      </Stack.Navigator>
    </>
  );
};

export default addWorkoutStack;
