<template>
  <div class="row q-col-gutter-md">
    <!-- Left Section -->
    <div class="col-12 col-md-6">
      <q-select
        class="q-mb-md bg-grey-3"
        outlined
        input-debounce="0"
        behavior="menu"
        clearable
        v-model="selectedYear"
        :options="years"
        label="Select Year"
        emit-value
        map-options
        @update:model-value="onYearMonthChange"
      />
      <q-select
        class="q-mb-md bg-grey-3"
        outlined
        input-debounce="0"
        behavior="menu"
        clearable
        v-model="selectedMonth"
        :options="monthOptions"
        label="Select Month"
        emit-value
        map-options
        @update:model-value="onYearMonthChange"
      />
      <q-select
        outlined
        v-model="selectedDepartment"
        use-input
        input-debounce="0"
        label="Department"
        :options="departments"
        behavior="menu"
        fill-input
        @filter="filterFn"
        clearable
        class="bg-grey-3 q-mb-md"
        option-value="deptCode"
        option-label="deptLabel"
        hide-selected
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="col-12 col-md-6">
      <q-select
        outlined
        v-model="selectedBuilding"
        use-input
        input-debounce="0"
        label="Building"
        :options="buildings"
        behavior="menu"
        fill-input
        @filter="filterFn"
        clearable
        class="bg-grey-3 q-mb-md"
        option-value="code"
        option-label="description"
        hide-selected
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        outlined
        v-model="selectedRoom"
        use-input
        input-debounce="0"
        label="Room"
        :options="rooms"
        behavior="menu"
        fill-input
        @filter="filterFn"
        clearable
        class="bg-grey-3 q-mb-md"
        option-value="id"
        option-label="name"
        hide-selected
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        class="bg-grey-3"
        outlined
        label="Status"
        :options="statusSelect"
        v-model="selectedStatus"
        option-value="value"
        option-label="label"
        behavior="menu"
        fill-input
        clearable
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>

  <div
    class="col-12"
    style="justify-content: center; align-items: center; display: flex"
  >
    <div class="text-h4 q-mb-md">{{ formattedDate }}</div>
  </div>
  <div class="col-12 q-mb-md">
    <q-input
      class="inputClass"
      dense
      v-model="searchText"
      label="Search"
      label-color="blue-10"
      outlined
      clearable
      :class="[$q.screen.name + '-text2']"
      @clear="clearSearchText"
    >
      <template v-slot:prepend>
        <q-icon color="blue-10" name="search" />
      </template>
    </q-input>
  </div>
  <q-calendar-month
    ref="calendar"
    v-model="selectedDate"
    animated
    bordered
    focusable
    hoverable
    no-active-date
    :day-min-height="100"
  >
    <template #day="{ scope: { timestamp } }">
      <template v-if="eventsMap[timestamp.date]">
        <div
          class="row justify-start items-center no-wrap my-event"
          v-for="(events, deptLabel) in eventsMap[timestamp.date]"
          :key="deptLabel"
          :class="badgeClasses(events[0])"
          :style="badgeStyles(events[0])"
          @click.stop="onClickDate(events)"
        >
          <div class="title q-calendar__ellipsis">
            {{ getDeptAbbr(deptLabel) }}
          </div>
        </div>
      </template>
    </template>
  </q-calendar-month>
  <q-dialog v-model="schedDialog" full-width>
    <q-card
      :class="[
        $q.screen.name + '-text',
        $q.screen.name + '-widthSched',
        $q.screen.name + '-heightSched',
      ]"
      style="border-radius: 10px"
    >
      <q-card-section class="bg-blue-10 row items-center">
        <div class="text-white text-bold">Schedules</div>

        <q-space></q-space>
        <q-btn
          class="bg-white text-biue-10"
          icon="close"
          push
          round
          dense
          padding="xs"
          @click="clearSelectedSchedule"
          v-close-popup
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-input
          class="bg-amber-8"
          v-model="searchTextSched"
          placeholder="Search"
          outlined
          dense
          standout
          clearable
          :class="[$q.screen.name + '-text2']"
          @clear="clearSearchText"
        />
        <q-virtual-scroll
          class="virtual-scroll"
          type="table"
          style="max-height: 700px"
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="32"
          :items="computedSelectedSchedule"
        >
          <template v-slot:before>
            <thead class="sticky-thead">
              <tr>
                <th
                  v-for="col in selectedCol"
                  :key="col.name"
                  class="text-bold"
                >
                  {{ col.label }}
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot="{ item: row, name }">
            <q-tr :key="name">
              <q-td
                v-for="col in selectedCol"
                :key="col.name"
                class="text-center"
                :style="{
                  width: col.width || 'auto',
                  'white-space':
                    col.name === 'subjectDescription' ||
                    col.name === 'details' ||
                    col.name === 'department'
                      ? 'normal'
                      : 'nowrap',
                  'word-wrap':
                    col.name === 'subjectDescription' ||
                    col.name === 'details' ||
                    col.name === 'department'
                      ? 'break-word'
                      : 'normal',
                }"
              >
                <renderCellDia :row="row" :col="col" />
              </q-td>
            </q-tr>
          </template>
        </q-virtual-scroll>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import helperMethods from "src/helperMethods";
import {
  QCalendarMonth,
  addToDate,
  parseTimestamp,
  today,
} from "@quasar/quasar-ui-qcalendar";
import "@quasar/quasar-ui-qcalendar/dist/index.css";
import renderCellDia from "src/components/renderCellDialog.vue";
const currentYear = new Date().getFullYear();

export default {
  name: "EventCalendar",
  props: {
    events: {
      type: Array,
      required: true,
    },
    departmentOptions: {
      type: Array,
      required: true,
    },
    roomOptions: {
      type: Array,
      required: true,
    },
    buildingOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedDate: today(),

      years: Array.from({ length: 21 }, (_, i) => currentYear - 10 + i),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      selectedYear: currentYear,
      selectedMonth: new Date().getMonth(),
      calendar: null,
      searchTextSched: "",
      searchText: "",
      schedDialog: false,
      selectedSchedule: [],
      selectedCol: [
        {
          name: "roomName",
          label: "Room Name",
          align: "center",
          field: "roomName",
          sortable: false,
          width: "175px",
        },
        {
          name: "roomDescription",
          label: "Room Type",
          align: "center",
          field: "roomDescription",
          sortable: false,
          width: "225px",
        },
        {
          name: "buildingDescription",
          label: "Building",
          align: "center",
          field: "buildingDescription",
          sortable: false,
          width: "250px",
        },
        {
          name: "floor",
          label: "Floor",
          align: "center",
          field: "floor",
          sortable: false,
          width: "175px",
        },
        {
          name: "remarks",
          label: "Remarks",
          align: "center",
          field: "remarks",
          sortable: false,
        },
        {
          name: "subjectDescription",
          label: "Subject Description",
          align: "center",
          field: "title",
          sortable: false,
        },
        {
          name: "details",
          label: "Details",
          align: "center",
          field: "details",
          sortable: false,
        },
        {
          name: "professor",
          label: "Faculty",
          align: "center",
          field: "professor",
          sortable: false,
        },
        {
          name: "dateRange",
          label: "Date Range",
          align: "center",
          field: "dateRange",
          sortable: false,
        },
        {
          name: "intervals",
          label: "Time",
          align: "center",
          field: "formattedIntervals",
          sortable: false,
        },
      ],
      deptAbbr: {
        "COLLEGE OF MEDICINE": "COM",
        "COLLEGE OF NURSING": "CON",
        "COLLEGE OF ALLIED REHABILITATION SCIENCES": "CAReS",
        "COLLEGE OF ALLIED HEALTH PROFESSIONALS": "CAHP",
        "GRADUATE SCHOOL": "GS",
      },

      statusSelect: [
        { label: "Active", value: 1 },
        { label: "Inactive", value: 0 },
        { label: "All Status", value: 2 },
      ],
      selectedStatus: "Active",
      selectedDepartment: null,
      departments: null,
      rooms: null,
      selectedRoom: null,
      buildings: null,
      selectedBuilding: null,
    };
  },

  computed: {
    eventsMap() {
      const map = {};
      const query = this.searchText ? this.searchText.toLowerCase() : "";
      const selectedDeptCode = this.selectedDepartment
        ? this.selectedDepartment.deptLabel
        : null;
      const status =
        this.selectedStatus?.label?.toLowerCase() ??
        this.selectedStatus?.toLowerCase();
      const selectedBuilding = this.selectedBuilding
        ? this.selectedBuilding.description
        : null;

      const selectedRoom = this.selectedRoom ? this.selectedRoom.name : null;

      for (const event of this.events) {
        let start = parseTimestamp(event.fromDate);
        const end = parseTimestamp(event.toDate);

        if (selectedDeptCode && event.department !== selectedDeptCode) {
          continue;
        }

        if (
          selectedBuilding &&
          event.buildingDescription !== selectedBuilding
        ) {
          continue;
        }

        if (selectedRoom && event.roomName !== selectedRoom) {
          continue;
        }

        if (
          !(
            status === "all status" ||
            (status === "active" ? event.active : !event.active)
          )
        ) {
          continue;
        }

        const isEventMatchingQuery =
          (event.title &&
            event.title.toString().toLowerCase().includes(query)) ||
          (event.roomDescription &&
            event.roomDescription.toString().toLowerCase().includes(query)) ||
          (event.professor &&
            event.professor.toString().toLowerCase().includes(query)) ||
          (event.department &&
            event.department.toString().toLowerCase().includes(query)) ||
          (event.dateRange &&
            event.dateRange.toString().toLowerCase().includes(query)) ||
          (event.roomName &&
            event.roomName.toString().toLowerCase().includes(query)) ||
          (event.buildingDescription &&
            event.buildingDescription.toString().toLowerCase().includes(query));

        if (isEventMatchingQuery) {
          while (start.date <= end.date) {
            if (!map[start.date]) {
              map[start.date] = {};
            }

            const abbrDeptLabel = event.department
              ? event.department
              : "OTHER SCHEDULES";

            if (!map[start.date][abbrDeptLabel]) {
              map[start.date][abbrDeptLabel] = [];
            }

            map[start.date][abbrDeptLabel].push(event);
            start = addToDate(start, { day: 1 });
          }
        }
      }

      return map;
    },

    computedSelectedSchedule() {
      if (
        !Array.isArray(this.selectedSchedule) ||
        this.selectedSchedule.length === 0
      ) {
        return [];
      }

      const query = this.searchTextSched.toLowerCase();

      return this.selectedSchedule
        .flat()
        .filter((row) => {
          if (row.intervals) {
            row.formattedIntervals = helperMethods.formatIntervals(
              row.intervals
            );
          }

          return (
            (row.title && row.title.toString().toLowerCase().includes(query)) ||
            (row.roomDescription &&
              row.roomDescription.toString().toLowerCase().includes(query)) ||
            (row.professor &&
              row.professor.toString().toLowerCase().includes(query)) ||
            (row.department &&
              row.department.toString().toLowerCase().includes(query)) ||
            (row.dateRange &&
              row.dateRange.toString().toLowerCase().includes(query)) ||
            (row.roomName &&
              row.roomName.toString().toLowerCase().includes(query)) ||
            (row.buildingDescription &&
              row.buildingDescription.toString().toLowerCase().includes(query))
          );
        })
        .sort((a, b) => (a.roomName || "").localeCompare(b.roomName || ""));
    },

    formattedDate() {
      const date = new Date(this.selectedDate);
      const options = { year: "numeric", month: "long" };
      return date.toLocaleDateString(undefined, options);
    },

    monthOptions() {
      return this.months.map((month, index) => ({
        label: month,
        value: index,
      }));
    },
  },

  components: {
    QCalendarMonth,
    renderCellDia,
  },

  methods: {
    filterFn(val, update) {
      const departmentOptions = this.departmentOptions || [];
      const roomOptions = this.roomOptions || [];
      const buildingOptions = this.buildingOptions || [];

      if (val === "") {
        update(() => {
          this.departments = departmentOptions;
          this.rooms = roomOptions;
          this.buildings = buildingOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        this.departments = departmentOptions.filter(
          (option) => option.deptLabel?.toLowerCase().indexOf(needle) > -1
        );

        this.rooms = roomOptions.filter(
          (option) => option.name?.toLowerCase().indexOf(needle) > -1
        );

        this.buildings = buildingOptions.filter(
          (option) => option.description?.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    getDeptAbbr(deptLabel) {
      return this.deptAbbr[deptLabel] || deptLabel;
    },

    onYearMonthChange() {
      const newDate = new Date(this.selectedYear, this.selectedMonth, 1);
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");

      this.selectedDate = `${year}-${month}-${day}`;
    },

    badgeClasses(event) {
      return {
        "text-black": true,
        "text-bold": true,
        [`bg-${event.bgcolor ?? "yellow-14"}`]: true,
        "q-calendar__ellipsis": true,
      };
    },

    badgeStyles() {
      return {};
    },

    onClickDate(event) {
      this.selectedSchedule = event;
      this.schedDialog = true;
    },

    clearSelectedSchedule() {
      this.schedDialog = false;
      this.selectedSchedule = [];
    },

    clearSearchText() {
      this.searchTextSched = "";
      this.searchText = "";
    },
  },
};
</script>
