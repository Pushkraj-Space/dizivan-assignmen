import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useSearchParams } from "react-router-dom";
import totalSalesIcon from "../../img/totalSalesIcon.png";
import totalOrderIcon from "../../img/totalOrderIcon.png";
import revenueIcon from "../../img/revenueIcon.png";
import storeIcon from "../../img/storeIcon.png";
import axios from "axios";
import { formatNumberWithCommasNum } from "../../utils/utils.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../features/admin/adminSlice.js";

// const URL = "http://localhost:5000/api/v1";
const URL = `${import.meta.env.VITE_APP_API_URL}/api/v1`;

function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [selected, setSelected] = useState("today");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(setCurrentScreen(1));
  }, []);

  const handleClick = (val) => {
    setSearchParams({ time: val });
  };

  useEffect(() => {
    const val = searchParams.get("time");
    if (!val) setSelected("today");
    else if (val === "weekly") setSelected("weekly");
    else if (val === "monthly") setSelected("monthly");
    else if (val === "total") setSelected("total");
  }, [searchParams]);

  useEffect(() => {
    getData();
  }, [selected, filter]);

  const getData = () => {
    setLoading(true);

    let test;
    if (filter === "all") test = "both";
    else if (filter === "demo") test = "test";
    else if (filter === "real") test = "real";

    console.log(selected);
    console.log(test);
    // let url = `${URL}/admin/dashboard?time=${selected}&is_test=${test}`;
    let url = `${URL}/admin/dashboard?time=${selected}&is_test=${test}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setData(res.data.payload);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <p
          className={
            selected === "today" ? styles.selected : styles.notSelected
          }
          onClick={() => handleClick("")}
        >
          Today
        </p>
        <p
          className={
            selected === "weekly" ? styles.selected : styles.notSelected
          }
          onClick={() => handleClick("weekly")}
        >
          Weekly
        </p>
        <p
          className={
            selected === "monthly" ? styles.selected : styles.notSelected
          }
          onClick={() => handleClick("monthly")}
        >
          Monthly
        </p>
        <p
          className={
            selected === "total" ? styles.selected : styles.notSelected
          }
          onClick={() => handleClick("total")}
        >
          Total
        </p>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.singleCard}>
          <div className={styles.cardImageBox}>
            <img src={storeIcon} />
            <p>Stores</p>
          </div>
          {loading ? <p>...loading</p> : <p>{data?.storeCount}</p>}
        </div>
        <div className={styles.singleCard}>
          <div className={styles.cardImageBox}>
            <img src={revenueIcon} />
            <p>Revenue</p>
          </div>
          <p>
            ₹{" "}
            {loading ? (
              <span>...loading</span>
            ) : (
              <span>
                {!data?.revenueData
                  ? "00"
                  : formatNumberWithCommasNum(data?.revenueData)}
              </span>
            )}
          </p>
        </div>
        <div className={styles.singleCard}>
          <div className={styles.cardImageBox}>
            <img src={totalOrderIcon} />
            <p>Total Orders</p>
          </div>
          {loading ? <p>...loading</p> : <p>{data?.orderCount}</p>}
        </div>
        <div className={styles.singleCard}>
          <div className={styles.cardImageBox}>
            <img src={totalSalesIcon} />
            <p>Total Sales</p>
          </div>
          <p>
            ₹{" "}
            {loading ? (
              <span>...loading</span>
            ) : (
              <span>
                {!data?.totalOrderSales
                  ? "00"
                  : formatNumberWithCommasNum(data?.totalOrderSales)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
