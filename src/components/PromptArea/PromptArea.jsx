import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { BsArrowUpCircleFill, BsFileEarmarkText } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { PiBrainLight } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";
import Tooltip from "../Tooltip/Tooltip";
import axios from "axios";
import { GoCommandPalette } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { RxTextAlignMiddle } from "react-icons/rx";
import {
  HiChevronUpDown,
  HiMiniMagnifyingGlass,
  HiMiniXCircle,
} from "react-icons/hi2";

function PromptArea({
  setMessages,
  thinking,
  setThinking,
  displayName,
  email,
  models,
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput2Change = (e) => {
    const newInput = e.target.value;
    // console.log(JSON.stringify(message));
    setMessage(newInput);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const submit = async () => {
    if (message !== "") {
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      // Add user message to the state
      const userMessage = { role: "user", content: message };
      setMessages((prev) => [...prev, userMessage]);

      setThinking(true);
      setMessage("");
      textareaRef.current.style.height = "auto";

      try {
        const response = await axios.post(
          `${apiUrl}/api/chat`,
          { message, displayName, userId: email },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { title, message: assistantResponse } = response.data;

        // console.log(assistantResponse);
        setThinking(false);

        // Add assistant's response with title to the state
        const assistantMessage = {
          role: "assistant",
          content: assistantResponse,
          title: title, // Include the title
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        setThinking(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setMessage("");
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-3 px-3 pb-3 z-0 sticky bottom-0 bg-white">
      <form
        onSubmit={submit}
        className="w-full max-w-[850px] mx-auto h-fit rounded-[25px] shadow-lg ring-1 p-2 ring-stone-200 flex flex-col gap-5"
      >
        <textarea
          type="text"
          id="ProjectDesc"
          value={message}
          ref={textareaRef}
          onChange={handleInput2Change}
          readOnly={thinking}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevents newline
              submit();
            }
          }}
          rows="1"
          required={true}
          autoFocus={true}
          placeholder="Message Otto"
          className="text-base font-normal bg-transparent min-h-[60px] max-h-[150px] px-3 pt-3 outline-none w-full placeholder:text-dark-text-weak text-dark-text resize-none whitespace-pre-wrap "
        ></textarea>
        <div className="flex items-center justify-between w-full h-[36px] bg-red-400/0 min-h-[32px] px-1.5 mb-1.5">
          {/* 1 */}
          <div className="w-full h-full flex items-center justify-start gap-3 select-none">
            <div className=" h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 text-dark-text-weak font-semibold rounded-full relative">
              <div className="group cursor-pointer w-full h-full flex items-center justify-center gap-1 hover:text-dark-text">
                <LuBrain className="text-lg text-purple-500" />
                llama3-8b-8192
                <HiChevronUpDown className="text-lg opacity-75" />
                <Tooltip title="Models" placement="right-center" />
              </div>
              {/* models */}
              <div className="w-[300px] h-[300px] bg-white ring-1 ring-stone-300/80 shadow-md rounded-2xl absolute mx-auto bottom-[130%] p-2 flex flex-col">
                <div className="h-[40px] mb-2">
                  <div className="w-full h-full bg-stone-200/60 rounded-xl flex items-center justify-start">
                    <HiMiniMagnifyingGlass className="mx-3 text-lg min-w-fit" />
                    <input
                      type="text"
                      autoFocus={true}
                      className="h-full w-full bg-transparent text-dark-text placeholder:text-dark-text-weak/50 text-sm font-normal"
                      placeholder="Search chats..."
                    />
                  </div>
                </div>
                <div className="w-full flex-1 flex flex-col gap-0 overflow-y-auto">
                  {models?.length > 0 ? (
                    Object.entries(
                      models.reduce((acc, model) => {
                        acc[model.owned_by] ||= [];
                        acc[model.owned_by].push(model);
                        return acc;
                      }, {})
                    )
                      .sort(([a], [b]) => a.localeCompare(b)) // 🔥 Sort owners A-Z
                      .map(([owner, ownerModels]) => (
                        <div key={owner} className="w-full">
                          {/* Owner Header */}
                          <h1 className="text-xs font-bold text-dark-text-weak/60 py-1.5 px-2">
                            {owner}
                          </h1>
                          {/* Models List */}
                          <div className="w-full h-fit flex flex-col">
                            {ownerModels.map((model) => (
                              <div
                                key={model.id}
                                className="px-2 py-1.5 rounded-lg w-full hover:bg-stone-200/60 text-dark-text-weak hover:text-dark-text text-sm font-medium cursor-pointer flex items-center justify-between"
                              >
                                {model.id}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-sm pb-5">No models available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="group cursor-pointer h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 text-dark-text-weak hover:text-dark-text font-semibold rounded-full relative">
              <GoCommandPalette className="text-lg text-lime-600 stroke-[1px]" />
              Code
              <Tooltip title="Type Codes" placement="right-center" />
            </div>
            <div className="group cursor-default h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 text-dark-text-weak font-semibold rounded-full relative">
              <BsFileEarmarkText className="text-base text-blue-400 stroke-[0.6px]" />
              Summarize
              <Tooltip title="Comming Soon" placement="right-center" />
            </div>
          </div>
          {/* 2 */}
          <div className="w-fit h-full">
            <button
              disabled={thinking}
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
              className={`group h-full w-auto aspect-square flex items-center justify-center text-dark-text hover:opacity-70 rounded-full relative pr-1 pb-1
                ${thinking ? "opacity-30" : "opacity-100"}`}
            >
              <IoSend className="text-[27px]" />
            </button>
          </div>
        </div>
      </form>
      <h1 className="text-xs font-normal text-dark-text-weak w-fit mx-auto">
        Otto can make mistakes. double check!
      </h1>
    </div>
  );
}

export default PromptArea;
