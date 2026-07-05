import "dotenv/config";

const getOpenAiApiResponse=async(message)=>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: message//msg came as parameter
                },
              
            ]
        })
    };

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            options
        );

      
        const data = await response.json();

console.log("Gemini Response:", data);

if (!response.ok) {
    throw new Error(data.error?.message || "Gemini API Error");
}

if (!data.choices || !data.choices.length) {
    throw new Error("No response received from Gemini.");
}

return data.choices[0].message.content; 

        // res.json(data);

    } catch (err) {
        console.error("Gemini Error:", err);
    throw err;
      
    }
}


export default getOpenAiApiResponse;