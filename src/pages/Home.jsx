import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import PromptArea from "../components/PromptArea/PromptArea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate, useOutletContext } from "react-router-dom";

function Home() {
  const { user, models } = useOutletContext() || {};
  const { displayName, photo, email } = user || {};
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const [param, setParam] = useState("default");

  useEffect(() => {
    const handleChangeParam = (newParam) => {
      setParam(newParam);

      // Modify URL without reloading the page
      navigate(`?chat=${newParam}`, { replace: true });
    };
    handleChangeParam();
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
                style={oneLight}
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
      <div className="w-full h-fit z-30 fixed top-0">
        <Navbar photo={photo} displayName={displayName} user={user} />
      </div>

      <div
        ref={chatBoxRef}
        className="w-full flex-1 flex flex-col mt-[70px] scroll-smooth overflow-y-scroll pl-[12px]"
      >
        {messages.length > 0 ? (
          <div className="w-full max-w-[800px] mx-auto flex-1 flex flex-col items-center justify-start py-10">
            <div className="w-full flex flex-col gap-10">
              {messages.map((msg, index) => {
                const isLastNonUserMsg =
                  msg.role !== "user" && index === messages.length - 1;

                return (
                  <div
                    key={index}
                    className={`message text-base font-normal text-dark-text leading-[26px] overflow-x-auto no_scroll whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "w-fit bg-stone-200/40 px-4 py-2 ml-auto max-w-[600px] rounded-3xl"
                        : "w-full bg-transparent flex items-start justify-start gap-4 break-words whitespace-pre-wrap pr-9"
                    } ${isLastNonUserMsg ? "animate-message" : ""}`}
                  >
                    {msg.role !== "user" && (
                      <div className="h-8 aspect-square min-w-fit bg-white rounded-full overflow-hidden ring-1 ring-stone-200/60 p-1 -translate-y-1">
                        <img src="./logo.png" className="rounded-full" />
                      </div>
                    )}
                    {renderContent(msg)}
                  </div>
                );
              })}

              {thinking && (
                <div className="text-sm leading-[22px] rounded-[25px] w-fit max-w-[500px] bg-transparent flex items-center gap-4">
                  <div className="h-8 aspect-square min-w-fit bg-white rounded-full overflow-hidden ring-1 ring-stone-200/60 p-1">
                    <img src="./logo.png" className="rounded-full" />
                  </div>
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
        thinking={thinking}
        setThinking={setThinking}
        displayName={displayName}
        email={email}
        models={models}
      />
    </div>
  );
}

export default Home;
