import React from "react";
import { Title } from "../../styles/styles";
import { styled } from "styled-components";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function SectionTodoList() {
  return (
    <>
      <CenterWrap>
        <Title>오늘의 할 일</Title>
        <Wrapper>
          <TodoInput />
        </Wrapper>
      </CenterWrap>
      <Wrapper>
        <TodoList />
      </Wrapper>
    </>
  );
}

const CenterWrap = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.2rem;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 1rem;
`;
