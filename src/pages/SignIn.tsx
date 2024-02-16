import React, { FormEvent, useRef, useState } from "react";
import { CenterContentBox, FormBox, Title } from "../styles/styles";
import InputBox from "../components/frame/InputBox";
import SquareBtn from "../components/buttons/SquareBtn";
import { useNavigate } from "react-router";
import Alert from "../components/popup/Alert";
import { NavLink } from "react-router-dom";
import API from "../utils/API";
import { useAppDispatch } from "../store";
import { fetchPlants } from "../store/plantsSlice";
import Logo from "../components/Logo";

/* 로그인 페이지 */
export default function SignIn() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = () => {
    if (emailRef.current && pwdRef.current) {
      if (
        emailRef.current.value.length > 0 &&
        pwdRef.current.value.length > 0
      ) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    }
  };

  const loginCallback = async (userSq: number) => {
    const resultAction = await dispatch(fetchPlants(userSq));
    if (fetchPlants.fulfilled.match(resultAction)) {
      const plantInfo = resultAction.payload.data;
      //성공
      if (
        plantInfo.level === undefined ||
        plantInfo.type === undefined ||
        plantInfo.level === 0
      ) {
        navigate("/selectPlant");
      } else {
        navigate("/");
      }
    } else {
      //실패
      console.log(resultAction.error.message);
    }
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();

    const param = {
      email: emailRef.current?.value,
      password: pwdRef.current?.value,
    };

    try {
      const response = await API.post("/login", param);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("userSq", data.user.id);
        loginCallback(data.user.id);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //json-server의 경우 계정이 없으면 400으로 뜸
        setAlertMsg("일치하는 계정이 존재하지않습니다.");
        setShowAlert(true);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <CenterContentBox>
        <FormBox>
          <Logo size="2rem" center={true} />
          <Title>LOGIN</Title>
          <form onSubmit={handleClick}>
            <InputBox
              type="text"
              label="이메일"
              onChange={handleChange}
              name="email"
              ref={emailRef}
            />
            <InputBox
              type="password"
              label="비밀번호"
              onChange={handleChange}
              name="password"
              ref={pwdRef}
            />
            <SquareBtn name="로그인" isDisabled={btnDisabled}></SquareBtn>
          </form>
          <div className="login_etc">
            <NavLink to="/">회원가입</NavLink>
          </div>
        </FormBox>
      </CenterContentBox>
      {showAlert && <Alert text={alertMsg} setIsShow={setShowAlert} />}
    </>
  );
}
