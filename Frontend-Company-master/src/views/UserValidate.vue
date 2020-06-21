<template>
<body>
  <SideBar></SideBar>
  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Validate Users</h1>
    <br />

    <!--  -->
    <!--  -->
    <div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Credit</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-if="filteredCompaniesFunc != 0" -->

          <tr v-for="(user,i) in users" :key="i">
            <th>
              <figure class="image is-32x32">
                <img :src="user.image" />
              </figure>
            </th>
            <th>{{user.idUser}}</th>
            <th>{{user.username}}</th>

            <th>{{user.name}}</th>
            <th>{{user.email}}</th>
            <th>{{user.credit}}</th>
            <th>{{user.points}}</th>
            <th width="15%">
              <button
                class="button is-success"
                style="width: 50px"
                @click="acceptUser(user.name,user.idUser, i)"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                class="button is-danger is-light"
                style="margin-left: 10px; width: 50px"
                @click="deleteUser(user.name,user.idUser, i)"
              >
                <i class="fas fa-times"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table -->
  </section>
</body>
</template>

<script>
import SideBar from "../components/sideBar";
//Axios
import { getAllUsers, validateUser, removeUser } from "../API/apiUser";

import { ToastProgrammatic as toast } from "buefy";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    acceptUser(name, id, pos) {
      this.$buefy.dialog.confirm({
        title: "Confirm " + name,
        message: "Are you sure you want to confirm this account: " + name + "?",
        confirmText: "Validate Account",
        type: "is-success",
        hasIcon: true,
        onConfirm: () => {
             /* eslint-disable */
             console.log(id)
          validateUser(id)
            .then(() => {
              toast.open({
                type: "is-success",
                message: name + " validated"
              });

              this.users.splice(pos, 1);
            })
            .catch(error => {
              toast.open({
                message: error,
                type: "is-danger"
              });
            });
        }
      });
    },
    deleteUser(name, id, pos) {
      this.$buefy.dialog.confirm({
        title: "Delete " + name,
        message:
          "Are you sure you want to not confirm this account: " +
          name +
          "? The user will be deleted",
        confirmText: "Delete User",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          removeUser(id)
            .then(() => {
              toast.open({
                type: "is-warning",
                message: name + " deleted"
              });

              this.users.splice(pos, 1);
            })
            .catch(error => {
              toast.open({
                message: error,
                type: "is-danger"
              });
            });
        }
      });
    }
  },
  created() {
    getAllUsers().then(response => {
      this.users = response.data.data;
      this.users = this.users.filter(user => {
        if (user.verified == 0) {
          return true;
        } else {
          return false;
        }
      });
      /* eslint-disable */
      console.log(this.users);
    });
  }
};
</script>