import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlantCard from "../group/plantCard/PlantCard";
import { TodoList } from '../group/todoList/TodoList';
import { AppDispatch } from "../store";
import { fetchPlants, updatePlants } from "../store/plantsSlice";
import { MainTop } from "../styles/home.styles";
import { ColorSection, ContentWrap, Main, Title } from "../styles/styles";
import API from "../utils/API";
import SelectPlant from "./SelectPlant";

export default function Home() {
  const userSq = Number(localStorage.getItem("userSq"));
  const userName = localStorage.getItem("user_name");


  return (
    <Main>
      <MainTop>
        <ContentWrap>
          <p>
            안녕하세요. {userName}님,
            <br /> 오늘도 즐거운 하루 보내세요!
          </p>
        </ContentWrap>
      </MainTop>
      <Title>오늘의 할일을 완료하고 식물을 키워보아요!</Title>

      <section>
        <ContentWrap>
          <PlantCard />
        </ContentWrap>
      </section>
      <ColorSection>
        <ContentWrap>
          <TodoList />
        </ContentWrap>
      </ColorSection>
    </Main>
  );
}
