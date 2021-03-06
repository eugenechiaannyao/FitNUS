import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";
import { getCat } from "../../../helpers";
import { Divider } from "react-native-elements";
import { styles } from "./styles";

export default function AddExercises(props) {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [replace, setReplace] = useState(false);

  const onChangeSearch = (text) => {
    if (text) {
      const results = exercises.filter((item) => {
        const reference = item.data.name.toUpperCase();
        return reference.indexOf(text.toUpperCase()) > -1;
      });
      setFiltered(results);
      setSearchQuery(text);
    } else {
      setFiltered(exercises);
      setSearchQuery("");
    }
  };

  const selectExercise = (exercise) => {
    let data = [...selected];
    if (selected.includes(exercise)) {
      const index = data.indexOf(exercise);
      data.splice(index, 1);
    } else {
      data = data.concat(exercise);
    }
    setSelected(data);
    console.log(selected);
    if (replace) {
      addToWorkout(data);
    }
  };

  const addToWorkout = (data = selected) => {
    Alert.alert("Confirm changes?", "Cancel if unfinished", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Confirm", onPress: () => confirmSubmit(data) },
    ]);
  };

  const confirmSubmit = (data) => {
    props.navigation.navigate({
      name: props.route.params?.dashboard ? "Tracker" : "Start Workout",
      params: { exercises: data, replace: replace },
      merge: true,
    });
  };

  const renderItem = ({ item }) => {
    const check = selected.includes(item);

    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 2,
          backgroundColor: check ? "azure" : "whitesmoke",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            props.navigation.navigate("Exercise Details", { exercise: item })
          }
        >
          <Image
            source={
              item.data.photo
                ? { uri: item.data.photo }
                : require("../../../assets/boxing.jpeg")
            }
            style={styles.image}
          />
          <View style={styles.searchResult}>
            <Text>{item.data.name}</Text>
            <Text style={{ fontSize: 12 }}>{getCat(item.data.category)}</Text>
          </View>
        </TouchableOpacity>
        <CheckBox center checked={check} onPress={() => selectExercise(item)} />
      </View>
    );
  };

  useEffect(() => {
    const fetchExercises = firebase
      .firestore()
      .collection("exercise")
      .orderBy("name")
      .onSnapshot((querySnapshot) => {
        const complete = [];
        querySnapshot.forEach((documentSnapshot) => {
          complete.push({
            key: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setExercises(complete);
        setFiltered(complete);
      });

    return fetchExercises;
  }, []);

  useEffect(() => {
    if (props.route.params?.item) {
      setReplace(true);
      console.log(replace);
    }
  }, [props.route.params?.item]);

  return (
    <SafeAreaView style={{ marginHorizontal: 10, marginBottom: 130 }}>
      <View>
        <Searchbar
          placeholder="Choose exercises"
          theme={{ roundness: 10 }}
          style={styles.searchBar}
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        extraData={selected}
        ItemSeparatorComponent={() => <Divider />}
      />
      <TouchableOpacity style={styles.addAll} onPress={() => addToWorkout()}>
        <Text>
          {props.route.params?.dashboard
            ? "Add to Tracker "
            : "Add to Workout "}
          ({selected.length})
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

