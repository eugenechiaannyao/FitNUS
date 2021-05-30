import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import HeaderTitle from "./pages/fitBudComponents/header";
import HistoryBar from "./pages/fitBudComponents/historyBar";
import MenuButton from "./pages/fitBudComponents/menuButton";
import FitBudSuggests from "./pages/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "./pages/fitBudComponents/workoutSearch";
import WorkoutSearchButton from "./pages/fitBudComponents/workoutSearchButton";

export default function fitBud({navigation}) {
    return (
        <View>
            <Text>FitBud</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});