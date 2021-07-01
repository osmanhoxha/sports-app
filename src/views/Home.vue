<template>
  <div class="card">
    <v-card
      elevation="7"
      class="card-item"
      v-for="item in getSoccerLeagues"
      :key="item.idLeague"
    >
      <v-card-title>{{ item.strLeague }}</v-card-title>
      <v-card-subtitle>{{ item.strSport }}</v-card-subtitle>
      <v-card-actions>
        <router-link
          class="link"
          :to="{ name: 'League Info', params: { id: item.idLeague } }"
        >
          <v-btn class="ma-3" outlined x-small color="secondary">
            More Info
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { onMounted , computed} from 'vue';
import { useStore } from 'vuex'

export default {
  name: "Home",
  setup(){
    const store = useStore();

    const getSoccerLeagues = computed(()=> store.getters.getSoccerLeagues);

    onMounted(()=>{
      store.dispatch("setLeagues");
    })

    return { getSoccerLeagues }
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #ece4db;
  .card-item {
    margin-bottom: 20px;
    text-align: center;
    width: 200px;
  }
  .link {
    text-decoration: none;
  }
}
</style>
