import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import MongoDBConnect from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();

await MongoDBConnect();

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Server is Running");
});

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);

app.use('/api/message/', messageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`The server is Running on the Port:${PORT}`);
})