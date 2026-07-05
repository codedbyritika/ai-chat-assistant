import express from "express";
import Thread from "../models/Thread.js";
import getOpenAiApiResponse from "../utils/openai.js"
const router = express.Router();



//test
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abcde",
            title: "testing new thread2"
        })

        const response = await thread.save();
        res.send(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in database" })
    }
})

//-----------------------------get all threads route
router.get("/thread", async (req, res) => {
    try {
        //sorted by updated by chronological order descending order on the basis of updated at
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch the thread" })
    }
})

//--------------------------router for particular thread
router.get("/thread/:threadId", async (req, res) => {

    const { threadId } = req.params;

    try {

        const thread = await Thread.findOne({ threadId });

        if (!thread) {
            return res.status(404).json({ error: "Thread not found" })
        }

        res.json(thread.messages)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch the chat" })


    }
})

//----------------------delete thread route

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deleteThread = await Thread.findOneAndDelete({ threadId });

        if (!deleteThread) {
            return res.status(404).json({ error: "Thread not found" })
        }

        res.status(200).json({
            message: "Thread deleted successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" })
    }
})

//-------------------------post chat route (main route)
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    //validate the fields
    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {//if thread not present create a new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            })

        } else {//thread present just push new msg into thread
            thread.messages.push({ role: "user", content: message })

        }

       const assistantReply= await getOpenAiApiResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply })

        thread.updatedAt=new  Date()
        await thread.save()
        res.json({reply:assistantReply})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"something went wrong"})

    }
})




export default router;