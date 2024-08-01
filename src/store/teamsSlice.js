import { createSlice } from '@reduxjs/toolkit';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: [],
  reducers: {
    addTeam(state, action) {
      state.push(action.payload);
    },
    updateTeam(state, action) {
      const index = state.findIndex(team => team.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addTeam, updateTeam } = teamsSlice.actions;
export default teamsSlice.reducer;

