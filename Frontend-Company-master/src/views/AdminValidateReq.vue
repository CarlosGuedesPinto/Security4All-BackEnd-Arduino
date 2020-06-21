<template>
<body>
  <SideBar></SideBar>
  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Validate installation requests</h1>
    <br />

    <!--  -->
    <!--  -->
    <div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>Username</th>
            <th></th>
            <th>Sensor</th>
            <th>Payed</th>
            <th>Installed</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order,i) in orders" :key="i">
            <th>{{order.idOrder}}</th>
            <th>{{order.username}}</th>
            <th>
              <img :src="order.image" class="image is-24x24" />
            </th>
            <th>{{order.name}}</th>
            <th>{{order.payed}}</th>
            <th>{{order.instalation}}</th>
            <th>{{order.date}}</th>
            <th width="15%">
              <button
                class="button is-success is-light"
                style="width: 50px"
                @click="payedOrder(order.idOrder, i)"
              >
                <i class="fas fa-money-check-alt"></i>
              </button>
              <button
                class="button is-success is-light"
                style="margin-left: 10px; width: 50px"
                @click="installedOrder(order.idOrder, i)"
              >
                <i class="fas fa-check"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table -->
  </section>
  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Records</h1>
    <br />

    <!--  -->
    <!--  -->
    <div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Position">ID</abbr>
            </th>
            <th>Username</th>
            <th></th>
            <th>Sensor</th>
            <th>Payed</th>
            <th>Installed</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order,i) in orders2" :key="i">
            <th>{{order.idOrder}}</th>
            <th>{{order.username}}</th>
            <th>
              <img :src="order.image" class="image is-24x24" />
            </th>
            <th>{{order.name}}</th>
            <th>{{order.quantity}}</th>
            <th>{{order.date}}</th>
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
import {
  getAllOrders,
  editPaymentActive,
  editInstalationActive
} from "../API/apiOrder"; //, editOrderActive, removeOrder
// import { editSensor } from "../API/apiSensor";

import { ToastProgrammatic as toast } from "buefy";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      orders: [],
      orders2: []
    };
  },
  methods: {
    payedOrder(id, i) {
      this.$buefy.dialog.confirm({
        title: "Confirm Order Payed",
        message: "Are you sure you want to confirm the payment for this order?",
        confirmText: "Payed Order",
        type: "is-success",
        hasIcon: true,
        onConfirm: () => {
          editPaymentActive(id, { payed: 1 }) //Edit active field
            .then(() => {
              toast.open({
                type: "is-success",
                message: "Action Done"
              });
              this.orders[i].payed = 1
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
    installedOrder(id, i) {
      this.$buefy.dialog.confirm({
        title: "Confirm Order Instalation",
        message: "Are you sure you want to confirm the instalation for this order?",
        confirmText: "Instalation Confirm",
        type: "is-success",
        hasIcon: true,
        onConfirm: () => {
          editInstalationActive(id, { instalation: 1 }) //Edit active field
            .then(() => {
              toast.open({
                type: "is-success",
                message: "Action Done"
              });
              this.orders[i].instalation= 1
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
    getAllOrders().then(response => {
      let tempOrders = response.data.data;

      tempOrders = tempOrders.filter(order => {
        if (order.active == 1) {
          return true;
        } else {
          return false;
        }
      });
        /* eslint-disable */
      tempOrders.forEach(temp => {
        if (temp.payed == 1 && temp.instalation == 1) {
          this.orders2.push(temp)
        } else {
          this.orders.push(temp)
        }

      });
    });
  }
};
</script>