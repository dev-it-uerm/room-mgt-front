<template>
  <span>{{ renderCell(row, col) }}</span>
</template>

<script>
import helpers from "../helperMethods";
export default {
  props: {
    row: Object,
    col: Object,
  },

  methods: {
    renderCell(row, col) {
      if (col.field === "dateRange") {
        const dateRange = `${row.formatFrom} - ${row.formatTo}`;
        return dateRange;
      } else if (col.field === "remarks") {
        if (row.remarks === null) {
          return "-";
        }
        return row[col.field];
      } else if (col.field === "subjectDescription") {
        if (row.subjectDescription === null) {
          return "-";
        }
        return row[col.field];
      } else if (col.field === "subjectCode") {
        if (row.subjectCode === null) {
          return "-";
        }
        return row[col.field];
      } else if (col.field === "section") {
        if (row.section === null) {
          return "-";
        }
        return row[col.field];
      } else if (col.field === "professor") {
        if (row.professor === null) {
          return "-";
        }
        return row[col.field];
      } else if (col.field === "subjectDescriptionCode") {
        if (row.subjectCode === null && row.subjectDescription === null) {
          return "-";
        }
        return `${row.subjectCode} - ${row.subjectDescription}`;
      } else if (col.field === "days") {
        return helpers.getFullDayName(row[col.field]);
      } else {
        return row[col.field];
      }
    },
  },
};
</script>
