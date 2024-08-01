import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('teams');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('teams', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState: loadState(),
  reducers: {
    addTeam(state, action) {
      state.push(action.payload);
      saveState(state);
    },
    updateTeam(state, action) {
      const index = state.findIndex(team => team.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveState(state);
      }
    }
  }
});

export const { addTeam, updateTeam } = teamsSlice.actions;
export default teamsSlice.reducer;

