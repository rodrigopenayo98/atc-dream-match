import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './teamsSlice';

export default configureStore({
  reducer: {
    teams: teamsReducer,
  },
});
