import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: "",
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  allScheduleTime: [],
  allRequiredInfor: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        genders: [],
        isLoadingGender: false,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.data,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
        positions: [],
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        roles: [],
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        users: [],
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: action.data,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      return {
        ...state,
        doctors: [],
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: action.data,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
        doctors: [],
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      return {
        ...state,
        allScheduleTime: action.dataTime,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      return {
        ...state,
        allScheduleTime: [],
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      console.log("fetch required doctor infor", action);
      return {
        ...state,
        allRequiredInfor: action.data,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      return {
        ...state,
        allRequiredInfor: {},
      };
    default:
      return state;
  }
};

export default adminReducer;
