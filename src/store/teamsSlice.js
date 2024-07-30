import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: [],
  reducers: {
    addTeam: (state, action) => {
      state.push(action.payload);
    },
    removeTeam: (state, action) => {
      return state.filter(team => team.id !== action.payload);
    },
    updateTeamName: (state, action) => {
      const team = state.find(team => team.id === action.payload.id);
      if (team) {
        team.name = action.payload.name;
      }
    },
    addPlayerToTeam: (state, action) => {
      const team = state.find(team => team.id === action.payload.teamId);
      if (team && team.players.length < 5) {
        team.players.push(action.payload.player);
      }
    },
    removePlayerFromTeam: (state, action) => {
      const team = state.find(team => team.id === action.payload.teamId);
      if (team) {
        team.players = team.players.filter(player => player.idPlayer !== action.payload.playerId);
      }
    },
  },
});

export const { addTeam, removeTeam, updateTeamName, addPlayerToTeam, removePlayerFromTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
