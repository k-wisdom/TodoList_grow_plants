import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Alert from "../popup/Alert";
import Header from "./Header";

export default function AuthLayout() {
  //미로그인 상태일 때, 권한이 필요한 페이지 접근 제어
  const [showAlert, setShowAlert] = useState(false);
  const isLogin = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === null) {
      setShowAlert(true);
    }
  }, [isLogin]);

  return (
    <div>
      <Header />
      <Outlet />
      {showAlert && (
        <Alert
          text={"로그인이 필요한 서비스 입니다."}
          callback={() => navigate("/signin")}
          setIsShow={setShowAlert}
        />
      )}
    </div>
  );
}
