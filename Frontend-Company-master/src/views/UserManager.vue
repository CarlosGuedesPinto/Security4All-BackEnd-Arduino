<template>
<body>
  <SideBar></SideBar>

  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Manage Users</h1>
    <br />
    <div class="level">
      <div class="level-left">
        <div class="columns">
          <div class="column is-8">
            <!-- Search bar -->
            <b-autocomplete
              expanded
              v-model="inputSearch"
              placeholder="Search for username"
              icon="search"
              icon-pack="fas"
              type="search"
              @select="option => this.selected = option"
            ></b-autocomplete>
          </div>
          <div class="column is-4">
            <b-select
              v-model="filterSelected"
              placeholder="Filter by..."
              icon="sort"
              icon-pack="fas"
              expanded
            >
              <option value="1">By Id</option>
              <option value="2">Alphabetical order</option>
              <option value="3">More points first</option>
              <option value="4">More credit first</option>
            </b-select>
          </div>
          <div class="column is-2">
            <nav class="level">
              <div class="level-left">
                <button
                  class="button isSecondaryBGColor has-text-white"
                  @click="filteredUsersFunc()"
                  expanded
                >Search</button>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button
                    class="button isOurGrey has-text-white"
                    @click="() =>{inputSearch = '';filterSelected = 1; filteredUsersFunc()}"
                  >
                    <i class="fas fa-eraser"></i>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div class="level-right">
        <p>Vistas</p>
        <a
          class="button"
          @click="pageActive(1)"
          style="margin-right: 5px; margin-left: 10px"
          v-bind:style="isActive(1)"
        >
          <span class="icon is-small">
            <i class="fas fa-table"></i>
          </span>
        </a>

        <a class="button" @click="pageActive(2)" v-bind:style="isActive(2)">
          <span class="icon is-small">
            <i class="fas fa-address-card"></i>
          </span>
        </a>
      </div>
    </div>
    <!-- Cards -->
    <div class="columns is-multiline" v-if="view==2">
      <div class="column is-6-desktop" v-for="(user,i) in filteredUsers" :key="i">
        <div class="card cardTheHover">
          <div class="card-content">
            <div class="media">
              <div class="media-left is-2" style="margin-top: 12px;margin-left: 12px ">
                <figure class="image is-64x64">
                  <img :src="user.image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content" style="margin-top: 12px">
                <p class="title is-4">{{user.username}}</p>
                <p>Points: {{user.points}}</p>
                <p>Credit: {{user.credit}}</p>
              </div>
              <div class="media-right" style="margin-top: 12px">
                <button class="button is-danger is-fullwidth is-light" v-if="user.disabled==0" @click="blockButton(1, user.username, user.idUser, i)">
                  <i class="fas fa-ban"></i>
                </button>
                <button class="button is-link is-fullwidth is-light" v-if="user.disabled==1" @click="blockButton(0, user.username, user.idUser, i)">
                  <i class="fas fa-unlock"></i>
                </button>
                <br />
                <button class="button is-warning is-fullwidth is-light" v-if="user.idType == 1"  @click="adminButton(2, user.username, user.idUser, i)">
                  <i class="fas fa-user"></i>
                </button>
                <button class="button is-success is-fullwidth is-light" v-if="user.idType == 2"  @click="adminButton(1, user.username, user.idUser, i)">
                  <i class="fas fa-users-cog"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <div v-if="view==1">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>Username</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Credit</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-if="filteredCompaniesFunc != 0" -->

          <tr v-for="(user,i) in filteredUsers" :key="i">
            <th>
              <figure class="image is-32x32">
                <img :src="user.image" />
              </figure>
            </th>
            <th>{{user.idUser}}</th>
            <th>{{user.username}}</th>
            <th>{{user.name}}</th>
            <th>{{user.idType}}</th>
            <th v-if="user.disabled==1">Blocked</th>
            <th v-if="user.disabled==0">Active</th>
            <th>{{user.credit}}</th>
            <th>{{user.points}}</th>
            <th width="20%">
              <button class="button is-info" style="width: 50px" @click="infoButton(i)">
                <i class="fas fa-info-circle"></i>
              </button>
              <button
                class="button is-info is-light"
                v-if="user.disabled==1"
                style="margin-left: 10px; width: 50px"
                @click="blockButton(0, user.username, user.idUser, i)"
              >
                <i class="fas fa-unlock" ></i>
              </button>
              <button
                class="button is-danger is-light"
                v-if="user.disabled==0"
                style="margin-left: 10px; width: 50px"
                @click="blockButton(1, user.username, user.idUser, i)"
              >
                <i class="fas fa-ban"></i>
              </button>
              <button
                class="button is-warning is-light"
                v-if="user.idType == 1"
                style="margin-left: 10px; width: 50px"
                @click="adminButton(2, user.username, user.idUser, i)"
              >
                <i class="fas fa-user"></i>
              </button>
              <button
                class="button is-success is-light"
                v-if="user.idType == 2"
                style="margin-left: 10px; width: 50px"
                @click="adminButton(1, user.username, user.idUser, i)"
              >
                <i class="fas fa-users-cog"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table -->
  </section>

  <!-- Modal -->
  <b-modal :active.sync="infoModal" has-modal-card>
    <form action>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="column modal-title">
            <p class="modal-card-title">{{users[infoPos].name}} info</p>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-4">
              <img :src="users[infoPos].image" />
            </div>
            <div class="column is-8">
              <p>
                Name:
                <b>{{users[infoPos].name}}</b>
              </p>
              <p>
                Username:
                <b>{{users[infoPos].username}}</b>
              </p>
              <p>
                Adress:
                <b>{{users[infoPos]. taxAdress}}</b>
              </p>
              <p>
                Postal-code:
                <b>{{users[infoPos].taxZipCode}}</b>
              </p>
              <p>
                NIF:
                <b>{{users[infoPos].nif}}</b>
              </p>
              <p>
                Email:
                <b>{{users[infoPos].email}}</b>
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-pulled-right" type="button" @click="infoModal = false">Close</button>
        </footer>
      </div>
    </form>
  </b-modal>
</body>
</template>

<script>
import SideBar from "../components/sideBar";

//Axios
import { getAllUsers, AdminUser, blockUser } from "../API/apiUser";

import { ToastProgrammatic as toast } from "buefy";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      users: [],
      inputSearch: "",
      view: 2,
      filterSelected: 1,
      filteredUsers: [],
      infoModal: false,
      infoPos: 0
    };
  },
  methods: {
    infoButton(pos) {
      this.infoPos = pos;
      this.infoModal = true;
    },
    blockButton(action, name, id, pos) {
      if (action == 1) {
        this.$buefy.dialog.confirm({
          title: "Block " + name,
          message: "Are you sure you want to  <b>block</b> " + name + "?",
          confirmText: "Block User",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => {
            blockUser(id, { disabled: action })
              .then(() => {
                toast.open({
                  type: "is-warning",
                  message: name + " was blocked"
                });

                this.users[pos].disabled = action;

              })
              .catch(error => {
                toast.open({
                  message: error,
                  type: "is-danger"
                });
              });
          }
        });
      } else if (action == 0) {
        this.$buefy.dialog.confirm({
          title: "Unblock " + name,
          message: "Are you sure you want to <b>unblock</b> " + name + "?",
          confirmText: "Unblock",
          type: "is-warning",
          hasIcon: true,
          onConfirm: () => {
            blockUser(id, { disabled: action })
              .then(() => {
                toast.open({
                  type: "is-warning",
                  message: name + " is now free"
                });

                this.users[pos].disabled = action;

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
    adminButton(action, name, id, pos) {
      if (action == 2) {
        this.$buefy.dialog.confirm({
          title: "Demote " + name,
          message:
            "Are you sure you want to take off <b>admin privileges</b> to" +
            name +
            "?",
          confirmText: "Demote admin",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => {
            AdminUser(id, { idType: action })
              .then(() => {
                toast.open({
                  type: "is-warning",
                  message: name + " was demoted"
                });

                this.users[pos].idType = action;

              })
              .catch(error => {
                toast.open({
                  message: error,
                  type: "is-danger"
                });
              });
          }
        });
      } else if (action == 1) {
        this.$buefy.dialog.confirm({
          title: "Give admin to " + name,
          message:
            "Are you sure you want to give <b>admin privileges</b> to" +
            name +
            "?",
          confirmText: "Give admin",
          type: "is-warning",
          hasIcon: true,
          onConfirm: () => {
            AdminUser(id, { idType: action })
              .then(() => {
                toast.open({
                  type: "is-warning",
                  message: name + " is now a admin"
                });

                this.users[pos].idType = action;

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
    filteredUsersFunc() {
      if (this.users) {
        //Search for words
        this.filteredUsers = this.users.filter(user => {
          return (
            user.username
              .toString()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(this.inputSearch.toLowerCase()) >= 0
          );
        });
      }
      /* eslint-disable */
      console.log(this.filterSelected);

      //Filter
      if (this.filterSelected == 1) {
        this.filteredUsers = this.filteredUsers.sort((a, b) =>
          a.idUser > b.idUser ? 1 : b.idUser > a.idUser ? -1 : 0
        );
      } else if (this.filterSelected == 2) {
        this.filteredUsers = this.filteredUsers.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      } else if (this.filterSelected == 3) {
        this.filteredUsers = this.filteredUsers.sort((b, a) =>
          a.points > b.points ? 1 : b.points > a.points ? -1 : 0
        );
      } else if (this.filterSelected == 4) {
        this.filteredUsers = this.filteredUsers.sort((b, a) =>
          a.credit > b.credit ? 1 : b.credit > a.credit ? -1 : 0
        );
      }
    },
    pageActive(n) {
      if (n == 1) {
        this.view = 1;
      } else if (n == 2) {
        this.view = 2;
      }
      localStorage.setItem("UserManager", this.view);
    },
    isActive(n) {
      return n == this.view
        ? { "background-color": "#F2F2F2" }
        : { "background-color": "white" };
    }
  },
  created() {
    if (localStorage.getItem("UserManager")) {
      this.view = localStorage.getItem("UserManager");
    }
    getAllUsers().then(response => {
      this.users = response.data.data;
      this.users = this.users.filter(user => {
        if (user.verified == 1) {
          return true;
        } else {
          return false;
        }
      });
      this.filteredUsers = this.users;
    });
  }
};
</script>

<style>
</style>