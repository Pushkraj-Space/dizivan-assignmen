import react, { useState, createContext, useEffect } from "react";

export const Datacontext = createContext();

const DataProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  //   const [typeSelected, setTypeSelected] = useState(false);
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState("");
  //   const [catTypeSelected, setcatTypeSelected] = useState(false);
  const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState(null);
  const [selectedBusinessCategoryId, setSelectedBusinessCategoryId] =
    useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);
  const [catTypeSelected, setcatTypeSelected] = useState(false);
  const [otpVisible, setOtpVisible] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [timerActive, setTimerActive] = useState(false);
  const [resendBtnVisible, setResendBtnVisible] = useState(false);
  const [customer,setCustomer] = useState({})
  const [isEmailEdit, setIsEmailEdit] = useState(false);

  const resetValues = () => {
    setFullName("");
    setStoreName("");
    setEmailId("");
    setMobileNumber("");
    setSelectedBusinessType("");
    setSelectedBusinessCategory("");
    setSelectedBusinessTypeId(null);
    setSelectedBusinessCategoryId(null);
    setOtpVerified(false);
    setOtpSent(false);
    setShowVerifyButton(false);
    setTypeSelected(false);
    setcatTypeSelected(false);
    setOtpVisible(true);
    setEmailVerified(false);
    setIsEdit(false);
    setMinutes(1);
    setSeconds(59);
    setTimerActive(false);
    setResendBtnVisible(false);
    setCustomer({});
    setIsEmailEdit(false);
  };

  return (
    <Datacontext.Provider
      value={{
        selectedBusinessType,
        setSelectedBusinessType,
        mobileNumber,
        setMobileNumber,
        selectedBusinessCategory,
        setSelectedBusinessCategory,
        fullName,
        setFullName,
        storeName,
        setStoreName,
        emailId,
        setEmailId,
        selectedBusinessTypeId,
        setSelectedBusinessTypeId,
        selectedBusinessCategoryId,
        setSelectedBusinessCategoryId,
        otpVerified,
        setOtpVerified,
        otpSent,
        setOtpSent,
        otpVisible,
        setOtpVisible,
        showVerifyButton,
        setShowVerifyButton,
        typeSelected,
        setTypeSelected,
        catTypeSelected,
        setcatTypeSelected,
        emailVerified,
        setEmailVerified,
        isEdit,
        setIsEdit,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        timerActive,
        setTimerActive,
        resendBtnVisible,
        setResendBtnVisible,
        setCustomer,
        customer,
        isEmailEdit, 
        setIsEmailEdit,
        resetValues
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

export default DataProvider;
