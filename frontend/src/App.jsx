import "./App.css";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext";
import { useState } from "react";
import {v1 as uuidv1} from "uuid"

function App() {
  const[prompt,setPrompt]=useState("")
  const [reply,setReply]=useState(null)
  const [currThreadId,setCurrThreadId]=useState(uuidv1())//initiaise the new id
const  [prevChats,setPrevChats]=useState([])//will store chats of this current thread
const [newChat, setNewChat]=useState(true)
const [allThreads,setAllThreads]=useState([])









  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId,setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads,setAllThreads,
  };



  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;