import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";
import openai from '../configs/openai.js';

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId, prompt} = req.body;

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role:"user", content: prompt, timestamp:Date.now(),
        isImage: false})

        const {choices} = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
    
        {
            role: "user",
            content: prompt,
        },
    ],
});

const reply = {...choices[0].message, timestamp:Date.now(), isImage:false}
res.json({sucess:true, reply})
chat.messages.push(reply)
await chat.save();

await User.updateOne({_id: userId})

    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}





export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        const {prompt, chatId, isPublished} = req.body;

        const chat = await Chat.findOne({userId, _id: chatId})

        chat.messages.push({

            role:"user", 
            content: prompt, 
            timestamp:Date.now(),
            isImage: false

        })

        const encodedPrompt = encodeURIComponent(prompt)

        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/smartgpt/${Date.now()}.png?tr=w-800, h-800`;

        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})


        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;


        const uploadResponse = await imagekit.upload({
            file:base64Image,
            fileName: `${Date.now()}.png`,
            folder:"smartgpt"
        })

        const reply = {
            role: 'assistant',
            content: uploadResponse.url, 
            timestamp:Date.now(), 
            isImage:true,
            isPublished
        }

        res.json({success:true, reply})

        chat.messages.push(reply)

        await chat.save();



    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}