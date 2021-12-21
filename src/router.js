import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/login",
      component: importComponent("DashboardLayout"),
      children: [
        //Home
        {
          path: "/home",
          name: "Home",
          meta: { title: "Home" },
          component: importComponent("Home"),
        },

        //Reservation
        {
          path: "/reservation",
          name: "Reservation",
          meta: { title: "Reservation" },
          component: importComponent("DataMaster/Reservation"),
        },

        //Profil
        {
          path: "/profil",
          name: "Profil",
          meta: { title: "Profil" },
          component: importComponent("DataMaster/Profil"),
        },
        //Review
        {
          path: "/review",
          name: "Review",
          meta: { title: "Review" },
          component: importComponent("DataMaster/Review"),
        }
      ],
    },

    //Login
    {
      path: "/login",
      name: "Login",
      meta: { title: "Login" },
      component: importComponent("Login"),
    },
    //Register
    {
      path: "/register",
      name: "Register",
      meta: { title: "Register" },
      component: importComponent("Register"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
