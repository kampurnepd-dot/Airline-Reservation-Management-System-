
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const server = http.createServer(app);

const PORT = 1111;
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});


app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});
app.use('/user', userRoutes);
app.use('/api',restrictToLoggedinUser, workRoutes);
io.use((socket, next) => {
    const cookies = parseCookie(
  socket.handshake.headers.cookie || ""
);


    const useruid = cookies.uid;
    if (!useruid) return next(new Error("login required"));
    const user = ValidateToken(useruid);
    if (!user) return next(new Error("login required"));
    socket.user = user;
    next();

})
io.on('connection', (socket) => {
     socket.on('joinroom', async(data) => {
        const {userId } = data;
        console.log("socket id",socket.user.sub);

        console.log("connection",userId);
       
        
        socket.join(userId);
         
});



});





server.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});