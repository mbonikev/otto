import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { PiBrainLight } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";
import Tooltip from "../Tooltip/Tooltip";
import axios from "axios";

function PromptArea() {
  const apiUrl = import.meta.env.GROQ_API_KEY;
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput2Change = (e) => {
    const newInput = e.target.value;
    setMessage(newInput);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const submit = async () => {
    const apiKey = "your_groq_api_key"; // Store securely, not in frontend code
    const projectDescription = "Your project description here";

    try {
      const response = await axios.post(
        "https://api.groq.com/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `Generate a list of concise project management board titles for the following project description. Each board title should be short, representing distinct key areas of the project.
              format example:
              1. Todo
              2. Design
              3. Development
              4. Testing
              and so on
              
              each board title should be 1 or 2 words, 3 words max.
              
              Project Description: 
              
              ${projectDescription}
              `,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
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
            <button className="group h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 text-dark-text-weak hover:text-dark-text font-semibold rounded-full relative">
              <LuBrain className="text-base" />
              Llama 3.1
              <Tooltip title="Models" placement="right-center" />
            </button>
          </div>
          {/* 2 */}
          <div className="w-fit h-full">
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevents newline
                submit();
              }}
              className="group h-full w-auto aspect-square flex items-center justify-center text-dark-text hover:opacity-70 rounded-full relative"
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
