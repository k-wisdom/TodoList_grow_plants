import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import IconTxtBtn from "../../components/buttons/IconTxtBtn";
import BlinkStar from "../../components/items/BlinkStar";
import { DropWater } from "../../components/items/DropWater";
import GiftAlert from "../../components/popup/GiftAlert";
import { ListPopup } from "../../components/popup/ListPopup";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { selectPlant, updatePlants } from "../../store/plantsSlice";
import {
  BottomBtnWrap,
  NutritionBar,
  PlantImgWrap,
  PlantInfo,
  PlantWrapper,
  ProgressBar,
} from "../../styles/plant.style";
import API from "../../utils/API";
import {
  AMOUNT_OF_ADD_NUTRIENT,
  AMOUNT_OF_USE_NUTRIENT,
  AMOUNT_OF_WATERING,
  CalculateGrowth,
  ERROR_MESSAGE,
  MAX_LEVEL,
  PLANT_IMAGE,
  TPLANT_IMAGE_KEYS,
} from "../../utils/Constant";
import { dateFormat } from "../../utils/utils";
import PlantNameBox from "./PlantNameBox";

export default function PlantCard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const {
    name,
    typeName,
    type,
    level,
    nutrientCount,
    nutrient,
    water,
    growthRate,
  } = useAppSelector(selectPlant);
  const userSq = Number(localStorage.getItem("userSq"));

  const [showWater, setShowWater] = useState(false);
  const [showBlinkStar, setShowBlinkStar] = useState(false);

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  //리다이렉트
  useEffect(() => {
    if (level === 0) {
      navigator("/selectPlant");
    }
  }, [level, navigator]);

  // 영양제 주기 버튼 클릭
  const clickNutrientBtnFn = async () => {
    if (showBlinkStar) {
      return;
    }
    setShowBlinkStar(true);

    const param = {
      id: userSq,
      nutrientCount: nutrientCount - 1,
      nutrient: nutrient + AMOUNT_OF_ADD_NUTRIENT,
    };
    try {
      await dispatch(updatePlants(param));
    } catch {
      alert(ERROR_MESSAGE);
    }
  };

  const MaxLevelup = async () => {
    //최고 레벨 도달
    let {
      data: { plants },
    } = await API.get(`/completePlants/${userSq}`);
    const param = {
      plants: [
        ...plants,
        {
          date: dateFormat(new Date()),
          type: type,
          name: name,
          typeName: typeName,
        },
      ],
    };
    try {
      await API.patch(`/completePlants/${userSq}`, param);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // 물 주기 버튼 클릭
  const clickWaterBtnFn = async () => {
    let islevelUp = false;

    if (showWater) {
      return;
    }
    setShowWater(true);

    const increase = CalculateGrowth(level, nutrient);
    let newLevel = level;
    let newGrowthRate = increase + growthRate;
    if (newGrowthRate >= 100) {
      //레벨업
      if (level === MAX_LEVEL) {
        //최고 레벨 도달
        if (await MaxLevelup()) {
          newLevel = 0;
          newGrowthRate = 0;
        } else {
          return;
        }
      } else {
        newLevel = level + 1;
        newGrowthRate = newGrowthRate - 100;
      }
      islevelUp = true;
    }

    const param = {
      id: userSq,
      nutrient: Math.max(0, nutrient - AMOUNT_OF_USE_NUTRIENT),
      water: water - AMOUNT_OF_WATERING,
      growthRate: newGrowthRate,
      level: newLevel,
    };

    try {
      await dispatch(updatePlants(param));
      if (islevelUp) {
        if (level !== MAX_LEVEL) {
          setShowGiftPopup(true);
        } else {
          alert("식물이 다 자랐어요! \n 새로운 식물을 키워보세요.");
          navigator("/selectPlant");
        }
      }
    } catch (error) {
      console.log(error);
      alert(ERROR_MESSAGE);
    }
  };

  const nutrientGaugeHeigth = nutrient > 100 ? 100 : nutrient;
  const key = type as TPLANT_IMAGE_KEYS;
  const idx = level - 1;
  const plantImage = type.length > 0 ? PLANT_IMAGE[key][idx] : null;

  return (
    <>
      <PlantWrapper>
        <NutritionBar>
          <div>
            <span>{nutrient}</span>
            <i>물효과x2</i>
            <div
              className="nutrients_gauge"
              style={{ height: nutrientGaugeHeigth + "%" }}
            ></div>
          </div>
        </NutritionBar>

        <PlantImgWrap>
          {showWater && <DropWater setIsShow={setShowWater} />}
          {showBlinkStar && <BlinkStar setIsShow={setShowBlinkStar} />}
          {plantImage && (
            <img
              src={require(`../../assets/img/${plantImage}`)}
              alt={typeName}
            />
          )}
        </PlantImgWrap>

        <PlantInfo>
          <PlantNameBox />
          <ProgressBar>
            <div style={{ width: growthRate + "%" }}></div>
            <i>{growthRate}%</i>
          </ProgressBar>
        </PlantInfo>

        <BottomBtnWrap>
          <IconTxtBtn
            name="영양제 주기"
            content={`${nutrientCount}개`}
            img={require("../../assets/img/img_nutrient.png")}
            onClick={clickNutrientBtnFn}
            disabled={nutrientCount! <= 0}
          />
          <IconTxtBtn
            name="물 주기"
            content={`${water}ml`}
            img={require("../../assets/img/ico_water.png")}
            onClick={clickWaterBtnFn}
            disabled={water! < AMOUNT_OF_WATERING}
          />
        </BottomBtnWrap>
      </PlantWrapper>
      {showPopup && <ListPopup setShowPopup={setShowPopup} />}
      {showGiftPopup && (
        <GiftAlert
          setIsShow={setShowGiftPopup}
          water={50}
          nutrientCount={4}
          message={"레벨업을 축하합니다!🥳"}
        />
      )}
    </>
  );
}
