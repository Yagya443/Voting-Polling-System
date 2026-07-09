require("dotenv").config();

const express = require("express");
const app = express();

const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./src/db.js");
const pollRoute = require("./src/Routes/Poll.Route.js");
const PollModel = require("./src/Model/Poll.model.js");

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173/",
    },
});
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api", pollRoute);
connectDB();


io.on("connection", (socket) => {
    console.log(`client connected ${socket.id}`);

    socket.on("joinPoll", (pollId) => {
        socket.join(pollId);
        console.log(` joined room ${pollId}`);
    });

    socket.on("submitVote", async ({ pollId, optionIndex }) => {
        try {
            const poll = await PollModel.findById(pollId);

            if (!poll) return;

            poll.options[optionIndex].voters += 1;
            poll.totalVotes += 1;
            await poll.save();

            io.to(pollId).emit("pollUpdated", poll);
        
        } catch (error) {
            console.log("vote error by socket");
        }
    });

    socket.on("disconnect", () => {
        console.log(` Diconnected ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
