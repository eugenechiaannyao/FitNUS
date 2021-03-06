import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const JioLikes = (props) => {
  const [likes, setLikes] = useState(props.route.params?.likes || []);
  const postID = props.route.params?.postID;
  const currUserID = props.route.params?.currUserId;
  console.log(currUserID);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        postID && (
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() =>
              props.navigation.navigate("Add Users", { addToJio: true })
            }
          >
            <Text>Add Users</Text>
          </TouchableOpacity>
        ),
    });
  }, []);

  useEffect(() => {
    const user = props.route.params?.user;
    if (user) {
      if (likes.length >= 5) {
        alert(
          "Sorry! A maximum of 5 people can gather in light of Covid-19 regulations."
        );
      } else {
        const likers = likes.concat({
          name: user.data.name,
          uid: user.id,
          photoURL: user.data.photoURL,
        });
        setLikes(likers);
        updateLikes(likers);
      }
    }
  }, [props.route.params?.user]);

  const removeUser = (user) => {
    const likers = [...likes];
    const index = likes.indexOf(user);
    likers.splice(index, 1);
    setLikes(likers);

    updateLikes(likers);
  };

  const updateLikes = (data) => {
    firebase.firestore().collection("jios").doc(postID).update({
      likes: data,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem>
        <Avatar
          source={
            item?.photoURL
              ? { uri: item.photoURL }
              : require("../../../assets/user.png")
          }
          rounded={true}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        {postID && currUserID !== item.uid && (
          <TouchableOpacity onPress={() => removeUser(item)}>
            <MaterialCommunityIcons name="close" size={18} />
          </TouchableOpacity>
        )}
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data={likes}
        keyExtractor={(item) => likes.indexOf(item)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default JioLikes;
