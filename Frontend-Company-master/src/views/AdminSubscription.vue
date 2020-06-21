<template>
<body>
  <SideBar></SideBar>

  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Subscription Packages</h1>
    <br />
    <br />
    <!-- Cards -->
    <div class="columns is-multiline">
      <div class="column is-6-desktop" v-for="(pack,i) in packages" :key="i">
        <div class="card cardTheHover">
          <div class="card-content">
            <div class="media">
              <div class="media-left is-2" style="margin-top: 12px;margin-left: 12px ">
                <!-- <figure class="image is-64x64">
                  <img :src="ach.imageType.image" alt="Placeholder image" />
                </figure> -->
              </div>
              <div class="media-content" style="margin-top: 12px">
                <p class="title is-4">{{pack.name}}</p>
                <p>{{pack.description}}</p>
                <p>Price: {{pack.price}}</p>
              </div>
              <div class="media-right" style="margin-top: 12px">
                <button class="button is-success is-fullwidth is-light" @click="editP(i)">
                  <i class="fas fa-edit"></i>
                </button>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <b-modal :active.sync="editModal" has-modal-card>
    <form action>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="column modal-title">
            <p class="modal-card-title">Edit Package</p>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-12">
              <b-field label="Achievement description">
                <b-input
                  placeholder="Achievement description"
                  icon-pack="fas"
                  icon="signature"
                  required
                  v-model="editName"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Edit description">
                <b-input
                  placeholder="Define the description"
                  icon-pack="fas"
                  icon="file-signature"
                  type="text"
                  min="0"
                  required
                  v-model="editText"
                ></b-input>
              </b-field>
            </div>
            </div>
            <div class="columns">
            <div class="column">
              <b-field label="Edit the price">
                <b-input
                  placeholder="Define the price"
                  icon-pack="fas"
                  icon="money-bill-wave"
                  type="number"
                  min="0"
                  required
                  v-model="editPrice"
                ></b-input>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="editModal = false">Cancel</button>
          <button class="button is-success" type="button" @click="editPackage()">Edit Package</button>
        </footer>
      </div>
    </form>
  </b-modal>
</body>
</template>
<script>
import SideBar from "../components/sideBar";
import { ToastProgrammatic as toast } from "buefy";

import { getAllPackages, editPack } from "../API/apiPackages";


export default {
  components: {
    SideBar
  },
  data() {
    return {
      editModal: false,
      packages: [],
      editName: "",
      editText: "",
      editPrice: "",
    };
  },
  methods: {
    editP(temp){
      this.editName = this.packages[temp].name
      this.editText = this.packages[temp].description
      this.editPrice = this.packages[temp].price

      this.editModal = true

    },
    editPackage() {
      let temp = {
        name: this.editName,
        description: this.editText,
        price: this.editPrice
      }
      editPack(temp)
      .then(() => {         

            this.editModal = false;
            location.reload();
          })
          .catch(error => {
            toast.open({
              message: error,
              type: "is-danger"
            });
          });

    }
  },
  created() {
    getAllPackages().then(response => {
      this.packages = response.data.data;
      /* eslint-disable */

      console.log(this.packages);
    });
  }
};
</script>