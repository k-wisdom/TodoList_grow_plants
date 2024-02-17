import React, { useRef } from "react";
import InputWithBtn from "../../components/frame/InputWithBtn";
import { useAppDispatch } from "../../store";
import { addTodos } from "../../store/todoSlice";
import { ERROR_MESSAGE } from "../../utils/Constant";

export default function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  //엔터 키 동작 처리
  const handleEnterkeyFn = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = async () => {
    if ((inputRef.current?.value as string).length < 2) {
      alert("2자 이상 입력해주세요.");
      return;
    }

    const param = {
      text: inputRef.current?.value as string,
    };

    try {
      await dispatch(addTodos(param));
      inputRef.current!.value = "";
      inputRef.current?.focus();
    } catch {
      alert(ERROR_MESSAGE);
    }
  };

  return (
    <InputWithBtn
      ref={inputRef}
      width="20rem"
      height="2.5rem"
      btnName={"추가"}
      btnOnClick={addTodo}
      onKeypress={handleEnterkeyFn}
      placeholder="할 일을 입력해주세요."
    />
  );
}
