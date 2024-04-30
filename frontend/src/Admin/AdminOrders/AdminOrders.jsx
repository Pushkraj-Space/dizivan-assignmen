import { useEffect, useState } from "react";
import styles from "./AdminOrders.module.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  convertToTitleCaseFromUnderscores,
  formatDate,
} from "../../utils/utils";
import { Skeleton } from "@mui/material";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../features/admin/adminSlice";

// const URL = "http://localhost:5000/api/v1";
const URL = `${import.meta.env.VITE_APP_API_URL}/api`;

function AdminOrders() {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [num, setNum] = useState(0);
  const [startPagination, setStartPagination] = useState(1);
  const [showOrdersPage, setShowOrdersPage] = useState(false);
  const [order, setOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(setCurrentScreen(2));
    const data = searchParams.get("status");
    const data2 = searchParams.get("page");
    if (data2) {
      setSelected(+data2);
      const val = Math.floor(+data2 / 5) * 5;
      setStartPagination(val + 1);
    }

    if (data) {
      setSelectedOption(data);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [selected, selectedOption, filter]);

  const getData = () => {
    setLoading(true);

    let test;

    axios
      .get(
        `${URL}/admin/all-orders?page=${selected}&status=${selectedOption}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.getOrderDetails);
        setNum(Math.ceil(res.data.total / 8));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    setSearchParams({ page: currentPage, status: event.target.value });
  };

  const handleTableData = (val) => {
    setCurrentPage(val);
    setSearchParams({ status: selectedOption, page: val });
  };

  useEffect(() => {
    const val = searchParams.get("page");
    if (val) setSelected(+val);
    const status = searchParams.get("status");
    if (status) setSelectedOption(status);
  }, [searchParams]);

  const renderPaginationButton = () => {
    const divs = [];
    for (
      let i = startPagination;
      i <= Math.min(startPagination + 4, num);
      i++
    ) {
      divs.push(
        <div
          className={selected === i ? styles.selected : styles.notSelected}
          key={i}
          onClick={() => handleTableData(i)}
        >
          <p>{i}</p>
        </div>
      );
    }
    return divs;
  };

  const changePagination = (val) => {
    const temp = startPagination + val;

    setStartPagination(temp);
    handleTableData(temp);
  };

  const handleOrder = (obj) => {
    setOrder(obj);
    setShowOrdersPage(true);
  };

  return (
    <div className={styles.container}>
      {showOrdersPage ? (
        <OrderDetails order={order} setShowOrdersPage={setShowOrdersPage} />
      ) : (
        <>
          <div className={styles.operations}>
            <div>
              <div>
                <p>Nature of Feedback</p>
              </div>
              <select
                value={selectedOption}
                onChange={handleSelect}
                className={styles.dropdown}
              >
                <option value="">All</option>
                <option value="Complaint">Complaint</option>
                <option value="Feedback">Feedback</option>
                <option value="Suggestion">Suggestion</option>
              </select>
            </div>
            <div className={styles.rightBox}>
              {/* <div className={styles.createOrder}>
                <p><a href="https://app-dev.bharatgo.com">Add Feedback</a></p>
              </div> */}
            </div>
          </div>
          <div className={styles.columnHeading}>
            <div>
              <p>Form ID</p>
            </div>
            <div>
              <p>User Name</p>
            </div>
            <div>
              <p>User Mobile</p>
            </div>
            <div>
              <p>User Email</p>
            </div>
            <div>
              <p>Feedback Type</p>
            </div>
            <div>
              <p>Feedback Details</p>
            </div>
            <div>
              <p>Product Service Name</p>
            </div>
          </div>
          <div className={styles.main}>
            {loading ? (
              [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    paddingTop: "20px",
                    paddingBottom: "15px",
                    borderBottom: "2px solid #D9D9D9",
                  }}
                >
                  <Skeleton height={23} />
                </div>
              ))
            ) : (
              <>
                {data?.map((elem) => (
                  <div key={elem.id} className={styles.rowBox}>
                    <p onClick={() => handleOrder(elem)}>{elem.id}</p>
                    <p>{formatDate(elem.order_date)}</p>
                    <p>{elem.vendorsDetails.bharatgo_unique_id}</p>
                    <p>{elem.revcivers_name}</p>
                    <p>{convertToTitleCaseFromUnderscores(elem.order_type)}</p>
                    <p>
                      {convertToTitleCaseFromUnderscores(elem.payment_mode)}
                    </p>
                    <p>{convertToTitleCaseFromUnderscores(elem.status)}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className={styles.paginationBox}>
            {startPagination !== 1 && (
              <div
                className={styles.notSelected}
                onClick={() => changePagination(-5)}
              >
                <p>{"<"}</p>
              </div>
            )}
            {renderPaginationButton()}
            {!lastPage && (
              <div
                className={styles.notSelected}
                onClick={() => changePagination(5)}
              >
                <p>{">"}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrders;
