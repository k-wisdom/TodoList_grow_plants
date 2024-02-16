import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import SquareBtn from "../components/buttons/SquareBtn";
import InputBox from "../components/frame/InputBox";
import Logo from "../components/Logo";
import Alert from "../components/popup/Alert";
import { CenterContentBox, FormBox, Title } from "../styles/styles";
import API from "../utils/API";

/* 회원가입 페이지 */

const message = {
  name: "이름을 올바르게 입력해주세요.",
  email: "이메일을 올바르게 입력해주세요.",
  password: "비밀번호는 8자 이상의 대소문자 + 숫자 + 특수문자로 입력해주세요.",
};

const regex = {
  name: /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  password:
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])[a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]{8,}$/,
};

type nameType = "name" | "email" | "password";

export default function SignUp() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    callback: () => {
      return;
    },
  });
  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const confirmPwdRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validationCheck = (name: nameType, value: string) => {
    if (regex[name].test(value)) {
      if (errorMsg.includes(message[name]))
        setErrorMsg(errorMsg.filter((element) => element !== message[name]));
    } else {
      if (!errorMsg.includes(message[name]))
        setErrorMsg([...errorMsg, message[name]]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validationCheck(name as nameType, value);
  };

  const comfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const message = "비밀번호가 일치하지 않습니다.";
    if (pwdRef.current?.value !== value) {
      if (!errorMsg.includes(message)) setErrorMsg([...errorMsg, message]);
    } else {
      if (errorMsg.includes(message))
        setErrorMsg(errorMsg.filter((element) => element !== message));
    }
  };

  useEffect(() => {
    if (nameRef.current && pwdRef.current && emailRef.current)
      if (
        nameRef.current.value.length > 0 &&
        pwdRef.current.value.length > 0 &&
        emailRef.current.value.length > 0 &&
        errorMsg.length === 0
      ) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
  }, [errorMsg]);

  // 회원가입 콜백함수
  const signUpCallback = () => {
    axios
      .all([
        API.post("/plants", { level: 0 }),
        API.post("/completePlants", { plants: [] }),
        API.post("/todos", { currentSq: 1, todoList: [] }),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          if (
            res1.status === 201 &&
            res2.status === 201 &&
            res3.status === 201
          ) {
            setAlert({
              message: "회원가입이 완료되었습니다.",
              callback: () => {
                navigate("/signin");
              },
            });
            setShowAlert(true);
          }
        }),
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newUser = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: pwdRef.current?.value,
    };

    try {
      const { status } = await API.post("/register", newUser);
      if (status === 201) {
        //회원가입 성공
        signUpCallback();
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setAlert({
          message: "이미 가입된 계정입니다.",
          callback: () => {
            return;
          },
        });
        setShowAlert(true);
      } else {
        setAlert({
          message:
            "회원가입 처리 중 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요.",
          callback: () => {
            return;
          },
        });
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      <CenterContentBox>
        <FormBox>
          <Logo size="2rem" center={true} />
          <Title>JOIN</Title>
          <form onSubmit={handleSubmit}>
            <InputBox
              type="text"
              label="이름"
              onChange={handleChange}
              name="name"
              ref={nameRef}
            />
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
            <InputBox
              type="password"
              label="비밀번호 &nbsp;&nbsp;확인"
              onChange={comfirmPassword}
              name="confirmPassword"
              ref={confirmPwdRef}
            />
            <div style={{ height: "3rem" }}>
              {errorMsg.length > 0 &&
                errorMsg.map((item, idx) => {
                  return <i key={idx}>{item}</i>;
                })}
            </div>
            <SquareBtn name="회원가입" isDisabled={btnDisabled}></SquareBtn>
          </form>
          <div className="login_etc">
            <NavLink to="/signin">로그인</NavLink>
          </div>
        </FormBox>
      </CenterContentBox>
      {showAlert && (
        <Alert
          text={alert.message}
          callback={alert.callback}
          setIsShow={setShowAlert}
        />
      )}
    </>
  );
}
