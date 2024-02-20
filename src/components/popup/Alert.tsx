import React, { ReactNode, useEffect } from "react";
import { styled } from "styled-components";
import { breakLineFn } from "../../utils/utils";

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 99999;
`;
const Popup = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2.5rem 1.25rem 2rem;
  width: 20rem;
  box-sizing: border-box;
  background: #fff;
  text-align: center;

  p {
    margin-bottom: 3rem;
  }
  button {
    font-size: 0.8rem;
    color: #fff;
    width: 5rem;
    height: 2rem;
    background: #000;
  }
`;

interface Props {
  text: string;
  callback?: () => void;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

export default function Alert({ text, callback, setIsShow, children }: Props) {
  useEffect(() => {
    //팝업 노출 시 스크롤 고정
    const body = document.querySelector("body") as HTMLElement;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  const closePopup = () => {
    if (callback) {
      callback();
    }
    setIsShow(false);
  };

  return (
    <Backdrop>
      <Popup>
        <p>{breakLineFn(text)}</p>
        {children}
        <button onClick={closePopup}>확인</button>
      </Popup>
    </Backdrop>
  );
}
