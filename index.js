const express = require("express");
const http = require("http"); // Add this line
const socketIo = require("socket.io"); // Add this line
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const AnimalsRoute = require("./routes/animals");
const PetRoute = require("./routes/pet");
const BreedRoute = require("./routes/breed");
const TreatmentRoute = require("./routes/treatment");
const AddressRoute = require("./routes/address");
const HospitalRoute = require("./routes/hospital");
const RecordRoute = require("./routes/record");
const AppointmentRoute = require("./routes/appointment");
const DoctorRoute = require("./routes/doctor");
const server = http.createServer(app); // Add this line
const io = socketIo(server); // Add this line
app.set("socketio", io); // Make socket.io instance available in controllers

dotenv.config();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// const otp = generateOTP();
// sendEmail("hanguri78@gmail.com", otp);
// console.log(otp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/animals", AnimalsRoute);
app.use("/api/pets", PetRoute);
app.use("/api/breeds", BreedRoute);
app.use("/api/treatments", TreatmentRoute);
app.use("/api/address", AddressRoute);
app.use("/api/hospitals", HospitalRoute);
app.use("/api/records", RecordRoute);
app.use("/api/appointments", AppointmentRoute);
app.use("/api/doctors", DoctorRoute);


// app.use("/", gpsRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Change app.listen to server.listen
server.listen(port, () => {
  // Modified line
  console.log(`Server is running on port ${port}`);
});
