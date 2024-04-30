import styles from "./StoreDetails.module.css";
import leftArrow from "../../img/leftArrow.svg";
import shareIcon from "../../img/shareIcon.png";
import ordersImage from "../../img/ordersImage.png";
import salesImage from "../../img/salesImage.png";
import {
  arrToString,
  convertTo12HourFormat,
  formatDate,
  formatDateTwo,
  formatNumberWithCommasNum,
} from "../../utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";

// const URL = "http://localhost:5000/api/v1";
const URL = `${import.meta.env.VITE_APP_API_URL}/api/v1`;

function StoreDetails(props) {
  const { selectedStore, setShowStoreDetails } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(
      `${URL}/admin/orders/vendor/${selectedStore.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    setData(res.data);
    setLoading(false);
  };

  return (
    <>
      <div className={styles.heading}>
        <div className={styles.orderId}>
          <img src={leftArrow} onClick={() => setShowStoreDetails(false)} />
          <p>
            Store Information <span>#{selectedStore.id}</span>
          </p>
        </div>
        <div className={styles.rightHeading}>
          <div>
            <img src={shareIcon} />
          </div>
          <div>Edit Store</div>
        </div>
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.leftOrder}>
          <div>
            <p>Registered On:</p>
            <p>{formatDate(selectedStore.created_on)}</p>
          </div>
          <div>
            <p>Store Status:</p>
            <p>Created</p>
          </div>
          <div>
            <p>Store Name:</p>
            <p>{selectedStore.businessDetails.business_name}</p>
          </div>
          <div>
            <p>Owner Name:</p>
            <p>{selectedStore.vendor_name}</p>
          </div>
          <div>
            <p>Delivery Mode:</p>
            <p>{selectedStore.businessDetails.delivery_type}</p>
          </div>
          <div>
            <p>Payment Method:</p>
            <p>
              {selectedStore.businessDetails.is_offline_payments_available ||
              selectedStore.businessDetails.is_online_payment_available ? (
                <>
                  {selectedStore.businessDetails
                    .is_offline_payments_available && <span>CASH & </span>}
                  {selectedStore.businessDetails
                    .is_online_payment_available && (
                    <span>BharatGo Payment</span>
                  )}
                </>
              ) : (
                <p>Not set yet</p>
              )}
            </p>
          </div>
          <div>
            <p>Current Plan:</p>
            <p>
              {selectedStore.planDetails.plan_id === "1"
                ? "Spark"
                : selectedStore.planDetails.plan_id === "2"
                ? "Success"
                : "Super Saver"}
            </p>
          </div>
        </div>
        <div className={styles.rightOrder}>
          <div>
            <p>Store Opening Timing: </p>
            {selectedStore.businessDetails.general_opening_time ||
            selectedStore.businessDetails.general_closing_time ? (
              <p>
                {convertTo12HourFormat(
                  selectedStore.businessDetails.general_opening_time
                )}{" "}
                To{" "}
                {convertTo12HourFormat(
                  selectedStore.businessDetails.general_closing_time
                )}
              </p>
            ) : (
              <p>Time not set</p>
            )}
          </div>
          <div>
            <p>Store Opening Days: </p>
            {selectedStore.businessDetails.days_open ? (
              <p>{arrToString(selectedStore.businessDetails.days_open)}</p>
            ) : (
              <p>Not set yet</p>
            )}
          </div>
          <div>
            <p>Store Address: </p>
            <p>
              {selectedStore.businessDetails.address_line1 ||
              selectedStore.businessDetails.address_line2 ? (
                <>
                  {selectedStore.businessDetails.address_line1}{" "}
                  {selectedStore.businessDetails.address_line2}
                </>
              ) : (
                <p>Not set Yet</p>
              )}
            </p>
          </div>
          <div>
            <p>Contact Number: </p>
            <p>+91 {selectedStore.registered_mobileno}</p>
          </div>
          <div>
            <p>Contact Email: </p>
            <p>{selectedStore.vendor_emailid}</p>
          </div>
          <div>
            <p>Business Category: </p>
            <p>
              {selectedStore.businessDetails.ShopCategoryDetails.category_name}
            </p>
          </div>
          <div>
            <p>Expires at: </p>
            <p>{formatDateTwo(selectedStore.planDetails.expiry_date)}</p>
          </div>
        </div>
      </div>
      <div className={styles.performance}>
        <p>Stores Performance</p>
        <div className={styles.cardContainer}>
          <div className={styles.singleCard}>
            <div className={styles.cardImageBox}>
              <img src={ordersImage} />
              <p>Todays Orders</p>
            </div>
            {loading ? <p>...loading</p> : <p>{data?.ordersCountToday}</p>}
          </div>
          <div className={styles.singleCard}>
            <div className={styles.cardImageBox}>
              <img src={salesImage} />
              <p>Todays Sales</p>
            </div>
            <p>
              {loading ? (
                <span>...loading</span>
              ) : (
                <span>
                  {!data?.todaysSales[0].totalSales
                    ? "00"
                    : formatNumberWithCommasNum(
                        data?.todaysSales[0].totalSales
                      )}
                </span>
              )}
            </p>
          </div>
          <div className={styles.singleCard}>
            <div className={styles.cardImageBox}>
              <img src={ordersImage} />
              <p>Total Orders</p>
            </div>
            {loading ? <p>...loading</p> : <p>{data?.allOrdersCount}</p>}
          </div>
          <div className={styles.singleCard}>
            <div className={styles.cardImageBox}>
              <img src={salesImage} />
              <p>Total Sales</p>
            </div>
            <p>
              {loading ? (
                <span>...loading</span>
              ) : (
                <span>
                  {!data?.overallSales[0].totalSales
                    ? "00"
                    : formatNumberWithCommasNum(
                        data?.overallSales[0].totalSales
                      )}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreDetails;
