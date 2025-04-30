const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const AnimalsRoute = require("./routes/animals");
const PetRoute = require("./routes/pet");
const BreedRoute = require("./routes/breed")
const TreatmentRoute = require("./routes/treatment");
const AddressRoute = require("./routes/address");
const HospitalRoute = require("./routes/hospital");

// const gpsRoutes = require("./routes/gpsRoutes");

dotenv.config();
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

// app.use("/", gpsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
