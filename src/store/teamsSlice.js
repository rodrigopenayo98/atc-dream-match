import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: [],
  reducers: {
    addTeam: (state, action) => {
      if (state.length < 2) state.push(action.payload);
    },
    updateTeamName: (state, action) => {
      const { id, name } = action.payload;
      const team = state.find(team => team.id === id);
      if (team) team.name = name;
    },
    removeTeam: (state, action) => {
      return state.filter(team => team.id !== action.payload);
    },
    addPlayerToTeam: (state, action) => {
      const { teamId, player } = action.payload;
      const team = state.find(team => team.id === teamId);
      if (team && team.players.length < 5) team.players.push(player);
    }
  }
});

export const { addTeam, updateTeamName, removeTeam, addPlayerToTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
