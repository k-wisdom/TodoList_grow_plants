import React, { useEffect, useState } from "react";
import { ContentWrap, Main, Title } from "../styles/styles";
import API from "../utils/API";
import { getUserSq } from "../utils/utils";
import { styled } from "styled-components";
import { MAX_LEVEL, PLANT_IMAGE, TPLANT_IMAGE_KEYS } from "../utils/Constant";

interface IMyPlant {
  name: string;
  date: string;
  typeName: string;
  type: TPLANT_IMAGE_KEYS;
}

export default function MyPlants() {
  const [data, setData] = useState([]);
  const userSq = getUserSq();

  useEffect(() => {
    const getData = () => {
      API.get(`/completePlants/${userSq}`)
        .then((res) => setData(res.data.plants))
        .catch((error) => console.error(error));
    };

    getData();
  }, [userSq]);

  return (
    <Main>
      <Wrapper>
        <ContentWrap>
          <Title>내가 키운 식물</Title>
          {data.length > 0 ?
          <PlantList>
              {data.map((d: IMyPlant) => {
                const img = PLANT_IMAGE[d.type][MAX_LEVEL - 1];
                return (
                  <CardPlant key={d.date + "_" + d.name}>
                    <b>{d.name}</b>
                    <img
                      src={require(`../assets/img/${img}`)}
                      alt={d.typeName}
                    />
                    <span>
                      <i>{d.typeName}</i>
                      <i>{d.date}</i>
                    </span>
                  </CardPlant>
                );
              })}
              </PlantList>
              :
              <Info>아직 Lv.{MAX_LEVEL}에 도달한 식물이 없습니다.</Info>
            }
          
        </ContentWrap>
      </Wrapper>
    </Main>
  );
}

const Wrapper = styled.div`
  padding: 8rem 0;
  min-height: calc(100vh - 3.5rem);
  box-sizing: border-box;
  background-color: rgb(131 219 255 / 22%);
`;

const PlantList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CardPlant = styled.li`
  padding: 1.2rem 1rem 1rem;
  width: calc((100% - 2rem) / 3);
  background-color: #fff;
  box-shadow: 0 4px 16px 0 rgba(40, 44, 47, 0.1);
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  font-size: 0.8rem;
  text-align: center;

  b {
    font-size: 1rem;
  }

  img {
    display: block;
    margin: auto;
    width: 80%;
    height: auto;
  }

  span {
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;

    i {
      font-style: normal;
      font-size: 0.6rem;
      color: #333;
    }
  }
`;

const Info = styled.p`
  padding: 1rem;
  background: #fff;
  text-align: center;
  font-size: 1.2rem;
`