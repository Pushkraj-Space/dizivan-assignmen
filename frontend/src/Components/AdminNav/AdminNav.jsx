import styles from "./AdminNav.module.css";
import adminImage from "../../img/adminImage.png";
import { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

const URL = `${import.meta.env.VITE_APP_API_URL}/api`;

function AdminNav() {
  const [showProfile, setShowProfile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [imgLink, setImgLink] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(".profile") &&
        !event.target.closest("#profileCard")
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfile, showFilter]);

  useEffect(() => {
    axios
      .get(`${URL}/qr/link`)
      .then((res) => {
        setImgLink(res.payload.img_link);
      })
      .catch((err) => console.log(err));
  })

  const generateQRCode = () => {
      return window?.location?.origin + '/feedback-form';
  };

  return (
    <div className={styles.container}>
      <div className="profile" onClick={() => setShowProfile(!showProfile)}>
        <img src={adminImage} />
      </div>
      {showProfile && (
        <div className={styles.logOutBox} id="profileCard">
          <p>Feedback Form QR Code</p>
          <QRCode value={generateQRCode()} size={200} />
        </div>
      )}
    </div>
  );
}

export default AdminNav;
