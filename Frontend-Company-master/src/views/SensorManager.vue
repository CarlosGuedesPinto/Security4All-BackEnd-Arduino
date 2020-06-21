<template>
<body>
  <SideBar></SideBar>
  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Manage Sensors</h1>
    <br />
    <div class="level">
      <div class="level-left">
        <div class="columns">
          <div class="column is-4">
            <!-- Search bar -->
            <b-autocomplete
              expanded
              v-model="inputSearch"
              placeholder="Seearch for a sensor"
              icon="search"
              icon-pack="fas"
              type="search"
              @select="option => this.selected = option"
            ></b-autocomplete>
          </div>
          <div class="column is-3">
            <b-select
              v-model="CategorySelected"
              placeholder="Select CAE"
              icon="sort"
              icon-pack="fas"
              expanded
            >
              <option value="-1">All</option>
              <option v-for="(c,i) in categorys" :value="c.idCategory" :key="i">{{c.name}}</option>
            </b-select>
          </div>
          <div class="column is-3">
            <b-select
              v-model="OrderSelected"
              placeholder="Select Area"
              icon="sort"
              icon-pack="fas"
              expanded
            >
              <option value="-1">All</option>
              <!-- <option v-for="(area,i) in areaArray" :value="area" :key="i">{{area}}</option> -->
            </b-select>
          </div>
          <div class="column is-2">
            <nav class="level">
              <div class="level-left">
                <button
                  class="button isSecondaryBGColor has-text-white"
                  @click="filteredSensorsFunc"
                  expanded
                >Search</button>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button
                    class="button isOurGrey has-text-white"
                    @click="() =>{ OrderSelected=-1; CategorySelected=-1; inputSearch= ''; filteredSensorsFunc()}"
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

    <!-- Cards / Body -->
    <div class="columns is-multiline" v-if="view==2">
      <div class="column is-6-desktop" v-for="(sensor,i) in filteredSensors" :key="i">
        <div class="card cardTheHover">
          <div class="card-content">
            <div class="media">
              <div class="media-left is-2" style="margin-top: 12px;margin-left: 12px ">
                <figure class="image is-64x64">
                  <img :src="sensor.image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content" style="margin-top: 12px">
                <p class="title is-4">{{sensor.name}}</p>
                <p>Stock: {{sensor.stock}}</p>
                <p>Price: {{sensor.price}}</p>
              </div>
              <div class="media-right" style="margin-top: 12px">
                <button
                  class="button is-info is-fullwidth is-light"
                  @click="openEditSensor(sensor.idSensor)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <br />
                <button
                  class="button is-success is-fullwidth is-light"
                  @click="promptNumber(sensor.name, sensor.stock, sensor.idSensor, i)"
                >
                  <i class="fas fa-arrow-circle-up"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- table -->

    <div v-if="view==1">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-if="filteredCompaniesFunc != 0" -->

          <tr v-for="(sensor,i) in filteredSensors" :key="i">
            <th>
              <figure class="image is-32x32">
                <img :src="sensor.image" alt="Placeholder image" />
              </figure>
            </th>
            <th>{{sensor.idSensor}}</th>
            <th>{{sensor.name}}</th>
            <th>{{sensor.description}}</th>
            <th>{{sensor.categoryName}}</th>
            <th>{{sensor.stock}}</th>
            <th>{{sensor.price}}</th>
            <th width="20%">
              <button class="button is-info is-light" @click="openEditSensor(sensor.idSensor)">
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="button is-success is-light"
                style="margin-left: 10px"
                @click="promptNumber(sensor.name, sensor.stock, sensor.idSensor, i)"
              >
                <i class="fas fa-arrow-circle-up"></i>
              </button>
              <button
                class="button is-danger is-light"
                style="margin-left: 10px"
                @click="deleteSensorById(sensor.name, sensor.idSensor, i)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table -->
  </section>

  <!-- Modal -->
  <b-modal :active.sync="editModal" has-modal-card>
    <form action>
      <div class="modal-background"></div>
      <div class="modal-card" style="width: 1000px;">
        <header class="modal-card-head">
          <div class="column is-7 is-6-mobile modal-title">
            <p class="modal-card-title">Editing {{editName}}</p>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-12-mobile is-half">
              <b-field label="Name of the sensor">
                <b-input
                  placeholder="Sensor Name"
                  icon-pack="fas"
                  icon="file-signature"
                  required
                  v-model="editName"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-12-mobile is-half">
              <b-field label="Link of the sensor">
                <b-input
                  placeholder="Paste the link of the image"
                  icon-pack="fas"
                  icon="image"
                  required
                  v-model="editImage"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12-mobile is-half">
              <b-field label="Choose the category">
                <b-select
                  placeholder="Category"
                  icon-pack="fas"
                  icon="sort"
                  v-model="editCategory"
                  expanded
                  required
                >
                  <option
                    v-for="(cat,i) in categorys"
                    :value="cat.idCategory"
                    :key="i"
                  >{{ cat.name }}</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-12-mobile is-half">
              <b-field label="Edit the price">
                <b-input
                  placeholder="Price of the sensor"
                  icon-pack="fas"
                  icon="euro-sign"
                  required
                  v-model="editPrice"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Edit the description">
                <b-input
                  type="text"
                  maxlength="300"
                  placeholder="Description"
                  icon-pack="fas"
                  icon="font"
                  required
                  v-model="editDescription"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Edit the Specs">
                <b-input
                  type="text"
                  maxlength="300"
                  placeholder="Specs, separeted with ;"
                  icon-pack="fas"
                  icon="font"
                  required
                  v-model="editSpecs"
                ></b-input>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="editModal = false">Cancel</button>
          <button
            class="button is-success"
            type="button"
            @click="updateSensor(editPos)"
          >Upload changes</button>
        </footer>
      </div>
    </form>
  </b-modal>
</body>
</template>

<script>
import { ToastProgrammatic as toast } from "buefy";
import SideBar from "../components/sideBar";

//Axios
import { getAllSensors, editSensor, removeSensor } from "../API/apiSensor";
import { getAllCategorys } from "../API/apiCategory";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      inputSearch: "",
      sensors: [],
      filteredSensors: [],
      CategorySelected: -1,
      OrderSelected: -1,
      categorys: [],
      view: 2,
      editModal: false,
      editPos: null,
      editId: null,
      editName: "",
      editPrice: "",
      editDescription: "",
      editImage: "",
      editCategory: "",
      editCategoryName: "",
      editSpecs: ""
    };
  },
  computed: {},
  methods: {
    deleteSensorById(name, id, pos) {
      this.$buefy.dialog.confirm({
        title: "Deleting " + name,
        message:
          "Are you sure you want to <b>delete</b> the sensor " + name + " ?",
        confirmText: "Delete Sensor",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          removeSensor(id)
            .then(() => {
              toast.open({
                type: "is-warning",
                message: name + " deleted"
              });

              this.sensors.splice(pos, 1);
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
    promptNumber(name, stock, id, pos) {
      /* eslint-disable */
      console.log(stock);
      this.$buefy.dialog.prompt({
        message: `Increase the stock of ` + name,
        inputAttrs: {
          type: "number",
          placeholder: "Type the stock of the sensor",
          value: stock,
          maxlength: 3,
          min: stock
        },
        trapFocus: true,
        onConfirm: value => {
          let temp = { stock: value };
          editSensor(temp, id)
            .then(() => {
              toast.open({
                type: "is-success",
                message: name + " stock updated"
              });

              this.sensors[pos].stock = value;
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
    updateSensor(pos) {
      if (
        this.editName &&
        this.editPrice &&
        this.editDescription &&
        this.editPrice &&
        this.editCategory
      ) {
        let temp = {
          name: this.editName,
          price: this.editPrice,
          image: this.editImage,
          description: this.editDescription,
          idCategory: this.editCategory,
          specifications: this.editSpecs
        };

        editSensor(temp, this.editId)
          .then(() => {
            toast.open({
              type: "is-success",
              message: this.editName + " edited with success"
            });

            this.sensors[pos].name = this.editName;
            this.sensors[pos].description = this.editDescription;
            this.sensors[pos].price = this.editPrice;
            this.sensors[pos].image = this.editImage;
            this.sensors[pos].idCategory = this.editCategory;
            this.sensors[pos].categoryName = this.editCategoryName;
            this.sensors[pos].specifications = this.editSpecs;
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
    filteredSensorsFunc() {
      if (this.sensors) {
        //Search for words
        this.filteredSensors = this.sensors.filter(sensor => {
          return (
            sensor.name
              .toString()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(this.inputSearch.toLowerCase()) >= 0
          );
        });

        /* eslint-disable */
        console.log(this.filteredSensors, "tu");
        this.filteredSensors.forEach((sensor, i) => {
          if (
            sensor.idCategory == this.CategorySelected ||
            this.CategorySelected == -1
          ) {
            console.log("entrei");
          } else {
            this.filteredSensors.splice(i, 1);
          }
        });
        //Filter
        // this.filteredSensors = this.filteredSensors.sort((sensor,i) => {
        //   console.log(sensor.idCategory,this.CategorySelected);
        //   if (
        //     sensor.idCategory == this.CategorySelected ||
        //     this.CategorySelected == -1
        //   ) {
        //     return true;
        //   } else {
        //     console.log("entrei");
        //     this.filteredSensors.splice(i,1)
        //     return false;
        //   }
        // });
        console.log(this.filteredSensors, "tu");
      }
    },
    pageActive(n) {
      if (n == 1) {
        this.view = 1;
      } else if (n == 2) {
        this.view = 2;
      }
      localStorage.setItem("SensorManager", this.view);
    },
    isActive(n) {
      return n == this.view
        ? { "background-color": "#F2F2F2" }
        : { "background-color": "white" };
    },
    openEditSensor(id) {
      let pos = this.getPosition(id);

      this.editPos = pos;
      this.editId = this.sensors[pos].idSensor;
      this.editName = this.sensors[pos].name;
      this.editPrice = this.sensors[pos].price;
      this.editDescription = this.sensors[pos].description;
      this.editImage = this.sensors[pos].image;
      this.editCategory = this.sensors[pos].idCategory;
      this.editCategoryName = this.sensors[pos].categoryName;
      this.editSpecs = this.sensors[pos].specifications;

      this.editModal = true;
    },
    getPosition(id) {
      //Getting pos with the id
      let temp;
      this.sensors.forEach((sensor, i) => {
        if (sensor.idSensor == id) {
          temp = i;
        }
      });
      return temp;
    }
  },
  created() {
    if (localStorage.getItem("SensorManager")) {
      this.view = localStorage.getItem("SensorManager");
    }
    getAllCategorys().then(response => {
      this.categorys = response.data.data;
    });
    getAllSensors().then(response => {
      /* eslint-disable */
      //console.log(response.data.data);
      this.sensors = response.data.data;
      this.filteredSensors = response.data.data;
      this.sensors.forEach((sensor, i) => {
        this.categorys.forEach(category => {
          if (category.idCategory == sensor.idCategory) {
            this.sensors[i].categoryName = category.name;
          }
        });
      });
    });
  }
};
</script>