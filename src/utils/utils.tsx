import React from "react";

//줄바꿈
export function breakLineFn(text: string) {
  return text.split("\n").map((txt, index) => (
    <React.Fragment key={index}>
      {txt}
      <br />
    </React.Fragment>
  ));
}

/** 숫자 콤마 포맷 **/
export function numComma(value: string | number) {
  value = value.toString().replace(/,/g, "");
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** userSq 가져오기 **/
export function getUserSq() {
  return Number(localStorage.getItem("userSq"));
}

/** DATE 포맷  **/
interface Datetype {
  getFullYear: () => void;
  getMonth: () => number;
  getDate: () => void;
}
export const dateFormat = (date: Datetype) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;
  return dateString;
};

/** 랜덤 숫자 생성 **/
export const randomNumnBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
