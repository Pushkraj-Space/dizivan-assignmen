import styles from "./OrderDetails.module.css";
import leftArrow from "../../img/leftArrow.svg";
// import shareIcon from "../../img/shareIcon.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  addEllipsis,
  convertToTitleCaseFromUnderscores,
  formatDate,
} from "../../utils/utils";

// const URL = "http://localhost:5000/api/v1";
const URL = `${import.meta.env.VITE_APP_API_URL}/api/v1`;

function OrderDetails(props) {
  const [orders, setOrders] = useState(null);
  const { order, setShowOrdersPage } = props;

  useEffect(() => {
    axios
      .get(`${URL}/admin/allorders/vendor/${order.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.leftHeading}>
          <div className={styles.orderId}>
            <img src={leftArrow} onClick={() => setShowOrdersPage(false)} />
            <p>
              Order Information <span>#{order.id}</span>
            </p>
          </div>
          <p>{formatDate(order.order_date)}</p>
        </div>
        <div className={styles.rightHeading}>
          <div>
            {/* <img src={shareIcon} /> */}
          </div>
          <div>Print</div>
        </div>
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.leftOrder}>
          <div>
            <p>Order Status:</p>
            <p>{convertToTitleCaseFromUnderscores(order.status)}</p>
          </div>
          <div>
            <p>Store Name:</p>
            <p>{order.vendorsDetails.bharatgo_unique_id}</p>
          </div>
          <div>
            <p>Customer Name:</p>
            <p>{order.revcivers_name}</p>
          </div>
          <div>
            <p>Delivery Mode:</p>
            <p>{convertToTitleCaseFromUnderscores(order.order_type)}</p>
          </div>
          <div>
            <p>Delivery ID:</p>
            <p>#1234567890</p>
          </div>
          <div>
            <p>Payment Method:</p>
            <p>{convertToTitleCaseFromUnderscores(order.payment_mode)}</p>
          </div>
        </div>
        <div className={styles.rightOrder}>
          <div>
            <p>Sub Total: </p>
            <p>₹ {order.sub_total}</p>
          </div>
          <div>
            <p>Delivery Charges: </p>
            <p>₹ {order.delivery_fees}</p>
          </div>
          <div>
            <p>Discount: </p>
            <p>- ₹ {order.offer_discount}</p>
          </div>
          <div className={styles.priceLast}>
            <p>Taxes: </p>
            <p>₹ {order.tax_on_products}</p>
          </div>
          <div>
            <p>Total Amount: </p>
            <p>
              ₹{" "}
              {order.sub_total +
                order.delivery_fees -
                order.offer_discount +
                order.tax_on_products}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.allOrders}>
        <p>Order Details</p>
        <div className={styles.orderHeading}>
          <p>No.</p>
          <p>Product Name</p>
          <p>Qty</p>
          <p>Price</p>
          <p>Total Price (Inclusive Tax)</p>
        </div>
        <div className={styles.productDetails}>
          {orders?.map((elem, i) => (
            <div className={styles.singleProduct} key={elem.id}>
              <p>{i + 1}.</p>
              <p>{addEllipsis(elem.product_name)}</p>
              <p>{elem.quantity}</p>
              <p>₹{elem.mrp}</p>
              <p>
                ₹{elem.quantity * (elem.discount + elem.sale_price + elem.tax)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
