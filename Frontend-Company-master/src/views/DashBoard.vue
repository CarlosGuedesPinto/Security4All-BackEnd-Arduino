<template>
<body>
  <SideBar class="is-hidden-mobile"></SideBar>
  <section class="info-tiles column is-10 is-offset-2 is-hidden-mobile">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue=" parseInt(values[0])"></CountUp>
          <p class="subtitle">Users</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[1])"></CountUp>
          <p class="subtitle">Sensors Sold</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[2])"></CountUp>
          <p class="subtitle">Installation Requests</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[3])"></CountUp>
          <p class="subtitle">Orders</p>
        </article>
      </div>
    </div>
  </section>
  <section class="info-tiles column is-10 is-offset-2 is-hidden-mobile">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[4])"></CountUp>
          <p class="subtitle">Number of houses</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[5])"></CountUp>
          <p class="subtitle">Average sensor per house</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[6])"></CountUp>
          <p class="subtitle">Users to validate</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box hover-item">
          <CountUp v-bind:endValue="parseInt(values[7])"></CountUp>
          <p class="subtitle">Number or achievements</p>
        </article>
      </div>
    </div>
  </section>

  <section class="column is-10 is-offset-3 is-hidden-mobile">
    <div class="columns">
      <div class="column is-9">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">Events</p>
            <a class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-table">
            <div class="content">
              <table class="table is-striped is-horable">
                <tbody>
                  <tr v-for="(event,i) in alerts" :key="i">
                    <td width="5%">
                      <i class="far fa-bell"></i>
                    </td>
                    <td width="70%">{{event.alertText}}</td>
                    <td>{{event.createdAt}}</td>

                    <td>
                      <a
                        class="button is-small is-danger is-fullwidth"
                        v-if="event.alertType=='Danger'"
                      >Alert</a>
                      <a
                        class="button is-small is-warning is-fullwidth"
                        v-if="event.alertType=='Warning'"
                      >Stock Out</a>
                      <a
                        class="button is-small is-success is-fullwidth"
                        v-if="event.alertType=='Success'"
                      >Info</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <a
              class="card-footer-item"
              @click="eventsAll=!eventsAll"
              v-if="eventsAll==false"
            >View All</a>
            <a
              class="card-footer-item"
              @click="eventsAll=!eventsAll"
              v-if="eventsAll==true"
            >View Less</a>
          </footer>
        </div>
      </div>
    </div>
  </section>
  <section class="is-hidden-tablet isSecondaryBGColor">
    <div class="container">
      <img src="../assets/Images/1.png" width="300" class="center" style="margin-bottom:50px" />

      <p class="error has-text-centered">{{ error }}</p>

      <qrcode-stream @decode="onDecode" @init="onInit" class="center" />
      <h1 class="title has-text-centered isPrimaryColor" style="margin-top:20px">Orders to pay</h1>
      <p
        v-if="onID<1"
        class="subtitle is-4 has-text-centered has-text-white"
        style="margin-top:10px"
      >No orders found yet!</p>

      <div class="columns is-mobile is-multiline">
        <div class="column is-12-mobile" v-for="(order,i) in filteredOrders" :key="i">
          <div class="card cardTheHover">
            <div class="card-content">
              <div class="media">
                <div class="media-left is-2" style="margin-top: 12px;margin-left: 12px ">
                  <figure class="image is-64x64">
                    <img :src="order.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content" style="margin-top: 12px">
                  <p class="title is-4">{{order.name}}</p>
                  <p>Price: {{order.price}}</p>
                </div>
                <div class="media-right" style="margin-top: 12px">
                  <button class="button is-success is-fullwidth" @click="payOrder(order.idOrder,i)">
                    <i class="fas fa-check-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>
</template>

<script>
import SideBar from "../components/sideBar";
import CountUp from "../components/countUp";
import { getAlerts } from "../API/apiAlerts";
import {
  getAllOrders,
  editPaymentActive,
  editInstalationActive
} from "../API/apiOrder";
import { QrcodeStream } from "vue-qrcode-reader";
import { ToastProgrammatic as toast } from "buefy";
export default {
  components: {
    SideBar,
    CountUp,
    QrcodeStream
  },
  data() {
    return {
      orders: [],
      filteredOrders: [],
      result: "",
      error: "",
      alerts: [],
      values: [],
      eventsAll: false
    };
  },
  created() {
    getAllOrders().then(response => {
      this.orders = response.data.data;
      this.orders = this.orders.filter(order => {
        if (order.active == 1 && (order.payed != 1 || order.instalation != 1)) {
          return true;
        } else {
          return false;
        }
      });
    });

    if (localStorage.getItem("countUp")) {
      this.values = localStorage.getItem("countUp");
      this.values = this.values.split(",");
      console.log(this.values);
    }

    getAlerts().then(response => {
      this.alerts = response.data.data;
      this.alerts.forEach((alert, i) => {
        /* eslint-disable */

        let mydate = new Date(this.alerts[i].createdAt);
        this.alerts[i].createdAt = this.alerts[i].createdAt.slice(0, 10);
      });
    });
  },
  computed: {
    onID() {
      /* eslint-disable */

      this.orders.forEach(order => {
        if (order.idUser == this.result) {
          this.filteredOrders.push(order);
        }
      });
      return this.filteredOrders.length;
    }
  },
  methods: {
    payOrder(id,i) {
      editPaymentActive(id, { payed: 1}).then(() => {
        editInstalationActive(id, { instalation: 1}).then(() => {
          toast.open({
                message: "Order confirmed",
                type: "is-success"
              });
          this.orders.splice(i,1)
        })
        .catch(error => {
              toast.open({
                message: error,
                type: "is-danger"
              });
            });
      })
      .catch(error => {
              toast.open({
                message: error,
                type: "is-danger"
              });
            });
    },
    filterEvents(events) {
      let temp = [];
      if (!this.eventsAll) {
        while (temp.length < 8) {
          temp.push(events[temp.length]);
        }
      } else if (this.eventsAll) {
        temp = events;
      }
      return temp;
    },
    onDecode(result) {
      this.result = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.error {
  font-weight: bold;
  color: red;
}

.hover-item:hover {
  -webkit-transform: scale(1.055) translateY(-2px);
  transform: scale(1.055) translateY(-2px);
  -webkit-box-shadow: 0 2px 25px 0 rgba(30, 30, 30, 0.1);
  box-shadow: 0 2px 25px 0 rgba(30, 30, 30, 0.1);
}

.fullSize {
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}
</style>