import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import LeagueInfo from "../views/LeagueInfo.vue";
import Table from "../views/Table.vue";
import Error404 from "../views/Error404.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/league/:id",
    name: "League Info",
    component: LeagueInfo,
  },
  {
    path: "/table/:id",
    name: "League Table",
    component: Table,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
