import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AdminLayout from "./Components/AdminLayout/AdminLayout.jsx";
import AdminSideBar from "./Components/AdminSideBar/AdminSideBar.jsx";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard.jsx";
import AdminNav from "./Components/AdminNav/AdminNav.jsx";
import AdminOrders from "./Admin/AdminOrders/AdminOrders.jsx";
import Feedback from './pages/feedback.jsx';

function App() {
  return (
    <BrowserRouter>
        <AdminLayout>
          <AdminSideBar />
          <AdminNav />
        </AdminLayout>
      <Routes>
        <Route path='/feedback-form' element = {<Feedback/>}/>
        <Route path="/" element={ <AdminDashboard /> } />
        <Route path="/orders" element={ <AdminOrders /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
