import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { PiBrainLight } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";

function PromptArea() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput2Change = (e) => {
    const newInput = e.target.value;
    setMessage(newInput);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const submit = () => {
    document.location.reload();
  };

  return (
    <div className="w-full h-fit flex flex-col gap-3 p-3">
      <form
        onSubmit={submit}
        className="w-full max-w-[750px] mx-auto h-fit rounded-[25px] shadow-lg ring-1 p-1 ring-stone-200 overflow-hidden"
      >
        <textarea
          type="text"
          id="ProjectDesc"
          value={message}
          ref={textareaRef}
          onChange={handleInput2Change}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevents newline
              submit();
            }
          }}
          rows="1"
          autoFocus={true}
          placeholder="Message Otto"
          className="text-base font-norma bg-transparent min-h-[55px] max-h-[150px] px-3 pt-3 pb-4 outline-none w-full placeholder:text-dark-text-weak text-dark-text resize-none overflow-hidden "
        ></textarea>
        <div className="flex items-center justify-between w-full h-[32px] bg-red-400/0 min-h-[32px] px-1.5 mb-1.5">
          {/* 1 */}
          <div className="w-full h-full">
            <button className="group h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 text-dark-text-weak font-semibold rounded-full relative">
              <LuBrain className="text-base" />
              Llama 3.1
            </button>
          </div>
          {/* 2 */}
          <div className="w-fit h-full">
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevents newline
                submit();
              }}
              className="group h-full w-auto aspect-square flex items-center justify-center text-dark-text hover:text-main-color rounded-full relative"
            >
              <BsArrowUpCircleFill className="h-full w-full" />
            </button>
          </div>
        </div>
      </form>
      <h1 className="text-xs font-normal text-dark-text-weak w-fit mx-auto">
        Otto can make mistakes. still in beta.
      </h1>
    </div>
  );
}

export default PromptArea;
