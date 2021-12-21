<template>
  <div class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      width="250"
      app
    >
      <v-list >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block dark color="red" @click="logout()">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app height="75px" color="white">
      <v-app-bar-nav-icon @click="burger()"></v-app-bar-nav-icon>
      <VSpacer />
      <span class="brand-text-icon">Hotel</span><span class="text-black">yuk!</span>
      <VSpacer />
      <span class="phrase pt-5">Hello <span class="brand-text-icon">{{ login_user }}</span>, Plan Your Next Stay!</span>
    </v-app-bar>
    <div class="fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>


.brand-text-icon {
  font-size: 35px;
  font-family: "Poppins", sans-serif;
  color: #001aff;
  text-decoration: none;
}

.text-black{
  font-size: 35px;
  font-family: "Poppins", sans-serif;
  color: rgb(0, 0, 77) !important;
}
</style>


<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap");
    .icon-brand{
        font-family: "Poppins";
        color: white;
    }
    
    .fullheight {
      min-height: 100vh !important;
    }

    .router {
      text-decoration: none;
      color: black;
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }

    .brand-text-icon {
        font-size: 35px;

        font-family: "Poppins", sans-serif;
        color: #001aff;
        text-decoration: none;
    }

    .text-black{

        font-size: 35px;
        font-family: "Poppins", sans-serif;
         color: rgb(0, 0, 77) !important;
    }

    .phrase{
        font-size: 20px;
        padding-bottom: 20px;
    }
</style>

<script>
export default {
  name: "DashboardLayout",
  data() {
    return {
      drawer: false,
      login_user: '',
      items: [
        { title: "Home", to: "/home", icon: 'mdi-home'},
        { title: "Profil", to: "/profil", icon: 'mdi-account-circle'},
        { title: "Reservation", to: "/reservation", icon: 'mdi-table'},
        { title: "Review", to: "/review", icon: 'mdi-star'},
      ],
    };
  },
   methods:{
     burger(){
      if (this.drawer === false) {
        this.drawer = true;
      } else if (this.drawer === true){
        this.drawer = false;
      }
     },

     logout(){
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      this.$router.push({
          name: 'Login',
      });
     }
   },
   mounted(){
     this.login_user = localStorage.getItem('username');
     
   }
};
</script>


