import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const [adminNav, setAdminNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/feedback-form")) setAdminNav(false);
  }, [location]);

  return <div>{adminNav ? children : null}</div>;
}

export default AdminLayout;
