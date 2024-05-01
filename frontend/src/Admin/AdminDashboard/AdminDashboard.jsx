import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useSearchParams } from "react-router-dom";
import totalOrderIcon from "../../img/totalOrderIcon.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../features/admin/adminSlice.js";

const URL = `${import.meta.env.VITE_APP_API_URL}/api`;

function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [selected, setSelected] = useState("today");
  const [data, setData] = useState([
    {
      feedback_type : "No records",
      count : 0
    },
    {
      feedback_type : "No records",
      count : 0
    },
    {
      feedback_type : "No records",
      count : 0
    }
  ]);
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
    let url = `${URL}/form/dashboard?time=${selected}`;
    axios
      .get(url)
      .then((res) => {
        console.log(46, res.data)
        setData(res.data.payload);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getDashboardData = (data, For) => {
    if(For == 'Type'){
      if(data.length > 0){
        return data[0].feedback_type
      }
    }else if(For == 'Count'){
      let cnt = 0;
      for(let i=0; i<data.length; i++){
        cnt += parseInt(data[i].count)
      }
      return cnt;
    }else{
      return 'No Data Found'
    }

  }
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
          <img src={totalOrderIcon} />
            <p>Feedback Received</p>
          </div>
          {loading ? <p>...loading</p> : <p>{getDashboardData(data, 'Count')}</p>}
        </div>
        <div className={styles.singleCard}>
          <div className={styles.cardImageBox}>
            <img src={totalOrderIcon} />
            <p>Most Common Feedback</p>
          </div>
          {loading ? <p>...loading</p> : <p>{getDashboardData(data, 'Type')}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
