import React, { useEffect } from "react";
import Alert from "./Alert";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import { updateGrowthMaterial } from "../../store/plantsSlice";
import { getUserSq } from "../../utils/utils";
import { ERROR_MESSAGE } from "../../utils/Constant";

const GiftContent = styled.div`
  margin-bottom: 1rem;
  span {
    display: inline-block;
    margin-right: 2rem;
    width: 4rem;
    height: 4rem;
    white-space: nowrap;
    img {
      width: 70%;
      height: auto;
    }
  }
`;
interface Props {
  message: string;
  water?: number;
  nutrientCount?: number;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GiftAlert({
  message,
  water = 0,
  nutrientCount = 0,
  setIsShow,
}: Props) {
  const userSq = getUserSq();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //확인 버튼 클릭 여부에 관계없이 선물은 무조건 적용
    const applyGift = async () => {
      const param = {
        id: userSq,
        water: water,
        nutrientCount: nutrientCount,
      };

      const res = await dispatch(updateGrowthMaterial(param));
      if (res.payload === undefined || res.payload.status !== 200) {
        alert(ERROR_MESSAGE);
        return;
      }
    };
    applyGift();
  }, [dispatch, nutrientCount, userSq, water]);

  return (
    <Alert text={message} setIsShow={setIsShow}>
      <GiftContent>
        {water > 0 && (
          <span>
            <img src={require("../../assets/img/ico_water.png")} alt="물" />x
            {water}ml
          </span>
        )}
        {nutrientCount > 0 && (
          <span>
            <img
              src={require("../../assets/img/img_nutrient.png")}
              alt="영양제"
            />
            x{nutrientCount}개
          </span>
        )}
      </GiftContent>
    </Alert>
  );
}
