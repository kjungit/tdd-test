import React from "react";
import Button from "../Button";

export default function Header() {
  return (
    <div className="flex justify-between w-full h-20 items-center">
      <h2 className="w-full flex text-white h-10 items-center justify-center">
        TDD TodoList
      </h2>
      <Button label="로그인" />
    </div>
  );
}
