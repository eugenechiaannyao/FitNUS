import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  SectionList,
} from "react-native";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
import firebase from "firebase";
import { logout } from "../../helpers/auth";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

//Achivement imports
import {
  getCurrWeek,
  reloadPeriod,
  getRunStats,
  getStats,
  reloadRunPeriod,
  withinPeriod,
} from "../../helpers/profile";
import { returnAccruedTemp, returnSingleTemp } from "./achievements";
import {
  addToAccruedAchievements,
  addToSingleAchievements,
} from "../../store/actions/achievements";
import achListItem from "../../components/achievementsComponents/achListItem";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState(false);
  const [following, setFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);
  const [userId, setUserId] = useState("");
  //Achivements state
  const [thisWeek, setWeek] = useState(getCurrWeek());
  const [combinedList, setCombinedList] = useState(null);

  //for other user
  const [singleOther, setSingleOther] = useState([]);
  const [accruedOther, setAccruedOther] = useState([]);
  const [pulls, setPulls] = useState(0);

  //achievements functions
  //Update accrued periodList
  const updateAccruedAchievement = async (id, newList) => {
    //
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("accruedAchievements")
      .doc(id)
      .update({
        periodList: newList,
      });
  };

  //Achievements stuff
  useEffect(() => {
    if (curr) {
      //getWeek first -> Done in intial state alr

      //Fetch run, workout stats -> Overall and week.
      //Overall
      const overallRun = props.runs
        ? getRunStats(props.runs.map((doc) => doc.data))
        : null;
      //return object{distance duration, longest, no.}
      const overallWorkout =
        props.history && getStats(props.history.map((doc) => doc.data));
      //returns object{duration, sets, no.}
      //Week
      const runWeek = props.runs ? reloadRunPeriod(thisWeek, props.runs) : null;

      const workoutWeek = props.history
        ? reloadPeriod(thisWeek, props.history)
        : null;

      //Check if workout stats meet criteria -> week - accrued
      const accruedList = returnAccruedTemp(
        props.currentUser?.distanceGoal,
        props.currentUser?.durationGoal,
        runWeek,
        workoutWeek
      );

      //Update accruedAchivements in database
      if (props?.accruedAchievements?.length === 0) {
        setWeek(getCurrWeek());
        accruedList.forEach((temp) => {
          const tempAch = {
            id: temp.id,
            title: temp.title,
            description: temp.description,
            cat: temp.cat,
            periodList: [getCurrWeek()],
          };
          props.addToAccrued(tempAch);
        });
      } else {
        accruedList.forEach((temp) => {
          props?.accruedAchievements.forEach((saved) => {
            if (temp.id === saved?.data.id && saved?.data.periodList) {
              //console.log(new Date(saved.data.periodList[0].end.seconds * 1000))
              const pList = saved?.data.periodList;
              if (withinPeriod(new Date(), pList[pList.length - 1])) {
                //continue;
              } else {
                //add thisWeek to saved periodList
                //update saved
                setWeek(getCurrWeek());
                const newList = saved?.data.periodList.concat([getCurrWeek()]);
                updateAccruedAchievement(saved?.id, newList);
              }
            }
          });
        });
      }

      //check if workout stats meet criteria -> overall - accrued
      const singleList = returnSingleTemp(overallRun, overallWorkout);
      //Update singleAchivements in database
      if (props?.singleAchievements?.length === 0) {
        singleList.forEach((temp) => {
          const tempAch = {
            id: temp.id,
            title: temp.title,
            description: temp.description,
            cat: temp.cat,
            criteria: true,
          };
          props.addToSingle(tempAch);
        });
      } else {
        if (singleList.length > props?.singleAchievements.length) {
          let toAdd = singleList.filter((item) => {
            return props?.singleAchievements.some((data) => {
              return !data.data.id === item.id;
            });
          });
          toAdd.forEach((temp) => {
            const tempAch = {
              id: temp.id,
              title: temp.title,
              description: temp.description,
              cat: temp.cat,
              criteria: true,
            };
            props.addToSingle(tempAch);
          });
        }
      }

      setCombinedList(
        props.accruedAchievements.length > 0 &&
          props.singleAchievements.length > 0
          ? [
              {
                title: "Stacked Achivements",
                data: props.accruedAchievements,
              },
              {
                title: "Milestones",
                data: props.singleAchievements,
              },
            ]
          : props.accruedAchievements.length > 0
          ? [
              {
                title: "Stacked Achivements",
                data: props.accruedAchievements,
              },
            ]
          : props.singleAchievements.length > 0
          ? [
              {
                title: "Milestones",
                data: props.singleAchievements,
              },
            ]
          : []
      );
    } else {
      if (pulls < 3) {
        setPulls(pulls + 1)
        //get Single and Accrued from other user
        const getUserAccruedAchievements = async (uid) => {
          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("accruedAchievements")
            .get()
            .then((snapshot) => {
              const accruedAchievements = [];
              snapshot.docs.forEach((doc) =>
                accruedAchievements.push({ id: doc.id, data: doc.data() })
              );
              setAccruedOther(accruedAchievements);
            });
        };

        const getUserSingleAchievements = async (uid) => {
          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("singleAchievements")
            .get()
            .then((snapshot) => {
              const singleAchievements = [];
              snapshot.docs.forEach((doc) =>
                singleAchievements.push({ id: doc.id, data: doc.data() })
              );
              setSingleOther(singleAchievements);
            });
        };
        
        const uid = props.route.params?.user.id;

        getUserAccruedAchievements(uid);
        getUserSingleAchievements(uid);

        setCombinedList(
          accruedOther.length > 0 && singleOther.length > 0
            ? [
                {
                  title: "Stacked Achivements",
                  data: accruedOther,
                },
                {
                  title: "Milestones",
                  data: singleOther,
                },
              ]
            : accruedOther.length > 0
            ? [
                {
                  title: "Stacked Achivements",
                  data: accruedOther,
                },
              ]
            : singleOther.length > 0
            ? [
                {
                  title: "Milestones",
                  data: singleOther,
                },
              ]
            : []
        );
      }
    }
  }, [
    props.runs,
    props.history,
    props.accruedAchievements,
    props.singleAchievements,
    singleOther,
    accruedOther,
  ]);

  const emptyList = () => {
    return (
      <View>
        <Text style={{ fontSize: 22, fontWeight: "bold", padding: 10 }}>
          Achievements? Zero!
        </Text>
        <TouchableOpacity
          onPress={() =>
            curr && props.navigation.navigate("Start Workout", {
              screen: "Select Workout Type",
            })
          }
          style={{
            borderRadius: 5,
            backgroundColor: "white",
            marginVertical: 5,
            borderColor: "gray",
            borderWidth: 1,
            flexDirection: "row",
            height: 120,
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <View style={{ paddingLeft: 10, alignSelf: "center" }}>
            <MaterialCommunityIcons name="baguette" size={24} color="#C68958" />
          </View>
          <View style={{ paddingTop: 12, paddingLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Loaf</Text>
            <Text
              style={{
                paddingTop: 2,
                paddingRight: 50,
              }}
            >
              Your achivements list is looking slightly empty... That bread,
              let's get it!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (props.route.params?.user) {
        //over here
        const uid = props.route.params?.user.id;
        await fetchfollowData(uid);
        setCurr(uid === firebase.auth().currentUser.uid);
        setUserId(uid);
        setUser(props.route.params?.user.data);
        setLoading(false);
        if (props.following.indexOf(uid) > -1) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      } else {
        setUser(props.currentUser);

        setCurr(true);
        setNumFollowing(props.following.length);
        setNumFollowers(props.followers.length);
        setUserId(firebase.auth().currentUser.uid);

        setLoading(false);

        props.navigation.setOptions({
          headerRight: () => (
            <Text onPress={logout} style={styles.delete}>
              Logout
            </Text>
          ),
        });
      }
    };

    fetchUser();
  }, [
    props.currentUser,
    props.following,
    props.followers,
    props.route.params?.user,
  ]);

  const fetchfollowData = async (uid) => {
    const ref = await firebase.firestore().collection("users").doc(uid);
    ref.collection("following").onSnapshot((snapshot) => {
      let following = [];
      snapshot.docs.forEach((doc) => {
        following.push(doc.id);
      });
      setNumFollowing(following.length);
    });

    ref.collection("followers").onSnapshot((snapshot) => {
      let followers = [];
      snapshot.docs.forEach((doc) => {
        followers.push(doc.id);
      });
      setNumFollowers(followers.length);
    });
  };

  const follow = async () => {
    const dateFollowed = firebase.firestore.FieldValue.serverTimestamp();
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("following")
      .doc(userId)
      .set({
        dateFollowed,
      });

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("followers")
      .doc(firebase.auth().currentUser.uid)
      .set({ dateFollowed });
  };

  const unfollow = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("following")
      .doc(userId)
      .delete();

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("followers")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return user ? (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/user.png")
          }
          style={styles.image}
        />
        <Text style={styles.text}>{user.name}</Text>
        <Text>{curr && user.email}</Text>

        <View style={styles.followers}>
          <Divider orientation="vertical" />
          <View
            style={{
              width: "36%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {numFollowers}
            </Text>
            <Text>Followers</Text>
          </View>
          <Divider orientation="vertical" />
          <View
            style={{
              width: "36%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {numFollowing}
            </Text>
            <Text>Following</Text>
          </View>
          <Divider orientation="vertical" />
        </View>

        <Text style={styles.bio}>{user?.bio}</Text>

        {curr && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              props.navigation.navigate("Edit Profile", {
                user,
              })
            }
          >
            <Text>Edit profile</Text>
          </TouchableOpacity>
        )}

        {!curr && !following && (
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: "royalblue" }]}
            onPress={() => follow()}
          >
            <Text style={{ color: "whitesmoke" }}>Follow</Text>
          </TouchableOpacity>
        )}

        {!curr && following && (
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: "silver" }]}
            onPress={() => unfollow()}
          >
            <Text>Unfollow</Text>
          </TouchableOpacity>
        )}
        <View style={styles.divider}></View>
        <View style={styles.achievementMaster}>
          <SectionList
            sections={combinedList}
            keyExtractor={(item) => item.id}
            renderItem={achListItem}
            ListEmptyComponent={emptyList}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontSize: 22, fontWeight: "bold", padding: 10 }}>
                {title}:
              </Text>
            )}
          />
        </View>
      </View>
    </ScrollView>
  ) : (
    <View>
      <Spinner />
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  following: store.user.following,
  followers: store.user.followers,
  history: store.history.workouts,
  runs: store.history.runs,
  accruedAchievements: store.achievements.accruedAchievements,
  singleAchievements: store.achievements.singleAchievements,
});

const mapDispatchToProps = (dispatch) => ({
  addToAccrued: (accrued) => dispatch(addToAccruedAchievements(accrued)),
  addToSingle: (single) => dispatch(addToSingleAchievements(single)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
