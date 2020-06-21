<template>
<body>
  <SideBar></SideBar>

  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Gamification</h1>
    <br />
    <div class="level">
      <div class="level-left"></div>

      <div class="level-right">
        <p>Add</p>
        <a
          class="button is-success"
          style="margin-right: 5px; margin-left: 10px"
          @click="addModal=true"
        >
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
        </a>
      </div>
    </div>
    <!-- Cards -->
    <div class="columns is-multiline">
      <div class="column is-6-desktop" v-for="(ach,i) in achievements" :key="i">
        <div class="card cardTheHover">
          <div class="card-content">
            <div class="media">
              <div class="media-left is-2" style="margin-top: 12px;margin-left: 12px ">
                <figure class="image is-64x64">
                  <img :src="ach.imageType.image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content" style="margin-top: 12px">
                <p class="title is-4">{{ach.description}}</p>
                <p>Type: {{ach.imageType.type}}</p>
                <p>Goal: {{ach.goal}}</p>
              </div>
              <div class="media-right" style="margin-top: 12px">
                <button
                  class="button is-success is-fullwidth is-light"
                  @click="editAch(i)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <br />
                <button
                  class="button is-danger is-fullwidth is-light"
                  @click="deleteAch(ach._id, ach.description, i)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <b-modal :active.sync="addModal" has-modal-card>
    <form action>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="column modal-title">
            <p class="modal-card-title">Create a new Achievement</p>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-12">
              <b-field label="Achievement description">
                <b-input
                  placeholder="Achievement description"
                  icon-pack="fas"
                  icon="file-signature"
                  required
                  v-model="createAch.description"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Achievement goal">
                <b-input
                  placeholder="Define the goal for this achievement"
                  icon-pack="fas"
                  icon="bullseye"
                  type="number"
                  min="0"
                  required
                  v-model="createAch.goal"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Choose the type">
                <b-select
                  placeholder="Type of achievement"
                  icon-pack="fas"
                  icon="trophy"
                  v-model="createAch.imageType"
                  expanded
                  required
                >
                  <option v-for="(a,i) in achImageType" :value="a" :key="i">{{ a.type }}</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="addModal = false">Cancel</button>
          <button
            class="button is-success"
            type="button"
            @click="addTheAchievement()"
          >Add Achievment</button>
        </footer>
      </div>
    </form>
  </b-modal>

  <b-modal :active.sync="editModal" has-modal-card>
    <form action>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="column modal-title">
            <p class="modal-card-title">Edit {{editDescription}}</p>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-12">
              <b-field label="Achievement description">
                <b-input
                  placeholder="Achievement description"
                  icon-pack="fas"
                  icon="file-signature"
                  required
                  v-model="editDescription"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Achievement goal">
                <b-input
                  placeholder="Define the goal for this achievement"
                  icon-pack="fas"
                  icon="bullseye"
                  type="number"
                  min="0"
                  required
                  v-model="editGoal"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Choose the type">
                <b-select
                  placeholder="Type of achievement"
                  icon-pack="fas"
                  icon="trophy"
                  v-model="ediType"
                  expanded
                  required
                >
                  <option v-for="(a,i) in achImageType" :value="a" :key="i">{{ a.type }}</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="editModal = false">Cancel</button>
          <button
            class="button is-success"
            type="button"
            @click="editTheAchievement()"
          >Edit Achievement</button>
        </footer>
      </div>
    </form>
  </b-modal>
</body>
</template>

<script>
import SideBar from "../components/sideBar";

import { getAllAchievements, addAchievement, editAchievement, removeAchievement } from "../API/apiGamification"; 

import { ToastProgrammatic as toast } from "buefy";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      editPos: 0,
      edit_Id: "",
      editDescription: "",
      editGoal: 0,
      ediType: {},
      achievements: [],
      addModal: false,
      editModal: false,
      createAch: {
        description: "",
        goal: 0,
        imageType: {}
      },
      achImageType: [
        {
          type: "bronze",
          image:
            "https://pbs.twimg.com/media/ENmx441UcAAGY6J?format=png&name=small"
        },
        {
          type: "silver",
          image:
            "https://pbs.twimg.com/media/ENmx441U0AAv-KU?format=png&name=120x120"
        },
        {
          type: "gold",
          image: "https://image.flaticon.com/icons/svg/1152/1152810.svg"
        }
      ]
    };
  },
  methods: {
    editTheAchievement(){
      /* eslint-disable */
      console.log(this.editPos,this.edit_Id,this.editDescription,this.editGoal,this.ediType)
      let pos = this.editPos
      if (
        this.editPos &&
        this.edit_Id &&
        this.editDescription &&
        this.editGoal
      ) {
        let temp = {
          goal: this.editGoal,
          description: this.editDescription,
          imageType: this.ediType
        };

        editAchievement(temp, this.edit_Id)
          .then(() => {
            toast.open({
              type: "is-success",
              message: this.editDescription + " edited with success"
            });

            this.achievements[pos].goal = this.editGoal;
            this.achievements[pos].description = this.editDescription;
            this.achievements[pos].imageType.type = this.editType.type;
            this.achievements[pos].imageType.image = this.editType.image;
            this.achievements[pos]._id = this.edit_Id;
            this.editModal = false;
          })
          .catch(error => {
            toast.open({
              message: error,
              type: "is-danger"
            });
          });
      }



    },
    deleteAch(id,name,pos){
      this.$buefy.dialog.confirm({
        title: "Deleting Achievement",
        message:
          "Are you sure you want to <b>delete</b> the achievement " + name + " ?",
        confirmText: "Delete Achievement",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          removeAchievement(id)
            .then(() => {
              toast.open({
                type: "is-warning",
                message: name + " deleted"
              });

              this.achievements.splice(pos, 1);
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
    editAch(pos){

      this.editPos = pos;
      this.edit_Id = this.achievements[pos]._id;
      this.editDescription = this.achievements[pos].description;
      this.editGoal = this.achievements[pos].goal;
      this.editType = this.achievements[pos].imageType;

      this.editModal = true;

    },
    addTheAchievement() {
      if (this.createAch.description != "" && this.createAch.goal != 0) {
        /* eslint-disable */
        console.log(this.createAch)
        addAchievement(this.createAch)
          .then(() => {
            toast.open({
              message: "New achievement added",
              type: "is-success"
            });
            this.createAch = {
              description: "",
              goal: 0,
              imageType: {}
            };
          })
          .catch(error => {
            toast.open({
              message: error,
              type: "is-danger"
            });
          });
      }
    }
  },
  created() {
    getAllAchievements().then(response => {
      this.achievements = response.data.data;
      /* eslint-disable */ 
      console.log(this.achievements)
    });
  }
};
</script>