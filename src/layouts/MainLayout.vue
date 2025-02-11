<template>
  <q-layout view="lHh Lpr lFf">
    <Loader :isLoading="loader" :logout="true" />

    <q-header elevated class="bg-blue-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title style="cursor: pointer">
          {{ app_name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-white" show-if-above bordered>
      <q-list>
        <!-- Your existing content -->
        <q-card-section style="margin: 75px 0">
          <div class="avatar-container">
            <q-avatar size="160px" class="absolute-center">
              <img :src="imageApi + employeeId" alt="avatar" />
            </q-avatar>
          </div>
        </q-card-section>

        <q-item-label header class="text-center text-black">
          <!-- <span> {{ employeeId }}</span>
          <br /> -->
          <span class="text-bold">{{ employeeFullName }}</span>
          <br />
          <div class="q-mt-sm">{{ employeeDeptDesc }}</div>
        </q-item-label>
        <q-item class="flex column">
          <EssentialLink
            style="width: 100%"
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-item>
        <q-item class="clickable">
          <q-btn
            style="width: 100%"
            class="bg-blue-10 text-white"
            name="logout"
            label="logout"
            @click="onLogout()"
          >
          </q-btn>
        </q-item>
      </q-list>

      <div style="position: absolute; bottom: 0; left: 0; width: 100%">
        <div style="display: flex; justify-content: center">
          <img
            src="src/assets/images/uerm-hospital-logo.png"
            alt="avatar"
            style="width: 70%; height: 150px"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { mapGetters } from "vuex";
import helperMethods from "src/helperMethods";
import { QSpinnerIos } from "quasar";
import Loader from "../components/Loader.vue";

const linksList = [
  // {
  //   title: "Insert Room",
  //   caption: "Insert Room",
  //   icon: "room_preferences",
  //   link: "/insert-room",
  // },
  // {
  //   title: "Classroom Scheduler",
  //   caption: "Classroom Scheduler",
  //   icon: "calendar_month",
  //   link: "/schedule-class-room",
  // },
  {
    title: "Book A Room",
    caption: "Room Scheduler",
    icon: "pending_actions",
    link: "/schedule-room-booking",
  },
  {
    title: "Book A Class",
    caption: "Custom Classroom",
    icon: "pending_actions",
    link: "/schedule-custom-classroom-scheduler",
  },
  {
    title: "Scheduled Rooms",
    caption: "Scheduled Rooms",
    icon: "event_available",
    link: "/Scheduled-rooms",
  },
  {
    title: "Calendar View",
    caption: "CalendarView",
    icon: "calendar_month",
    link: "/calendarview",
  },
  // {
  //   title: "Generate Report",
  //   caption: "GenerateReport",
  //   icon: "text_snippet",
  //   link: "/generatereport",
  // },
  // {
  //   title: "Classroom Utilization",
  //   caption: "ClassroomUtilization",
  //   icon: "receipt_long",
  //   link: "/classroomutiiization",
  // },
  {
    title: "Report",
    caption: "Report",
    icon: "receipt_long",
    link: "/Report",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    Loader,
  },

  data() {
    return {
      app_name: process.env.APP_NAME,
      essentialLinks: linksList,
      leftDrawerOpen: false,
      imageApi: process.env.IMAGE_REST_API_URL,
      loader: false,
    };
  },

  computed: {
    ...mapGetters({
      employeeId: "userModule/getEmployeeId",
      employeeFullName: "userModule/getEmployeeFullName",
      employeeDeptDesc: "userModule/getEmployeeDeptDesc",
    }),
  },

  methods: {
    toggleLeftDrawer: function () {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    async onLogout() {
      this.loader = true;
      // this.$q.loading.show({
      //   spinner: QSpinnerIos,
      //   message: "Logging Out",
      //   messageColor: "blue-10",
      //   backgroundColor: "grey-1",
      //   spinnerColor: "blue-10",
      //   customClass: "custom-loading-style",
      //   spinnerSize: "7em",
      // });
      await helperMethods.delay(1000);
      await this.$store.dispatch("userModule/logout", this.employeeId);
      this.loader = false;
      // this.$q.loading.hide();
    },
  },
});
</script>
