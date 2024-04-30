import styles from "./AdminSideBar.module.css";
import dizivanLogo from "../../img/dizivan-logo.png";
import dashboardImgWhite from "../../img/Dashboard.png";
import dashboardImgBlue from "../../img/DashboardClicked.png";
import FormBlue from "../../img/form-blue.png";
import FormWhite from "../../img/form-white.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminSideBar() {
  const { currentTab } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div >
        <div className={styles.imageBox}>
          <div style={{marginRight: "5px"}}>
              <img src={dizivanLogo} />
          </div>
          <div>
            <span>DIZIVAN</span>
          </div>
        </div>
        
      </div>
      <div className={styles.general}>
        <div className={`${styles.heading} ${currentTab === 1 ? styles.selected : null}`} onClick={() => navigate("/")} >
          <img
            src={currentTab === 1 ? dashboardImgBlue : dashboardImgWhite}
          />
          <p>Dashboard</p>
        </div>
        <div className={`${styles.heading} ${currentTab === 2 ? styles.selected : null}`} onClick={() => navigate("/orders")}>
          <img src={currentTab === 2 ? FormBlue : FormWhite} />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
