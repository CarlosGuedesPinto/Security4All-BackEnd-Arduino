<template>
<body>
  <SideBar></SideBar>
 
  <section class="column is-4 is-offset-5 box" style="margin-top: 40px">
    <h1 class="title is-3 has-text-centered" >New Sensor</h1>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name of the new sensor" v-model="name" required/>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Description of the sensor"
          v-model="description"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Image</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Link of the image"
          v-model="link"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Specs</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Write here the specs, separeted with ','"
          v-model="specs"
          required
        />
      </div>
    </div>

    <b-field label="Choose the sensor category">
      <b-select
        placeholder="Category"
        icon-pack="fas"
        icon="sort"
        expanded
        required
        v-model="categorySelected"
      >
        <option
          v-for="(category,i) in categorys"
          :value="category.idCategory"
          :key="i"
        >{{ category.name }}</option>
      </b-select>
    </b-field>

    <div class="columns">
      <div class="field column is-half">
      <b-field label="Stock">
        <b-input placeholder="Stock" type="number" min="1" v-model="stock"></b-input>
      </b-field>
    </div>
    <div class="field column is-half">
      <b-field label="Price">
        <b-input placeholder="Price" type="number" min="1" v-model="price"></b-input>
      </b-field>
    </div>


    </div>   

    <div class="buttons">
      <b-button
        type="isPrimaryBGColor"
        style="color: white"
        @click="createSensor"
        expanded
      >Add new sensor</b-button>
    </div>


  </section>
</body>
</template>

<script>
import { ToastProgrammatic as toast } from "buefy";
import SideBar from "../components/sideBar";

//Axios
import { addSensor } from "../API/apiSensor";
import { getAllCategorys } from "../API/apiCategory";
//import { getAllSensors,editSensor,addSensor,removeSensor } from "../../api/apiSolutions";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      sensor: {},
      categorys: [],
      name: "",
      description: "",
      stock: 0,
      price: 0,
      link: "",
      specs: "",
      categorySelected: null
    };
  },
  methods: {
    createSensor() {
      this.sensor = {
        name: this.name,
        description: this.description,
        stock: this.stock,
        price: this.price,
        image: this.link,
        specifications: this.specs,
        idCategory: this.categorySelected,
      };
      addSensor(this.sensor)
        .then(() => {
          toast.open({
            message: "New sensor added",
            type: "is-success"
          });
          this.name = ""
          this.description = ""
          this.stock = 0
          this.price = 0
          this.link = ""
          this.specs = ""
          this.categorySelected = null
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
    getAllCategorys().then(response => {
      /* eslint-disable */
      //console.log(response.data.data);
      this.categorys = response.data.data;
    });
  }
};
</script>