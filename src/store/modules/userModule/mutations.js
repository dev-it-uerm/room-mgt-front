export default {
  SET_LOGIN_DATA(state, data) {
    state.token = data.token;
    state.employeeId = data.employeeId;
    state.employeeFullName = data.employeeFullName;
    state.employeeDeptCode = data.employeeDeptCode;
    state.employeeDeptDesc = data.employeeDeptDesc;
  },

  SET_LOGIN_DATA_DEFAULT(state) {
    state.token = null;
    state.employeeId = null;
    state.employeeFullName = null;
    state.employeeDeptCode = null;
    state.employeeDeptDesc = null;
  },
};
