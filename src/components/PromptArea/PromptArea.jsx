import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function PromptArea() {
  const [message, setMessage] = useState("")
  return (
    <div className="w-full h-fit flex flex-col gap-3 p-3">
      <div className="w-full max-w-[800px] mx-auto h-[120px] rounded-[25px] shadow-lg ring-1 ring-stone-200">
        <textarea
          autoFocus={true}
          className="w-full bg-stone-200/40 dark:bg-[#353535] h-[120px] resize-none rounded-xl leading-5 p-3 text-sm placeholder:text-text-color/50 dark:placeholder:text-white/40 font-medium text-text-color dark:text-white"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Describe your project..."
          required={true}
        ></textarea>
      </div>
      <h1 className="text-xs font-normal text-dark-text-weak w-fit mx-auto">
        Otto can make mistakes. still in beta.
      </h1>
    </div>
  );
}

export default PromptArea;
