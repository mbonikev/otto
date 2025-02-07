import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import PromptArea from "../components/PromptArea/PromptArea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import Cookies from "js-cookie";
import axios from "axios";

function Home({handleOpenLoginModal}) {
  const { user, models } = useOutletContext() || {};
  const { displayName, photo, email, userId } = user || {};
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [thinkingMessages, setThinkingMessages] = useState(false);
  const chatBoxRef = useRef(null);
  const { chat } = useParams();
  const [convId, setConvId] = useState("");
  const navigate = useNavigate();
  const [param, setParam] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect dark mode using prefers-color-scheme or a dark mode toggle
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in the theme preference
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleChangeParam = (newParam) => {
      setParam(newParam);

      // Modify URL without reloading the page
      navigate(`?chat=${newParam}`, { replace: true });
    };
    handleChangeParam("");
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      const chatBox = chatBoxRef.current;
      const messageElements = chatBox.querySelectorAll(".message");
      const lastMessage = messageElements[messageElements.length - 1];

      if (lastMessage) {
        const lastMessageOffsetTop = lastMessage.offsetTop;
        const chatBoxHeight = chatBox.clientHeight;
        const scrollPosition = chatBox.scrollTop;

        if (
          lastMessageOffsetTop + lastMessage.clientHeight - scrollPosition >
          160
        ) {
          chatBox.scrollTop = lastMessageOffsetTop - 160;
        }
      }
    }

    const firstAssistantMessage = messages.find(
      (msg) => msg.role === "assistant"
    );
    document.title = messages.length
      ? `Otto - ${firstAssistantMessage?.title?.replace(/["`]/g, "") || ""}`
      : "Otto";
  }, [messages]);

  useEffect(() => {
    const handleGetMessages = async () => {
      const retrieveId = Cookies.get("convId");
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      setThinkingMessages(true);
      try {
        const response = await axios.get(`${apiUrl}/api/getmsg`, {
          params: { convId: retrieveId },
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.messages) {
          const mappedMessages = response.data.messages.flatMap((msg) => [
            {
              role: "user",
              content: msg.content[0]?.prompt, // User's message
              title: msg.title || "Untitled",
              convId: msg.conversationId,
            },
            {
              role: "assistant",
              content: msg.content[0]?.reply, // Assistant's reply
              title: msg.title || "Untitled",
              convId: msg.conversationId,
            },
          ]);
          setMessages(mappedMessages);
          setThinkingMessages(false);
        }
      } catch (error) {
        console.error("messages:", error);
        setThinkingMessages(false);
      }
    };

    handleGetMessages();
  }, []);

  // Function to render content with code blocks
  const renderContent = (msg) => {
    const content = msg.content;
    const role = msg.role;
    // Check if content contains code wrapped in triple backticks
    const regex = /```(.*?)```/gs;
    const splitContent = content.split(regex);

    return (
      <div
        className={`w-full flex flex-col gap-2 ${
          role === "assistant" ? "hide_fist_span" : "hide_code_space"
        }`}
      >
        {splitContent.map((part, index) => {
          // If part is code, render it in a SyntaxHighlighter block
          if (index % 2 === 1) {
            return (
              <SyntaxHighlighter
                key={index}
                lineProps={{
                  style: { wordBreak: "break-words", whiteSpace: "pre-wrap" },
                }}
                wrapLines={true}
                language="javascript"
                style={isDarkMode ? darcula : oneLight} // Switch theme based on dark mode
                className={`rounded-2xl overflow-x-auto max-w-[100%] p-6 break-all whitespace-pre-wrap`}
              >
                {part}
              </SyntaxHighlighter>
            );
          } else {
            // Render non-code content as markdown
            return (
              <div key={index} className="markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {part}
                </ReactMarkdown>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-svh flex flex-col relative">
      {/* <div className="w-full h-fit z-30 fixed top-0"> */}
      <Navbar
        photo={photo}
        displayName={displayName}
        user={user}
        userId={userId}
        setMessages={setMessages}
        setThinking={setThinking}
        thinking={thinking}
        handleOpenLoginModal={handleOpenLoginModal}
      />
      {/* </div> */}

      <div
        ref={chatBoxRef}
        className="w-full flex-1 flex flex-col scroll-smooth overflow-y-scroll pl-[12px] bg-white dark:bg-body-dark text-dark-text dark:text-light-color"
      >
        {messages.length > 0 ? (
          <div className="w-full max-w-[765px] mx-auto flex-1 flex flex-col items-center justify-start py-10 max-lg:px-5">
            <div className="w-full flex flex-col gap-10">
              {messages.map((msg, index) => {
                const isLastNonUserMsg =
                  msg.role !== "user" && index === messages.length - 1;

                return (
                  <div
                    key={index}
                    className={`message text-base font-normal text-dark-text dark:text-light-color leading-[26px] overflow-x-auto no_scroll whitespace-pre-wrap flex py-1 px-5 ${
                      msg.role === "user"
                        ? "w-fit bg-stone-200/40 dark:bg-card-dark-1 px-4 py-3 ml-auto max-w-[600px] rounded-3xl break-words whitespace-pre-wrap text-left"
                        : "w-full bg-transparent flex items-start justify-start gap-4 break-words whitespace-pre-wrap"
                    } ${isLastNonUserMsg ? "animate-message" : ""}`}
                  >
                    {renderContent(msg)}
                  </div>
                );
              })}

              {thinking && (
                <div className="text-sm leading-[22px] rounded-[25px] w-fit max-w-[500px] bg-transparent flex items-center gap-4">
                  {/* <div className="h-8 aspect-square min-w-fit bg-white dark:bg-card-dark-1 rounded-full overflow-hidden ring-1 ring-stone-200/60 dark:ring-dark-text-weak/50 p-1">
                    <img src="./logo.png" className="rounded-full" />
                  </div> */}
                  <div className="thinking_container">
                    <div className="dot" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">How can I assist you?</h1>
          </div>
        )}
      </div>

      <PromptArea
        setMessages={setMessages}
        messages={messages}
        thinking={thinking}
        setThinking={setThinking}
        displayName={displayName}
        email={email}
        models={models}
        user={user}
        userId={userId}
      />
    </div>
  );
}

export default Home;
