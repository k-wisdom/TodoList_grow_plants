import React, { useCallback, useState } from "react";
import { randomNumnBetween } from "../../utils/utils";
import Todo from "./Todo";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteTodos, selectTodoList, updateTodos } from "../../store/todoSlice";
import GiftAlert from "../../components/popup/GiftAlert";

export default function TodoList() {
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);

  const handleChange = useCallback((e: any) => {
    const param = {
      id: Number(e.target.getAttribute("id")),
      isChecked: e.target.checked,
    };
    dispatch(updateTodos(param)).catch((error) => console.error(error));
  },[dispatch]);

  const deleteFn = useCallback((id: number) => {
    dispatch(deleteTodos(id)).catch((error) => console.error(error));
  },[dispatch]);

  const getRewardFn = useCallback((id: number) => {
    setShowRewardPopup(true);
    const param = {
      id,
      getReward: true,
    };
    dispatch(updateTodos(param)).catch((error) => console.error(error));
  },[dispatch]);

  return (
    <>
      <ul>
        {todoList.length > 0 ? (
          todoList.map((todo) => {
            return (
              <Todo
                text={todo.text}
                isChecked={todo.isChecked}
                getReward={todo.getReward}
                id={todo.id as number}
                onChange={handleChange}
                key={todo.id}
                deleteFn={deleteFn}
                getRewardFn={getRewardFn}
              />
            );
          })
        ) : (
          <p>오늘 해야할 일을 등록하고 완료 후 보상을 받아보세요!</p>
        )}
      </ul>
      {showRewardPopup && (
        <GiftAlert
          setIsShow={setShowRewardPopup}
          water={randomNumnBetween(5, 20)}
          nutrientCount={randomNumnBetween(0, 2)}
          message={"보상을 드립니다!🎁"}
        />
      )}
    </>
  );
}
