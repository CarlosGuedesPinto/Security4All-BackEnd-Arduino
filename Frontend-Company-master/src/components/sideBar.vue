<template>
  <aside class="menu column is-2 section isSecondaryBGColor is-fullheight SideBar">
    <p class="is-size-4 isPrimaryColor has-text-centered">Admin</p>
  <p class="menu-label pWhite is-size-6">
    General
  </p>
  <ul class="menu-list">
    <li><a class="aWhite has-tooltip-right" v-bind:class="(page==0)? 'is-active':''" @click="goTo('/dashboard',0)" data-tooltip="Tooltip Text">Dashboard</a></li>
  </ul>
  <p class="menu-label pWhite is-size-6">
    Administration
  </p>
  <ul class="menu-list">
    <li><a class="aWhite" @click="goTo('/admin/requests',1)" v-bind:class="(page==1)? 'is-active':''">Validate installation req</a></li>
    <li><a class="aWhite" @click="goTo('/admin/subscription',2)" v-bind:class="(page==2)? 'is-active':''">Subscription packages</a></li>
    <li><a class="aWhite" @click="goTo('/admin/gamification',3)" v-bind:class="(page==3)? 'is-active':''">Gamification</a></li>
  </ul>
  <p class="menu-label pWhite is-size-6">
    Sensors
  </p>
  <ul class="menu-list">
    <li><a class="aWhite" @click="goTo('/sensor/new',4)" v-bind:class="(page==4)? 'is-active':''">New Sensor</a></li>
    <li><a class="aWhite" @click="goTo('/sensor/manager',5)" v-bind:class="(page==5)? 'is-active':''" >Manage Sensors</a></li>
    <li><a class="aWhite" @click="goTo('/sensor/orders',6)" v-bind:class="(page==6)? 'is-active':''">Orders</a></li>
  </ul>
  <p class="menu-label pWhite is-size-6">
    Users
  </p>
  <ul class="menu-list">
    <li><a class="aWhite" @click="goTo('/user/validate',7)" v-bind:class="(page==7)? 'is-active':''">Validate Users</a></li>
    <li><a class="aWhite" @click="goTo('/user/manager',8)" v-bind:class="(page==8)? 'is-active':''">Manage Users</a></li>
  </ul>
  <br>
  <p class="menu-label pWhite is-size-6 primaryHover exit" @click="goTo('/', 0);localStorage.removeItem('token');localStorage.removeItem('user');axios.defaults.headers.common['x-access-token'] = ''">
    <i class="fas fa-sign-out-alt"></i> Sign out
  </p>
</aside>
</template>

<style >

.pWhite {
  color: hsl(0, 0%, 96%) !important;
}

.aWhite {
  color: hsl(0, 0%, 70%) !important;
}

.SideBar {
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}

</style>

<script>

export default {
  name: "Sidebar",
  data() {
    return {
      page: 0
    };
  },
  created() {
    if(localStorage.getItem("page")){
      this.page = localStorage.getItem("page");
    }
    
  },
  methods: {
    goTo(path,page) {
      localStorage.setItem("page", page);
      this.$router.push(path);
    }
  }
}
</script>

<style >

.exit:hover {
  color: #FFBF2F !important;
}

</style>