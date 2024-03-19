import Vue from "vue";
import VueRouter from "vue-router";
import NotesPage from "@/views/NotesPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "NotesPage",
    component: NotesPage,
  },
  {
    path: "/note/:id",
    name: "NoteDetail",
    component: () => import("../views/NoteDetail.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
