import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";

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
      <div className="w-full max-w-[800px] mx-auto min-h-[120px] rounded-[25px] shadow-lg ring-1 ring-stone-200 overflow-hidden">
        <textarea
          type="text"
          id="ProjectDesc"
          value={message}
          ref={textareaRef}
          onChange={handleInput2Change}
          rows="1"
          placeholder="Message Otto"
          className="text-base font-normal min-h-[100px] max-h-[300px] p-4 outline-none w-full placeholder:text-dark-text-weak text-text-color resize-none overflow-hidden dark:bg-dark-body dark:placeholder:text-light-text-color/70 dark:text-[#d4d4d4]"
        ></textarea>
        <div></div>
      </div>
      <h1 className="text-xs font-normal text-dark-text-weak w-fit mx-auto">
        Otto can make mistakes. still in beta.
      </h1>
    </div>
  );
}

export default PromptArea;
