<template>
  <div class="container">
    <router-link class="link" to="/" @click="deleteData">
      <v-btn depressed color="primary">Back</v-btn>
    </router-link>
    <!-- <div class="info">
        <img :src="getLeagueInfo?.strBanner  || getLeagueInfo?.strLogo || getLeagueInfo?.strBadge || getLeagueInfo?.strPoster" alt="">
        <h2>{{getLeagueInfo?.strLeague}}</h2>
        <p class="year">{{"Formed in " + getLeagueInfo?.intFormedYear}}</p>
        <p>{{ getLeagueInfo?.strDescriptionEN}}</p>
      </div> -->
    <v-card class="mx-auto" max-width="1200" elevation="7">
      <v-img
        :src="
          getLeagueInfo?.strBanner ||
          getLeagueInfo?.strLogo ||
          getLeagueInfo?.strBadge ||
          getLeagueInfo?.strPoster
        "
        height="500px"
      ></v-img>

      <v-card-title>
        {{ getLeagueInfo?.strLeague }}
      </v-card-title>

      <v-card-subtitle>
        {{ getLeagueInfo?.intFormedYear }}
      </v-card-subtitle>

      <v-card-actions>
        <router-link class="link" :to="routePath">
          <v-btn color="orange lighten-2" text> Standings Table </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ getLeagueInfo?.strDescriptionEN }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <div class="imgContainer">
      <img v-for="item in getFanart" :src="item" :key="item" />
    </div>
  </div>
</template>

<script>
import { onMounted , ref , computed} from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup(){
    const store = useStore();
    const route = useRoute();
    
    const getLeagueInfo = computed(() => store.getters.getLeagueInfo);
    const getFanart = computed(() => store.getters.getFanart);

    onMounted(()=>{
      store.dispatch("setLeagueInfo", route.params.id)
    })

    const deleteData = () =>{
      store.commit("deleteLeagueInfo")
    }

    const routePath = ref("/table/" + route.params.id);
    const show = ref(false);


    return {
      getLeagueInfo,
      getFanart,
      deleteData,
      routePath,
      show
    }
  },
  
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #ece4db;
}
.imgContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
  img {
    width: 450px;
    margin-bottom: 20px;
  }
}
.link {
  text-decoration: none;
  button {
    margin: 20px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  img {
    height: 300px;
    width: 1100px;
    object-fit: contain;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .year {
    margin-bottom: 20px;
    opacity: 0.6;
  }
}
</style>
