import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { timestampToDate } from "../../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExListItem from "../../components/detailsComponents/ExListItem";
import firebase from "firebase";
import { styles } from "./styles";

function WorkoutDetails(props) {
  const duration = props.route.params.workout.duration;
  const workout = props.route.params.workout;
  const date = props.route.params.workout?.date
    ? props.route.params.workout?.date
    : null;
  // const achievements = props.route.params.workout?.achievements.length || 0;
  const PBs = props.route.params?.workout.PBs || 0;
  const id = props.route.params?.id ? props.route.params?.id : "";
  const jio = props.route.params?.jio;
  const jioState = props.route.params?.workout?.jioStatus;
  const template = props.route.params?.workout?.template;
  // console.log(jioState);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        (date || template) && (
          <TouchableOpacity
            style={{ marginHorizontal: 5 }}
            onPress={date ? deleteWorkout : deleteTemplate}
          >
            <Text style={{ color: "red" }}>
              {date ? "Delete" : "Delete Template"}
            </Text>
          </TouchableOpacity>
        ),
    });
  }, []);

  const twoDigits = (num) => {
    return (num <= 9 ? "0" : "") + num;
  };

  const del = async (id) => {
    if (workout.imageURL) {
      const storageRef = firebase.storage().refFromURL(workout.imageURL);

      storageRef
        .delete()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    }

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .doc(id)
      .delete();
    props.navigation.goBack();
  };

  const delTemp = (id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("templates")
      .doc(id)
      .delete();
      props.navigation.goBack();
  };

  const deleteTemplate = () => {
    console.log(id)
    Alert.alert("Confirm Delete Template?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          delTemp(id);
        },
      },
    ]);
  };

  const deleteWorkout = () => {
    Alert.alert("Confirm Delete?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          del(id);
        },
      },
    ]);
  };

  const formatExercises = () => {
    return workout?.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({
        ...set,
        completed: false,
      })),
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scroll}>
          {workout.imageURL !== "" && (
            <Image source={{ uri: workout.imageURL }} style={styles.image} />
          )}
          <View style={styles.top}>
            <Text style={styles.title}>
              {workout.name ? workout.name : "Custom Workout"}
            </Text>
            {date && <Text>{timestampToDate(date.toDate())}</Text>}
          </View>
          <View>
            <Text
              style={[
                { paddingTop: 5, marginHorizontal: 10, fontWeight: "bold" },
              ]}
            >
              Description
            </Text>
            <Text style={styles.body}>
              {workout?.description ? workout?.description : ""}
            </Text>
          </View>

          <View style={styles.statbar}>
            <View style={styles.statbox}>
              <MaterialCommunityIcons name="timer" size={17} color="red" />
              <Text>{date ? "" : "Expected"} Duration</Text>
              <Text style={{ fontWeight: "bold" }}>
                {Math.floor(duration / 60) +
                  ":" +
                  twoDigits(Math.floor(duration % 60))}
              </Text>
            </View>
            <Divider orientation="vertical" />
            <View style={styles.statbox}>
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                size={20}
                color="blue"
              />
              <Text>Sets</Text>
              <Text>
                {workout.exercises
                  ? workout?.exercises
                      .map((exercise) => exercise.sets.length)
                      .reduce((x, y) => x + y, 0)
                  : "0"}
              </Text>
            </View>
            <Divider orientation="vertical" />
            <View style={styles.statbox}>
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={20}
                color="green"
              />
              <Text>PBs</Text>
              <Text>{PBs}</Text>
            </View>
          </View>

          {jioState && (
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text
                style={{
                  paddingTop: 5,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Workout Buddies
              </Text>
              <FlatList
                data={jioState.people}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center",
                        marginHorizontal: 15,
                      }}
                    >
                      <Image
                        source={
                          item?.photoURL
                            ? { uri: item?.photoURL }
                            : require("../../assets/user.png")
                        }
                        style={{ width: 36, height: 36, borderRadius: 18 }}
                      />
                      <Text style={{ marginTop: 3 }}>{item.name}</Text>
                    </View>
                  );
                }}
                horizontal={true}
              />
            </View>
          )}
          {workout.exercises && (
            <View style={{ marginBottom: 60 }}>
              <FlatList
                data={workout?.exercises}
                keyExtractor={(item) => item.key}
                renderItem={ExListItem}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {workout.exercises && (
        <TouchableOpacity
          onPress={() =>
            jio
              ? props.navigation.navigate("Details", {
                  exercises: workout?.exercises,
                })
              : props.navigation.navigate("Start Workout", {
                  screen: "Start Workout",
                  params: {
                    template: {
                      ...workout,
                      exercises: formatExercises(),
                    },
                  },
                })
          }
          style={styles.start}
        >
          <Text>{jio ? "Add to Jio" : "Begin Workout"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default WorkoutDetails;
