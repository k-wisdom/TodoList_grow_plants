import React, { useState } from "react";
import { randomNumnBetween } from "../../utils/utils";
import Todo from "./Todo";
import { RootState, useAppDispatch } from "../../store";
import { deleteTodos, updateTodos } from "../../store/todoSlice";
import { useSelector } from "react-redux";
import GiftAlert from "../../components/popup/GiftAlert";

export default function TodoList() {
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const dispatch = useAppDispatch();
  const todoList = useSelector((state: RootState) => state.todos.todoList);

  const handleChange = (e: any) => {
    const param = {
      id: Number(e.target.getAttribute("id")),
      isChecked: e.target.checked,
    };
    dispatch(updateTodos(param)).catch((error) => console.error(error));
  };

  const deleteFn = (id: number) => {
    dispatch(deleteTodos(id)).catch((error) => console.error(error));
  };

  const getRewardFn = (id: number) => {
    setShowRewardPopup(true);
    const param = {
      id,
      getReward: true,
    };
    dispatch(updateTodos(param)).catch((error) => console.error(error));
  };

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
