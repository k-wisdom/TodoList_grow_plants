import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import InputWithBtn from "../components/frame/InputWithBtn";
import { SmallPlantCard } from "../group/plantCard/SmallPlantCard";
import { RootState, useAppDispatch } from "../store";
import { updatePlants } from "../store/plantsSlice";
import { SelectPlantCardWrap, Tutorial } from "../styles/plant.style";
import { ContentWrap, Main, TextCenter, Title } from "../styles/styles";
import API from "../utils/API";
import {
  AMOUNT_OF_USE_NUTRIENT,
  AMOUNT_OF_WATERING,
  DOUBLE_EFFECT_STANDARD,
  ERROR_MESSAGE,
  MAX_LEVEL,
} from "../utils/Constant";

type PlantsType = {
  id: number;
  name: string;
  type: string;
  img: string;
};

export default function SelectPlant() {
  const userSq = localStorage.getItem("userSq");
  const [plants, setPlants] = useState<PlantsType[]>([]);
  const [plantType, setPlantType] = useState("");
  const [plantName, setPlantName] = useState("");

  const { level } = useSelector((state: RootState) => state.plant.plantInfo);

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  //리다이렉트
  useEffect(() => {
    if (level !== 0) {
      navigator("/home");
    }
  }, [level, navigator]);

  const getPlants = async () => {
    const { data } = await API.get("/plantsList");
    setPlants(data);
    setPlantType(data[0].name);
  };
  useEffect(() => {
    getPlants();
  }, []);

  // 식물 선택
  const handleClick = async () => {
    if (plantType.length === 0) {
      alert("식물을 선택해 주세요.");
      return;
    }
    if (plantName.length === 0) {
      alert("식물의 이름을 지어주세요.");
      return;
    }

    const type = plants.filter(({ name }) => {
      return name === plantType;
    })[0].type;

    const param = {
      id: userSq,
      type,
      name: plantName,
      typeName: plantType,
      level: 1,
      growthRate: 0,
    };

    try {
      const response = await dispatch(updatePlants(param));
      if (response.payload.status === 200) {
        alert("등록되었습니다.");
        navigator("/");
      }
    } catch (error) {
      alert(ERROR_MESSAGE);
      console.error(error);
    }
  };

  return (
    <Main>
      <ContentWrap>
        <Title style={{ marginTop: "5rem" }}>식물을 선택하고 키워보세요!</Title>
        <Tutorial>
          <ol>
            <li>Todo List 목표를 달성하면 물과 영양제를 드려요.</li>
            <li>영양제는 1개 사용 시 {AMOUNT_OF_USE_NUTRIENT}씩 채워집니다.</li>
            <li>
              영양제가 {DOUBLE_EFFECT_STANDARD}% 이상 일 때 물을 주면 물주기
              효과가 2배가 됩니다.
            </li>
            <li>물주기 1회시 {AMOUNT_OF_WATERING}ml가 식물에게 적용됩니다.</li>
            <li>Lv.{MAX_LEVEL}이되면 성장 완료!</li>
          </ol>
        </Tutorial>
        <SelectPlantCardWrap>
          <b>식물 선택</b>
          {plants &&
            plants.map((plant: { name: string; img: string; id: number }) => {
              return (
                <SmallPlantCard
                  key={plant.id}
                  img={require(`../assets/img/${plant.img}`)}
                  name={plant.name}
                  plantType={plantType}
                  setPlantType={setPlantType}
                />
              );
            })}
        </SelectPlantCardWrap>
        <TextCenter style={{ margin: "3rem 0 10rem" }}>
          <InputWithBtn
            btnName="등록하기"
            placeholder="이름을 지어주세요."
            width="10rem"
            height="3rem"
            btnOnClick={handleClick}
            onChange={(e: any) => setPlantName(e.target.value)}
          />
        </TextCenter>
      </ContentWrap>
    </Main>
  );
}
