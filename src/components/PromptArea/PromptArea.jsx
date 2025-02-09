import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowUpCircleFill, BsFileEarmarkText } from "react-icons/bs";
import { LuAudioLines, LuBrain, LuCheck, LuImage } from "react-icons/lu";
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
  HiOutlineMicrophone,
} from "react-icons/hi2";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

function PromptArea({
  setMessages,
  messages,
  thinking,
  setThinking,
  displayName,
  email,
  models,
  userId,
  user,
  handleOpenLoginModal,
}) {
  const [message, setMessage] = useState([]);
  const textareaRef = useRef(null);
  const modelsButtonRef = useRef(null);
  const modelsRef = useRef(null);
  const [showModels, setShowModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    Cookies.get("selectedModel") || "llama3-8b-8192"
  );
  const [searchModel, setSearchModel] = useState("");
  const { chat } = useParams();
  const [convId, setConvId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveId = Cookies.get("convId") || chat;
    setConvId(retrieveId);
    if (retrieveId) {
      navigate(`?chat=${retrieveId}`, { replace: true });
    }
  }, [convId]);

  const handleInput2Change = (e) => {
    const newInput = e.target.value;
    // console.log(JSON.stringify(message));
    setMessage(newInput);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const submit = async () => {
    if (message.trim() !== "") {
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const routePath = user ? "/api/chat" : "/api/unsavedchat";

      // Store the message before resetting state
      const userMessage = { role: "user", content: message, title: "" };
      setMessages((prev) => [...prev, userMessage]);

      setThinking(true);
      const messageToSend = message; // Store message before resetting
      setMessage("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const response = await axios.post(
          `${apiUrl}${routePath}`,
          {
            message: messageToSend,
            displayName,
            userId,
            selectedModel,
            convId,
            messages,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        if (convId !== "" || convId !== null) {
          setConvId(response.data.conversationId);
          navigate(`?chat=${response.data.conversationId}`, { replace: true });
          Cookies.set("convId", response.data.conversationId, {
            expires: 1,
            path: "/",
          });
        }
        const { title, message: assistantResponse } = response.data;
        setThinking(false);

        // Add assistant's response with title to the state
        const assistantMessage = {
          role: "assistant",
          content: assistantResponse,
          title: title || "Untitled",
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        setThinking(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setMessage("");

        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modelsRef.current &&
        !modelsRef.current.contains(event.target) &&
        modelsButtonRef.current &&
        !modelsButtonRef.current.contains(event.target)
      ) {
        setShowModels(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModelSelect = (modelId) => {
    Cookies.set("selectedModel", modelId, { expires: 7, path: "/" });
    console.log("Model selected:", modelId);
    setSelectedModel(modelId);
    setShowModels(false);
  };

  return (
    <div className="w-full h-fit flex flex-col gap-2 px-3 pb-2 bg-white dark:bg-body-dark">
      <form
        onSubmit={submit}
        className="w-full max-w-[765px] mx-auto h-fit rounded-[25px] shadow-lg ring-1 p-1.5 ring-stone-200 dark:ring-card-dark-1 dark:bg-card-dark-1 flex flex-col gap-4"
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
          className="text-base font-normal bg-transparent min-h-[46px] max-h-[150px] px-3 pt-1 outline-none w-full placeholder:text-dark-text-weak dark:placeholder:text-light-color-weak text-dark-text dark:text-light-color resize-none whitespace-pre-wrap "
        ></textarea>
        <div className="flex items-center justify-between w-full h-[34px] bg-red-400/0 px-1.5 mb-1.5">
          {/* 1 */}
          <div className="w-full h-full flex items-center justify-start gap-3 select-none relative">
            <div className="h-full w-fit flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300  dark:ring-dark-text-weak/50 dark:hover:bg-light-color-weak/10 text-dark-text-weak font-semibold rounded-full relative">
              {user ? (
                <div
                  ref={modelsButtonRef}
                  onClick={() => setShowModels(true)}
                  className="group cursor-pointer w-fit h-full flex items-center justify-center gap-1.5 px-3 relative hover:text-dark-text dark:text-light-color-weak dark:hover:text-light-color"
                >
                  <LuBrain className="text-lg text-purple-500 dark:text-light-color-weak/80" />
                  <p className="w-full truncate max-w-[100px]">
                    {selectedModel}
                  </p>
                  <HiChevronUpDown className="text-lg opacity-75" />
                  <Tooltip title="Models" placement="right-center" />
                </div>
              ) : (
                <div
                  onClick={handleOpenLoginModal}
                  className="group cursor-pointer w-fit h-full flex items-center justify-center gap-1.5 px-3 relative hover:text-dark-text dark:text-light-color-weak dark:hover:text-light-color"
                >
                  <LuBrain className="text-lg text-purple-500 dark:text-light-color-weak/80" />
                  <p className="w-full truncate max-w-[100px]">
                    {selectedModel}
                  </p>
                  <HiChevronUpDown className="text-lg opacity-75" />
                  <Tooltip title="Models" placement="right-center" />
                </div>
              )}
            </div>
            <div
              onClick={handleOpenLoginModal}
              className="group cursor-pointer h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 dark:ring-dark-text-weak/50 dark:hover:bg-light-color-weak/10 text-dark-text-weak dark:text-light-color-weak dark:hover:text-light-color hover:text-dark-text font-semibold rounded-full relative"
            >
              <GoCommandPalette className="text-lg text-lime-600 dark:text-light-color-weak " />
              Code
              <Tooltip title="Type Codes" placement="right-center" />
            </div>
            <div className="group cursor-default h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 dark:ring-dark-text-weak/50 dark:hover:bg-light-color-weak/10 text-dark-text-weak dark:text-light-color-weak font-semibold rounded-full relative">
              <LuImage className="text-base text-orange-600 dark:text-light-color-weak stroke-[1.5px]" />
              Image
              <Tooltip title="Comming Soon" placement="right-center" />
            </div>
            <div className="group cursor-default h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 dark:ring-dark-text-weak/50 dark:hover:bg-light-color-weak/10 text-dark-text-weak dark:text-light-color-weak font-semibold rounded-full relative">
              <LuAudioLines className="text-base text-pink-500 dark:text-light-color-weak stroke-[1.5px]" />
              Audio
              <Tooltip title="Comming Soon" placement="right-center" />
            </div>
            <div className="group cursor-default h-full w-fit px-3 flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 dark:ring-dark-text-weak/50 dark:hover:bg-light-color-weak/10 text-dark-text-weak dark:text-light-color-weak font-semibold rounded-full relative">
              <BsFileEarmarkText className="text-base text-blue-400 dark:text-light-color-weak " />
              Files
              <Tooltip title="Comming Soon" placement="right-center" />
            </div>

            {/* models */}
            {showModels && (
              <div
                ref={modelsRef}
                className=" w-[300px] max-sm:w-full h-[300px] bg-white dark:text-light-color dark:bg-card-dark-2 ring-1 ring-stone-300/80 dark:ring-dark-text-weak/50 shadow-md rounded-2xl absolute left-0 bottom-[130%] flex flex-col"
              >
                <div className="w-full h-fit p-2">
                  <div className="w-full h-[40px] min-h-[40px] border-b-[1px] dark:border-light-color-weak/40">
                    <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-start pb-1">
                      <HiMiniMagnifyingGlass className="mr-3 ml-2 text-lg min-w-fit" />
                      <input
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setSearchModel(e.target.value)}
                        className="h-full w-full bg-transparent text-dark-text dark:text-light-color placeholder:text-dark-text-weak/50 dark:placeholder:text-light-color-weak text-sm"
                        placeholder="Search models..."
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex-1 flex flex-col gap-0 scrollbar_nobg overflow-y-auto pr-1 pl-2">
                  {models?.length > 0 ? (
                    Object.entries(
                      models
                        .filter(
                          (model) =>
                            model.id
                              .toLowerCase()
                              .includes(searchModel.toLowerCase()) &&
                            model.owned_by !== "OpenAI" && // Exclude models owned by OpenAI
                            model.owned_by !== "Hugging Face" // Exclude models owned by Hugging Face
                        )
                        .reduce((acc, model) => {
                          acc[model.owned_by] ||= [];
                          acc[model.owned_by].push(model);
                          return acc;
                        }, {})
                    )
                      // .sort(([a], [b]) => a.localeCompare(b))
                      .map(([owner, ownerModels]) => (
                        <div key={owner} className="w-full">
                          {/* Owner Header */}
                          <h1 className="text-xs font-medium text-dark-text-weak/40 dark:text-light-color-weak py-1.5 px-2">
                            {owner}
                          </h1>
                          {/* Models List */}
                          <div className="w-full h-fit flex flex-col mb-[10px]">
                            {ownerModels
                              .filter((model) => model.active)
                              .map((model) => (
                                <div
                                  key={model.id}
                                  onClick={() => handleModelSelect(model.id)}
                                  className="px-2 py-1.5 capitalize rounded-lg w-full hover:bg-stone-200/60 text-dark-text-weak hover:text-dark-text dark:hover:bg-light-color-weak/15 dark:text-light-color dark:hover:text-light-color text-sm font-medium cursor-pointer flex items-center justify-between"
                                >
                                  {model.id}
                                  {selectedModel === model.id && (
                                    <LuCheck className="text-lg" />
                                  )}
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
            )}
          </div>
          {/* 2 */}
          <div className="w-fit h-full">
            <button
              disabled={thinking}
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
              className={`group h-full w-auto aspect-square flex items-center justify-center text-dark-text dark:text-light-color hover:opacity-70 rounded-full relative
                ${
                  thinking
                    ? "opacity-30"
                    : message.length === 0
                    ? "opacity-30"
                    : "opacity-100"
                }`}
            >
              <IoSend className="text-[27px]" />
            </button>
          </div>
        </div>
      </form>
      <h1 className="text-xs font-normal tracking-wide text-dark-text dark:text-light-color-weak w-fit mx-auto">
        Otto can make mistakes. double check!
      </h1>
    </div>
  );
}

export default PromptArea;
