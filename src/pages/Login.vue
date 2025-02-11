<template>
  <div class="bgImageUERM d-flex justify-center align-center">
    <div class="column">
      <div>
        <Loader :isLoading="loader" :login="true" />
        <q-layout class="d-flex justify-center align-center q-pa-xl">
          <q-card
            :class="[
              $q.screen.name + '-text',
              $q.screen.name + '-width2',
              $q.screen.name + '-height2',
              'black-shadow',
            ]"
            style="border-radius: 25px"
          >
            <div class="row bg-white" style="width: 100%; height: 100%">
              <div
                class="d-flex justify-center align-center"
                :class="$q.screen.gt.xs ? 'col-6' : 'col-12'"
              >
                <div class="bg-blue-10 logoClass">
                  <img
                    :src="imageLogo"
                    alt="Logo"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </div>
              <!-- <div
                class="bg-blue-10"
                :class="$q.screen.gt.md ? 'col-6' : 'col-12'"
              >
                <img
                  :src="imageLogo"
                  alt="Logo"
                  style="width: 100%; height: 100%"
                />
              </div> -->
              <div
                class="d-flex justify-center align-center"
                :class="$q.screen.gt.xs ? 'col-6' : 'col-12'"
              >
                <q-form
                  class="formStyle"
                  id="frm"
                  method="post"
                  @submit.prevent="submitLogin"
                  autocomplete="off"
                >
                  <q-card-section class="text-center">
                    <p class="text-bold">Hi, Good {{ greeting }}!</p>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      id="txtEmployeeID"
                      v-model="employeeId"
                      class="q-mb-md"
                      standout="bg-blue-10 text-white"
                      label="Employee Code / ID"
                    />
                    <q-input
                      class="q-mb-sm b"
                      standout="bg-blue-10 text-white"
                      v-model="password"
                      label="Password"
                      type="password"
                    />
                  </q-card-section>
                  <q-card-section class="text-center">
                    <q-btn color="blue-10" label="Login" type="submit" push />
                  </q-card-section>
                </q-form>
              </div>
            </div>
          </q-card>
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { QSpinnerIos } from "quasar";
import helperMethods from "../helperMethods.js";
import logo from "../assets/images/LOGOWITHOUTBGWHITETEXT.png";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      appName: process.env.APP_NAME,
      employeeId: "",
      password: "",
      imageLogo: logo,
      loader: false,
    };
  },

  components: {
    Loader,
  },

  computed: {
    greeting() {
      const currentHour = new Date().getHours();
      return currentHour < 12 ? "Morning" : "Afternoon";
    },
  },

  methods: {
    async submitLogin() {
      if (!this.employeeId || !this.password) {
        this.$q.notify({
          color: "negative",
          position: "center",
          message: "Input the Required Field",
          icon: "report_problem",
          iconColor: "white",
          timeout: 1000,
          progress: true,
        });
        return;
      }
      // this.$q.loading.show({
      //   spinner: QSpinnerIos,
      //   message: "Logging In",
      //   messageColor: "blue-10",
      //   backgroundColor: "grey-1",
      //   spinnerColor: "blue-10",
      //   customClass: "custom-loading-style",
      //   spinnerSize: "7em",
      // });
      this.loader = true;
      try {
        const data = {
          employeeId: this.employeeId,
          password: this.password,
        };
        await helperMethods.delay(1500);
        await this.$store.dispatch("userModule/login", data);
        // this.$q.loading.hide();
        this.loader = true;
        return this.$router.push("/");
      } catch (error) {
        // this.$q.loading.hide();
        this.loader = false;
        if (error.response.status == "401") {
          this.$q.notify({
            color: "negative",
            position: "center",
            message: error.response.data.body,
            icon: "report_problem",
            iconColor: "white",
            timeout: 1000,
            progress: true,
          });
        }
      }
    },
  },
};
</script>
