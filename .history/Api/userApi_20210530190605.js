import React from "react";
import firebase from "firebase";
import { getWorkoutById } from "./workoutApi";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);
}

export function getUserHistory() {
  const hist = []
  return getUser().collection("history")
  .onSnapshot(snapshot => {
    
    snapshot.docs.map( (doc) => {
      doc.data().workoutRef.get().then(snap => {
        ref.workout = snap.data()
        
      })
      
    }
    
  )
})
}

export function addToHistory(workout) {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("history")
    .doc(workout)
    .set({
      date: Date.now(),
    });
}

export function totalCalories() {
  return getUserHistory().onSnapshot((snapshot) => {
    snapshot.docs
      .map((doc) =>
        getWorkoutById(doc.id).onSnapshot(
          (documentSnapshot) => documentSnapshot.data().calories
        )
      )
      .reduce((x, y) => x + y, 0);
  });
}