import "./SideBar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
const API_URL = import.meta.env.VITE_API_URL;

function SideBar() {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {

    try {

      // const response = await fetch("http://localhost:8080/api/thread");
      const response = await fetch(`${API_URL}/api/thread`);
      const res = await response.json();
      //threadId ,title  of each chat
      const filterdData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }))

      //console.log(filterdData)
      setAllThreads(filterdData)


    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllThreads();

  }, [currThreadId]);


  const createNewChat = () => {
    setNewChat(true);
    setPrompt("")
    setReply(null)
    setCurrThreadId(uuidv1())
    setPrevChats([])
  }

  const changeThread=async(newThreadId)=>{

    setCurrThreadId(newThreadId)

    try{
  
    //  const response= await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
    const response = await fetch(`${API_URL}/api/thread/${newThreadId}`);

     const res=await response.json();
     console.log(res)
     setPrevChats(res)
     setNewChat(false)
     setReply(null)


    }catch(err){
      console.log(err);
    }
  }


  const deleteThread= async (threadId)=>{
    try{

      // const response =await fetch( `http://localhost:8080/api/thread/${threadId}`,{method:"delete"})
      const response = await fetch(`${API_URL}/api/thread/${threadId}`, {
    method: "DELETE"
});
      const res=await response.json();
      console.log(res)

      //re-render the updated thread->so that no need of refreshing the page
      setAllThreads(prev=>prev.filter(thread=>thread.threadId!==threadId))

      if(threadId===currThreadId){
        createNewChat()
      }

    }catch(err){
      console.log(err);
    }
  }


  return (
    <section className="sidebar">
      {/* {new chat button} */}
      <button onClick={createNewChat}>
        <img src="src/assets/logo.png" alt="logo" className="logo" />
        <span> <i className="fa-regular fa-pen-to-square"></i></span>
      </button>
      {/* {history} */}

      <ul className="history">
        {
          allThreads?.map((thread, idx) => (
            <li key={idx} onClick={(e)=>changeThread(thread.threadId)}
            className={thread.threadId===currThreadId?"highlighted":" "}
            >
              {thread.title}
            <i className="fa-solid fa-trash"
              onClick={(e)=>{
                e.stopPropagation() //to stop event bubbling
                deleteThread(thread.threadId)
              }}
            ></i>
            
            </li>
          ))
        }

      </ul>
      {/* {sign in} */}
      <div className="sign">
        <p> By Ritika &hearts;</p>


      </div>

    </section>
  )
}

export default SideBar