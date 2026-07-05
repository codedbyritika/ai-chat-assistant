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
        return data.choices[0].message.content;//our reply 

        // res.json(data);

    } catch (err) {
        console.log(err);
      
    }
}


export default getOpenAiApiResponse;