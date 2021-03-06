import React from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { setRandomColor,timestampToDate } from "../../helpers";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HistoryBar = ({ navigation, hist, runs }) => {
  const images = [
    require("../../assets/bg1.jpeg"),
    require("../../assets/bg2.jpeg"),
    require("../../assets/bg3.jpeg"),
  ];

  const histDisplay =
    hist && hist.length > 0 ? hist.slice(0, 8).concat({ end: true }) : hist;
  const runsDisplay =
    runs && runs.length > 0 ? runs.slice(0, 8).concat({ end: true }) : runs;

  const WorkoutHistBar = ({ history }) => {
    //Passed in below as runs/hist
    if (!history || history.length === 0) {
      return (
        <TouchableOpacity //if no workout created
          onPress={() =>
            navigation.navigate("Start Workout", {
              screen: "Select Workout Type",
            })
          }
          style={[styles.item, { backgroundColor: setRandomColor() }]}
        >
          <Text>Create new workout</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <>
          <FlatList
            horizontal={true}
            data={history}
            renderItem={renderItem} //Defined below
            keyExtractor={(item) => item.id}
          />
          <Divider />
        </>
      );
    }
  };

  const renderItem = ({ item }) => {
    const img = images[Math.floor(Math.random() * images.length)];
    return item.end ? (
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginHorizontal: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={{ marginLeft: 5, fontSize: 25, color: "blue" }}>
          Full History
        </Text>
        <MaterialCommunityIcons name="arrow-right" color="darkblue" size={22} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(
            item.data?.exercises ? "Workout Details" : "Run Details",
            {
              workout: item.data,
              id: item.id,
            }
          );
        }}
        style={{ borderRadius: 8 }}
      >
        <ImageBackground
          source={item.data?.imageURL ? { uri: item.data.imageURL } : img} //lags for run sometimes
          style={[styles.item]}
          imageStyle={{ borderRadius: 8 }}
          blurRadius={item.data?.imageURL && item.data?.exercises ? 5 : 0.5}
        >
          <Text style={[styles.title, styles.text]}>
            {item.data?.name ? item.data?.name : "Custom Workout"}
          </Text>
          <Text style={styles.text}>
            {item.data?.date && timestampToDate(item.data?.date.toDate())}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.barTitle}>Static Workouts</Text>
      <WorkoutHistBar history={histDisplay} />
      <Divider/>
      <Text style={styles.barTitle}>Runs</Text>
      <WorkoutHistBar history={runsDisplay} />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    flex: 1,
    width: 230,
    height: 140,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  title: {
    fontSize: 27,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 20,
    textShadowRadius: 6,
    textShadowColor: "black",
    shadowOpacity: 0.8,
  },

  barTitle: {
    marginHorizontal: 15,
    marginTop: 15,
    fontSize: 17,
  },
});

export default HistoryBar;
