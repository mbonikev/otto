import React, { useEffect, useRef, useState } from "react";
import {
  LuBrain,
  LuCheck,
} from "react-icons/lu";
import { HiChevronUpDown, HiMiniMagnifyingGlass, HiMiniPaperAirplane } from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

function PromptArea({
  setMessages,
  messages,
  thinking,
  setThinking,
  displayName,
  models,
  userId,
  user,
  handleOpenLoginModal,
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const modelsButtonRef = useRef(null);
  const modelsRef = useRef(null);
  const [showModels, setShowModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    Cookies.get("selectedModel") || "llama-3.1-8b-instant"
  );
  const [searchModel, setSearchModel] = useState("");
  const { chat } = useParams();
  const [convId, setConvId] = useState("");
  const navigate = useNavigate();

  // Initialize conversation ID from cookie or route param
  useEffect(() => {
    const retrieveId = Cookies.get("convId") || chat;
    if (retrieveId) {
      setConvId(retrieveId);
      navigate(`?chat=${retrieveId}`, { replace: true });
    }
  }, []);

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setMessage(newInput);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const submit = async () => {
    if (!message.trim()) return;

    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    const routePath = user ? "/api/chat" : "/api/unsavedchat";
    const finalModel = selectedModel || "llama-3.1-8b-instant";

    // Add user message locally
    const userMessage = { role: "user", content: message, title: "" };
    setMessages((prev) => [...prev, userMessage]);

    setThinking(true);
    const messageToSend = message;
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const response = await axios.post(
        `${apiUrl}${routePath}`,
        {
          message: messageToSend,
          displayName,
          userId,
          selectedModel: finalModel,
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

      const { title, message: assistantResponse, conversationId } = response.data;

      // Update conversation ID if returned
      if (conversationId) {
        setConvId(conversationId);
        Cookies.set("convId", conversationId, { expires: 1, path: "/" });
        navigate(`?chat=${conversationId}`, { replace: true });
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse, title: title || "Untitled" },
      ]);

      setThinking(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setThinking(false);
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  // Close models dropdown if clicked outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModelSelect = (modelId) => {
    Cookies.set("selectedModel", modelId, { expires: 7, path: "/" });
    setSelectedModel(modelId);
    setShowModels(false);
  };

  useEffect(() => setSearchModel(""), [showModels]);

  return (
    <div className="w-full h-fit flex flex-col gap-2 px-3 pb-2 bg-white dark:bg-body-dark">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="w-full max-w-[765px] mx-auto h-fit rounded-[25px] shadow-lg ring-1 p-1.5 ring-stone-200 dark:ring-card-dark-1 dark:bg-card-dark-1 flex flex-col gap-4"
      >
        <textarea
          value={message}
          ref={textareaRef}
          onChange={handleInputChange}
          readOnly={thinking}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          required
          autoFocus
          placeholder="Message Otto"
          className="text-base font-normal bg-transparent min-h-[46px] max-h-[150px] px-3 pt-1 outline-none w-full placeholder:text-dark-text-weak dark:placeholder:text-light-color-weak text-dark-text dark:text-light-color resize-none whitespace-pre-wrap"
        />
        <div className="flex items-center justify-between w-full h-[34px] bg-red-400/0 px-1.5 mb-1.5">
          <div className="w-full h-full flex items-center justify-start gap-3 select-none relative">
            {/* Model Selector */}
            <div className="h-full w-fit flex items-center justify-center gap-1 text-sm ring-1 ring-stone-300 dark:ring-dark-text-weak/50 text-dark-text-weak font-semibold rounded-full relative">
              {user ? (
                <div
                  ref={modelsButtonRef}
                  onClick={() => setShowModels(!showModels)}
                  className="group cursor-pointer w-fit h-full flex items-center justify-center gap-1.5 px-3 relative hover:text-dark-text dark:text-light-color-weak dark:hover:text-light-color"
                >
                  <LuBrain className="text-lg text-purple-500 dark:text-light-color-weak/80" />
                  <p className="w-fit truncate max-w-[250px]">{selectedModel}</p>
                  <HiChevronUpDown className="text-lg opacity-75" />
                  <Tooltip title="Models" placement="right-center" />
                </div>
              ) : (
                <div
                  onClick={handleOpenLoginModal}
                  className="group cursor-pointer w-fit h-full flex items-center justify-center gap-1.5 px-3 relative hover:text-dark-text dark:text-light-color-weak dark:hover:text-light-color"
                >
                  <LuBrain className="text-lg text-purple-500 dark:text-light-color-weak/80" />
                  <p className="w-fit truncate max-w-[250px]">{selectedModel}</p>
                  <HiChevronUpDown className="text-lg opacity-75" />
                  <Tooltip title="Models" placement="right-center" />
                </div>
              )}
            </div>

            {/* Models Dropdown */}
            {showModels && (
              <div
                ref={modelsRef}
                className="w-[300px] max-sm:w-full h-[300px] bg-white dark:text-light-color dark:bg-card-dark-2 ring-1 ring-stone-300/80 dark:ring-dark-text-weak/50 shadow-md rounded-2xl absolute left-0 bottom-[130%] flex flex-col overflow-hidden"
              >
                <div className="w-full h-fit p-2">
                  <div className="w-full h-[40px] min-h-[40px] border-b-[1px] dark:border-light-color-weak/40">
                    <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-start pb-1">
                      <HiMiniMagnifyingGlass className="mr-3 ml-2 text-lg min-w-fit" />
                      <input
                        type="text"
                        autoFocus
                        value={searchModel}
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
                            model.id.toLowerCase().includes(searchModel.toLowerCase()) &&
                            !["OpenAI", "Hugging Face"].includes(model.owned_by)
                        )
                        .reduce((acc, model) => {
                          acc[model.owned_by] ||= [];
                          acc[model.owned_by].push(model);
                          return acc;
                        }, {})
                    ).map(([owner, ownerModels]) => (
                      <div key={owner}>
                        <h1 className="text-xs font-medium text-dark-text-weak/60 dark:text-light-color-weak py-1.5 px-1">
                          {owner}
                        </h1>
                        {ownerModels
                          .filter((model) => model.active)
                          .map((model) => (
                            <div
                              key={model.id}
                              onClick={() => handleModelSelect(model.id)}
                              className="px-2 py-1.5 capitalize rounded-lg w-full hover:bg-stone-200/60 text-dark-text-weak hover:text-dark-text dark:hover:bg-light-color-weak/15 dark:text-light-color dark:hover:text-light-color text-sm font-medium cursor-pointer flex items-center justify-between"
                            >
                              {model.id}
                              {selectedModel === model.id && <LuCheck className="text-lg" />}
                            </div>
                          ))}
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

          {/* Send Button */}
          <div className="w-fit h-full">
            <button
              type="submit"
              disabled={thinking || !message.trim()}
              className={`group h-full w-auto aspect-square flex items-center justify-center text-dark-text dark:text-light-color hover:opacity-70 rounded-full relative ${
                thinking || !message.trim() ? "opacity-30" : "opacity-100"
              }`}
            >
              <HiMiniPaperAirplane className="text-[27px]" />
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
