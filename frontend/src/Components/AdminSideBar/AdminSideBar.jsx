import styles from "./AdminSideBar.module.css";
import blueLogo from "../../img/blue logo 1 2.png";
import dashboardImgWhite from "../../img/Dashboard.png";
import dashboardImgBlue from "../../img/DashboardClicked.png";
import ordersBlue from "../../img/OrdersClicked.png";
import OrdersWhite from "../../img/Orders.png";
import storeIconblue from "../../img/storeIconBlue.png";
import storeIconWhite from "../../img/storeIconWhite.png";
import paymentIcon from "../../img/paymentIcon.png";
import deliverIcon from "../../img/deliverIcon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminSideBar() {
  const { currentTab } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={blueLogo} />
      </div>
      <div className={styles.general}>
        <div className={`${styles.heading} ${currentTab === 1 ? styles.selected : null}`} onClick={() => navigate("/")} >
          <img
            src={currentTab === 1 ? dashboardImgBlue : dashboardImgWhite}
          />
          <p>Dashboard</p>
        </div>
        <div className={`${styles.heading} ${currentTab === 2 ? styles.selected : null}`} onClick={() => navigate("/orders")}>
          <img src={currentTab === 2 ? ordersBlue : OrdersWhite} />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
