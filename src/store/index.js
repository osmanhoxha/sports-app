import { createStore } from "vuex";

export default createStore({
  state: {
    leagues: [],
    soccerLeagues: [],
    leagueInfo: [],
    fanart: [],
    leagueTable: [],
  },
  mutations: {
    setLeagues(state, payload) {
      state.leagues.push(payload);
    },
    setLeagueInfo(state, payload) {
      state.leagueInfo = [payload];
    },
    deleteLeagueInfo(state) {
      state.leagueInfo = [];
    },
    setLeagueTable(state, payload) {
      state.leagueTable = [payload];
    },
    deleteTableInfo(state) {
      state.leagueTable = [];
    },
  },
  actions: {
    async setLeagues(state) {
      const getLeagues = await fetch(
        "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php"
      );
      const res = await getLeagues.json();

      state.commit("setLeagues", res.leagues);
    },
    async setLeagueInfo(state, payload) {
      const getLeagueInfo = await fetch(
        `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${payload}`
      );
      const res = await getLeagueInfo.json();

      state.commit("setLeagueInfo", res);
    },
    async setLeagueTable(state, payload) {
      const getLeagueTable = await fetch(
        `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${payload}&s=2020-2021`
      );
      const res = await getLeagueTable.json();

      state.commit("setLeagueTable", res);
    },
  },
  modules: {},
  getters: {
    getSoccerLeagues: (state) => {
      for (let i = 0; i < state.leagues.length; i++) {
        return state.leagues[i].filter(
          (item) =>
            item.strSport == "Soccer" &&
            item.strLeague != "_No League" &&
            item.strLeague != "_Defunct Soccer Teams" &&
            item.strLeague != "_No League Soccer"
        );
      }
    },
    getLeagueInfo: (state) => state.leagueInfo[0]?.leagues[0],
    getFanart: (state) => {
      for (let i = 1; i < 5; i++) {
        if (state.leagueInfo) {
          const fanart = state.leagueInfo[0]?.leagues[0]["strFanart" + i];
          state.fanart[i - 1] = fanart;
        }
      }
      return state.fanart;
    },
    getLeagueTable: (state) => {
      return state.leagueTable[0]?.table;
    },
  },
});
