import { combineReducers } from 'redux';
import propertiesReducer from './propertiesReducer';
import savedPropertiesReducer from './savedPropertiesReducer';
import userScheduleReducer from './userScheduleReducer';
import userReducer from './userReducer';
import darkModeContextReducer from './darkModeContextReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
    properties: propertiesReducer,
    savedProperties: savedPropertiesReducer,
    userSchedule: userScheduleReducer,
    user: userReducer,
    darkModeContext: darkModeContextReducer,
    filters: filtersReducer,
});
