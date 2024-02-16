import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function NotAuthLayout() {
  //로그인 상태일 때 회원가입, 로그인 페이지 접근 불가
  const isLogin = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin !== null) {
      navigate("/home");
    }
  });
  return (
    <div>
      <Outlet />
    </div>
  );
}
