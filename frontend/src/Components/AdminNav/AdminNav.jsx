import styles from "./AdminNav.module.css";
import adminBell from "../../img/filterIcon.png";
import adminImage from "../../img/adminImage.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../features/admin/adminSlice";

function AdminNav() {
  const [showProfile, setShowProfile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

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

    function handleFilterClickOutside(event) {
      if (
        !event.target.closest(".filter") &&
        !event.target.closest("#filterCard")
      ) {
        setShowFilter(false);
      }
    }
    document.addEventListener("click", handleFilterClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleFilterClickOutside);
    };
  }, [showProfile, showFilter]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminMobile");
    navigate("/admin/login");
  };

  return (
    <div className={styles.container}>
      <div className="profile" onClick={() => setShowProfile(!showProfile)}>
        <img src={adminImage} />
      </div>
      {showProfile && (
        <div className={styles.logOutBox} id="profileCard">
          <p>{localStorage.getItem("adminMobile")} </p>
          <div onClick={handleLogout}>LogOut</div>
        </div>
      )}
    </div>
  );
}

export default AdminNav;
