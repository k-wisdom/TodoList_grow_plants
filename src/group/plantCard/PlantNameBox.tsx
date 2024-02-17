import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputWithBtn from "../../components/frame/InputWithBtn";
import { RootState, useAppDispatch } from "../../store";
import { updatePlants } from "../../store/plantsSlice";
import { ERROR_MESSAGE } from "../../utils/Constant";

export default function PlantNameBox() {
  const [isEditName, setIsEditName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const userSq = Number(localStorage.getItem("userSq"));
  const { level, name } = useSelector(
    (state: RootState) => state.plant.plantInfo,
  );
  const dispatch = useAppDispatch();

  //이름 변경
  const editNameFn = async () => {
    const param = {
      id: userSq,
      name: inputRef.current!.value,
    };
    try {
      const response = await dispatch(updatePlants(param));
      if (response.payload.status === 200) {
        setIsEditName(false);
      }
    } catch {
      alert(ERROR_MESSAGE);
    }
  };

  return (
    <div style={{minHeight: '2rem'}}>
      <span>Lv.{level}</span>
      {!isEditName ? (
        <button className="plant_name" onClick={() => setIsEditName(true)}>
          {name}
        </button>
      ) : (
        <InputWithBtn
          btnName="변경"
          value={name as string}
          btnOnClick={() => editNameFn()}
          ref={inputRef}
        />
      )}
    </div>
  );
}
