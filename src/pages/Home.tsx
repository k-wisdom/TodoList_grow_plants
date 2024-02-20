import React, { useEffect } from "react";
import PlantCard from "../group/plantCard/PlantCard";
import SectionTodoList from "../group/todoList/SectionTodoList";
import { useAppDispatch } from "../store";
import { fetchPlants } from "../store/plantsSlice";
import { fetchTodos } from "../store/todoSlice";
import { MainTop } from "../styles/home.styles";
import { ColorSection, ContentWrap, Main, Section } from "../styles/styles";
import { getUserSq } from "../utils/utils";

export default function Home() {
  const userName = localStorage.getItem("user_name");

  const userSq = getUserSq();
  const dispatch = useAppDispatch();

  //데이터 가져오기
  useEffect(() => {
    const resultAction = dispatch(fetchTodos());
    return () => {
      resultAction.abort()
    }
  },[userSq, dispatch])

  useEffect(() => {
    const resultAction = dispatch(fetchPlants(userSq));
    return() => {
      resultAction.abort()
    }
  },[userSq, dispatch])

  return (
    <Main>
      <MainTop>
        <ContentWrap>
          <p>
            안녕하세요. {userName}님,
            <br /> 오늘의 할 일을 완료하고 식물을 키워보아요!
          </p>
        </ContentWrap>
      </MainTop>
      <Section>
        <ContentWrap>
          <PlantCard />
        </ContentWrap>
      </Section>
      <ColorSection>
        <ContentWrap>
          <SectionTodoList />
        </ContentWrap>
      </ColorSection>
    </Main>
  );
}
