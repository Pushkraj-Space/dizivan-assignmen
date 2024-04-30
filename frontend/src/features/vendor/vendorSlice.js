import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGuideClicked: false,
  mobGuideClicked: false,
  sideBarTab: 1,
  showMobileNavHeader: false,
  mobileNavHeaderText: "",
  dashboardGuidedTourCompleted: false,
  runJoyRideState: false,
  noOfOrders: 0,
  businessTab: 1,
  phonePaySwitch: false,
  razorPaySwitch: false,
  expiryDate: false,
  currentPlanId: 1,
  plans: [],
  firstTime : false
};

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setIsGuideClickedStatus: (state, { payload }) => {
      state.isGuideClicked = payload;
    },
    changeMobGuideClicked: (state, { payload }) => {
      state.mobGuideClicked = payload;
    },
    setSideBarTab: (state, { payload }) => {
      state.sideBarTab = payload;
    },
    setMobileNav: (state, { payload }) => {
      state.showMobileNavHeader = payload.showMobileNavHeader;
      state.mobileNavHeaderText = payload.mobileNavHeaderText;
    },
    setIsDashboardGuidedClicked: (state, { payload }) => {
      state.dashboardGuidedTourCompleted = payload;
    },
    setRunJoyRideState: (state, { payload }) => {
      state.runJoyRideState = payload;
    },
    setNoOfOrders: (state, { payload }) => {
      state.noOfOrders = payload;
    },
    decreaseOrderNo: (state) => {
      state.noOfOrders = state.noOfOrders - 1;
    },
    setBusinessTab: (state, { payload }) => {
      state.businessTab = payload;
    },
    handleSwitch: (state, { payload }) => {
      if (payload === "Razorpay") state.phonePaySwitch = true;
      else state.razorPaySwitch = true;
    },
    handleExpiryDate: (state, { payload }) => {
      state.expiryDate = payload;
    },
    setCurrentPlanId: (state, { payload }) => {
      state.currentPlanId = payload;
    },
    setPlans: (state, { payload }) => {
      state.plans = payload;
    },
    setFirstTime: (state, {payload}) => {
      state.firstTime = payload
    }
  },
});

export const {
  setIsGuideClickedStatus,
  changeMobGuideClicked,
  setSideBarTab,
  setMobileNav,
  setIsDashboardGuidedClicked,
  setRunJoyRideState,
  setNoOfOrders,
  decreaseOrderNo,
  setBusinessTab,
  handleSwitch,
  handleExpiryDate,
  setCurrentPlanId,
  setPlans,
  setFirstTime
} = vendorSlice.actions;

export default vendorSlice.reducer;
