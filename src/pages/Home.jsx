import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PromptArea from "../components/PromptArea/PromptArea";

function Home() {
  return (
    <div className="w-full h-svh flex flex-col">
      <Navbar />
      <div className="w-full flex-1 flex flex-col">
        {/* empty */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold">How can I assist you?</h1>
        </div>
      </div>
      <PromptArea />
    </div>
  );
}

export default Home;
