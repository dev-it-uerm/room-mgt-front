import axios from "axios";
import { Cookies } from "quasar";
import { api } from "src/boot/axios";
const APIUrl = process.env.BACKEND_REST_API_URL;

export default {
  async submitNewRoomType({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/addRoomType`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
    } catch (error) {
      console.error("Error adding new room type", error);
      throw error;
    }
  },

  async submitNewBuilding({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/addBuilding`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
    } catch (error) {
      console.error("Error adding new building", error);
      throw error;
    }
  },

  async getRoomTypes({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getRoomTypes`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_ROOM_OPTIONS", response.data);
    } catch (error) {
      console.error("Error Getting Room Types");
      throw error;
    }
  },

  async getBuildings({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getBuildings`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_BUILDING_OPTIONS", response.data);
    } catch (error) {
      console.error("Error Getting Buildings");
      throw error;
    }
  },

  async getDepartments({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getDepartments`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_DEPARTMENT_OPTIONS", response.data);
    } catch (error) {
      console.error("Error Getting Buildings");
      throw error;
    }
  },

  async submitNewRoom({ commit }, data) {
    try {
      const response = await axios.post(`${APIUrl}/room-mgt/room`, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
    } catch (error) {
      console.error("Error Creating New Room");
      throw error;
    }
  },

  async getSubjectCode({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/subject-code`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_SUBJECTCODE_OPTIONS", response.data);
    } catch (error) {
      console.error("Error Getting Subject Code");
      throw error;
    }
  },

  async createAutoRoomSchedule({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/createAutoRoomSchedule`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
    } catch (error) {
      console.error("Error Creating Schedule");
      throw error;
    }
  },

  async getAvailableRoom({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/getAvailableRoom`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      commit("SET_AVAILABLE_ROOM", response.data);
    } catch (error) {
      console.error("Error getting available rooms");
      throw error;
    }
  },

  async createScheduleBooking({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/scheduleBooking`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
    } catch (error) {
      console.error("Error in scheduling a book");
      throw error;
    }
  },

  async createCustomScheduleBooking({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/customScheduleBooking`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
    } catch (error) {
      console.error("Error in scheduling a book");
      throw error;
    }
  },

  async getBookedSchedule({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/bookedRooms`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_BOOKED_ROOMS", response.data);
    } catch (error) {
      console.error("Error Getting Booked Schedule");
      throw error;
    }
  },

  async getSections({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/getSections`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      commit("SET_SECTIONS", response.data);
    } catch (error) {
      console.error("Error in getting section");
      throw error;
    }
  },

  async getSemester({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getSemester`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      commit("SET_SEMESTER", response.data);
    } catch (error) {
      console.log("Error in getting semester");
      throw error;
    }
  },

  async getBookedScheduleByEmployee({ commit }) {
    try {
      const response = await axios.get(
        `${APIUrl}/room-mgt/bookedRoomsByEmployeeCode`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      commit("SET_EMPLOYEE_BOOKED_ROOMS", response.data);
    } catch (error) {
      console.log("Error Getting Booked Rooms By Employee Code");
    }
  },

  async getScheduledRoomView({ commit }, data) {
    try {
      const response = await axios.post(
        `${APIUrl}/room-mgt/bookedRoomsView`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      commit("SET_SCHEDULED_ROOM_VIEW", response.data);
    } catch (error) {
      console.error("Error in getting section");
      throw error;
    }
    // try {
    //   const response = await axios.get(`${APIUrl}/room-mgt/bookedRoomsView`, {
    //     headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    //   });
    //   commit("SET_SCHEDULED_ROOM_VIEW", response.data);
    // } catch (error) {
    //   console.log("Error Getting All Scheduled Room View");
    // }
  },

  async getAllRooms({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getAllRooms`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_ALL_ROOMS_REPORT", response.data);
    } catch (error) {
      console.log("Error Getting All Rooms");
    }
  },

  async getRooms({ commit }) {
    try {
      const response = await axios.get(`${APIUrl}/room-mgt/getRooms`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      commit("SET_ROOMS", response.data);
    } catch (error) {
      console.log("Error Getting Rooms");
    }
  },

  async cancelSchedule({}, data) {
    try {
      return await axios.post(`${APIUrl}/room-mgt/cancelSchedule`, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
    } catch (error) {
      console.log("Error cancelling schedule");
      throw error;
    }
  },

  addBulkData({ commit }, data) {
    commit("ADD_BULK_DATA", data);
  },
};
