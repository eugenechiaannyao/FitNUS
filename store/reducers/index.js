import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { historyReducer } from "./history";
import { templatesReducer } from "./templates";
import { jioReducer } from "./jios";
import { combineReducers } from "redux";
import { achievementsReducer } from "./achievements";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    history: historyReducer,
    jios: jioReducer,
    templates: templatesReducer,
    achievements: achievementsReducer
})

export default rootReducer