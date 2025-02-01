import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

function PromptArea() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput2Change = (e) => {
    const newInput = e.target.value;
    setMessage(newInput);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div className="w-full h-fit flex flex-col gap-3 p-3">
      <div className="w-full max-w-[800px] mx-auto min-h-[120px] rounded-[25px] shadow-lg ring-1 p-1 ring-stone-200 overflow-hidden">
        <textarea
          type="text"
          id="ProjectDesc"
          value={message}
          ref={textareaRef}
          onChange={handleInput2Change}
          rows="1"
          placeholder="Message Otto"
          className="text-base font-norma bg-red-200 min-h-[100px] max-h-[200px] px-4 pt-4 pb-0 outline-none w-full placeholder:text-dark-text-weak text-dark-text resize-none overflow-hidden "
        ></textarea>
        <div className="flex items-center justify-between w-full">
          {/* 1 */}
          <div></div>
          {/* 2 */}
          <div className="">
            <button className="group h-10 w-auto aspect-square flex items-center justify-center text-3xl text-dark-text rounded-full relative">
              <BsArrowUpCircleFill />
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-xs font-normal text-dark-text-weak w-fit mx-auto">
        Otto can make mistakes. still in beta.
      </h1>
    </div>
  );
}

export default PromptArea;
