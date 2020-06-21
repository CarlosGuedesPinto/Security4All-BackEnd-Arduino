<template>
<body>
  <SideBar></SideBar>
  <section class="column is-8 is-offset-3 box" style="margin-top: 50px">
    <h1 class="title is-3 has-text-centered">Sensor Orders</h1>
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
            <th>Quantity</th>
            <th>Stock available</th>
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
            <th>{{order.quantity}}</th>
            <th>{{order.stock}}</th>
            <th>{{order.date}}</th>
            <th width="15%">
              <button
                class="button is-success"
                style="width: 50px"
                @click="acceptOrder(order.idOrder, i,order.quantity,order.stock,name, order.idSensor)"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                class="button is-danger is-light"
                style="margin-left: 10px; width: 50px"
                @click="deleteOrder(order.idOrder, i)"
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
import { getAllOrders, editOrderActive, removeOrder } from "../API/apiOrder";
import { editSensor } from "../API/apiSensor";
import { createAlert } from "../API/apiAlerts";

import { ToastProgrammatic as toast } from "buefy";

export default {
  components: {
    SideBar
  },
  data() {
    return {
      orders: [],
      users: []
    };
  },
  methods: {
    acceptOrder(id, i, x, stock,sensorName,idSensor) {
      if (x > stock) {
        toast.open({
          message: "Not enough stock",
          type: "is-danger"
        });
      } else {
        this.$buefy.dialog.confirm({
          title: "Confirm Order",
          message: "Are you sure you want to confirm this order?",
          confirmText: "Validate Order",
          type: "is-success",
          hasIcon: true,
          onConfirm: () => {
            /* eslint-disable */
            console.log(id);
            editOrderActive(id, { active: 1 }) //Edit active field
              .then(() => {
                let temp = stock - x;
                temp = { stock: temp };

                editSensor(temp, idSensor) //Update stock (stock - quantity)
                  .then(() => {               
                    if (temp.stock == 0) { //If stock = 0, give an alert to dashboard
                      let temp2 = {
                        "alertText": "The product " + sensorName + " ran out of stock",
                        "alertType": "Warning"
                      }
                      createAlert(temp2).then(() => {
                          // eslint-disable-next-line
                          console.log("Alert created")
                      });
                    }
                    toast.open({
                      type: "is-success",
                      message: "Validated"
                    });
                    this.orders.splice(i, 1);
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
          }
        });
      }
    },
    deleteOrder(id, i) {
      this.$buefy.dialog.confirm({
        title: "Delete Order ID" + id,
        message: "Are you sure you want to delete the order?",
        confirmText: "Delete Order",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          removeOrder(id)
            .then(() => {
              toast.open({
                type: "is-warning",
                message: "Order deleted"
              });
              this.orders.splice(i, 1);
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
      this.orders = response.data.data;
      /* eslint-disable */
      console.log(this.orders);
      this.orders = this.orders.filter(order => {
        if (order.active == 0) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
};
</script>