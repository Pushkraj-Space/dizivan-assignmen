import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
    const [data, setData] = useState({
        name : "",
        email : "",
        mobile : "",
        feedback_type : "",
        feedback_details : "",
        product_service_name : ""
    })

    let url = `${import.meta.env.VITE_APP_API_URL}/api`;
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${url}/form/new`, data)
        if (response.status === 201) {
            alert("Your feedback is collected")
            setData({
                name : "",
                email : "",
                mobile : "",
                feedback_type : "",
                feedback_details : "",
                product_service_name : ""
            })
        }
    }
    console.log(29, data)
    return (
      <>
          <div class="container my-4">
              <div class="row justify-content-center">
                  <div class="col-lg-6">
                      <h1 class="mb-3"> Share your feedback</h1>
                      <form onSubmit={onSubmit}> 
                          <div class="row g-1">
                              <div class="col-md-12">
                                  <label for="name" class="form-label">Your Name</label>
                                  <input  onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, name : e.target.value}
                                    })
                                  }} type="text" class="form-control" id="name" name="name" value={data.name}required />
                              </div>
                              <div class="col-md-12">
                                  <label for="email" class="form-label">Your Email</label>
                                  <input onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, email : e.target.value}
                                    })
                                  }} type="email" class="form-control" id="email" name="email" value={data.email} required />
                              </div>
                              <div class="col-md-12">
                                  <label for="mobile" class="form-label">Your Mobile</label>
                                  <input onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, mobile : e.target.value}
                                    })
                                  }} type="phone" class="form-control" id="mobile" name="mobile" value={data.mobile} required />
                              </div>
                              <div class="col-md-12">
                                  <label for="feedback-type" class="form-label">Feedback type</label>
                                  <select onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, feedback_type : e.target.value}
                                    })
                                  }} class="form-control" id="feedback-type" name="feedback-type">
                                    <option value="" disabled selected>Select feedback type</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Suggestion">Suggestion</option>
                                    <option value="Complaint">Complaint</option>
                                </select>
                              </div>
                              <div class="col-md-12">
                                  <label for="service-name" class="form-label">Product/Service Name</label>
                                  <input onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, product_service_name : e.target.value}
                                    })
                                  }} type="phone" class="form-control" id="service-name" name="service-name" value={data.product_service_name} required />
                              </div>
                              <div class="col-12">
                                  <label for="message" class="form-label">Your Message</label>
                                  <textarea onChange={(e) => {
                                    setData((prev) => {
                                        return {...prev, feedback_details : e.target.value}
                                    })
                                  }} class="form-control" id="message" name="message" rows="5" value={data.feedback_details} required></textarea>
                              </div>
                              <div class="col-12">
                                  <div class="row">
                                      <div class="col-md-12">
                                          <button type="submit" class="btn btn-dark w-100 fw-bold" >Send</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </>
  );
};

export default Feedback;
