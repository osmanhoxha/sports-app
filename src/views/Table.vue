<template>
  <router-link class="link" :to="routePath" @click="deleteData">
    <v-btn depressed color="primary">Back</v-btn>
  </router-link>
  <div v-if="!getLeagueTable" class="table-not-found">
    <h1>
      This competition does't have a table or the league you are searching for
      doesn't exist
    </h1>
  </div>
  <table v-else>
    <caption>
      Statement Summary
    </caption>
    <thead>
      <tr>
        <th scope="col">Rank</th>
        <th scope="col">Team</th>
        <th scope="col">Last 5 Matches</th>
        <th scope="col">Played</th>
        <th scope="col">Wins</th>
        <th scope="col">Losses</th>
        <th scope="col">Draws</th>
        <th scope="col">Goals For</th>
        <th scope="col">Goals Against</th>
        <th scope="col">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in getLeagueTable" :key="item.idTeam">
        <td data-label="Rank">{{ item.intRank }}</td>
        <td data-label="Team">{{ item.strTeam }}</td>
        <td data-label="Last 5 Matches">{{ item.strForm }}</td>
        <td data-label="Played">{{ item.intPlayed }}</td>
        <td data-label="Wins">{{ item.intWin }}</td>
        <td data-label="Losses">{{ item.intLoss }}</td>
        <td data-label="Draws">{{ item.intDraw }}</td>
        <td data-label="Goals For">{{ item.intGoalsFor }}</td>
        <td data-label="Goals Againts">{{ item.intGoalsAgainst }}</td>
        <td data-label="Points">
          <strong>{{ item.intPoints }}</strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted , ref , computed} from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup(){
    const store = useStore();
    const route = useRoute();

    const getLeagueTable = computed(() => store.getters.getLeagueTable);

    onMounted(()=>{
      store.dispatch("setLeagueTable", route.params.id)
    })

    const deleteData = () => {
      store.commit("deleteTableInfo")
    }

    const routePath = ref("/league/" + route.params.id)

    return {
      getLeagueTable,
      deleteData,
      routePath
    }
  },
};
</script>

<style lang="scss" scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.25;
}
.table-not-found {
  height: 90vh;
  text-align: center;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.link {
  text-decoration: none;
  button {
    margin: 20px;
  }
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
