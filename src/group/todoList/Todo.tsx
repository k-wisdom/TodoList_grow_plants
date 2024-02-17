import React from "react";
import { styled } from "styled-components";
import { ITodo } from "./types";

interface Props extends ITodo {
  id: number;
  onChange: (e: any) => void;
  deleteFn: (id: number) => void;
  getRewardFn: (id: number) => void;
}

export default function Todo({
  id,
  text,
  isChecked,
  getReward,
  onChange,
  deleteFn,
  getRewardFn,
}: Props) {
  const inputId = String(id);
  return (
    <List>
      <TodoContent className={getReward ? "end" : ""}>
        <CheckBox>
          <input
            type="checkbox"
            id={inputId}
            className="hide"
            defaultChecked={isChecked}
            onChange={(e) => onChange(e)}
            disabled={getReward}
          />
          <label htmlFor={inputId}>{text}</label>
        </CheckBox>
      </TodoContent>
      <TodoBtnWrap>
        {isChecked && !getReward && (
          <BtnReward onClick={() => getRewardFn(id)}>보상받기</BtnReward>
        )}
        <BtnDelete onClick={() => deleteFn(id)}>
          <span className="hide">삭제</span>
        </BtnDelete>
      </TodoBtnWrap>
    </List>
  );
}

const TodoContent = styled.div`
  position: relative;
  flex-grow: 1;
  width: 80%;
  &.end {
    opacity: 0.5;
    &:after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background: #000;
    }
  }

  // p {
  //   display: inline-block;
  //   max-width: 80%;
  // }
`;

const CheckBox = styled.span`
  display: block;

  input {
    &:checked + label {
      &:before{
        background-image: url(${require("../../assets/img/ico_check_on.png")});
      }
    }
    &:disabled {
      opacity: 0.5;
    }
  }
  label {
    display: block;
    position:relative;
    padding-left: 2.2rem;
    box-sizing:border-box;
    &:before{
      position:absolute;
      left:0;
      top: calc(50% - 0.7rem);
      content: '';
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url(${require("../../assets/img/ico_check_off.png")}) no-repeat
        center / 100%;
      vertical-align:middle;
    }
  }
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
  min-height: 2rem;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const TodoBtnWrap = styled.div`
  flex-shrink: 0;
  button {
    margin: 0 0.5rem;
  }
`;

const BtnDelete = styled.button`
  opacity: 0.5;
  width: 1rem;
  height: 1.5rem;
  background: url(${require("../../assets/img/ico_delete.png")}) no-repeat
    center / 100%;
`;

const BtnReward = styled.button`
  padding: 0 0.5rem;
  height: 1.5rem;
  background-color: #5ab380;
  border-radius: 0.6rem;
  font-size: 0.7rem;
  color: #fff;
`;
