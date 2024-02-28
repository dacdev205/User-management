import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import AddUser from "@/views/AddUser.vue";
import EditUser from "@/views/EditUser.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/addUser",
        name: "addUser",
        component: AddUser,
    },
    {
        path: "/editUser/:id",
        name: "editUser",
        component: EditUser,
    },
    {
        path: "/Userdetail/:id",
        name: "userdetail",
        component: () => import("../views/UserDetail.vue"),
    },
];
const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
});
export default router;