// controllers/gpsController.js
module.exports.receiveGPSData = (req, res) => {
  const { latitude,  longitude, speed, altitude } = req.body;

  console.log("GPS мэдээлэл хүлээн авлаа:");
  console.log(`Latitude: ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  console.log(`Speed: ${speed} km/h`);
  console.log(`Altitude: ${altitude} m`);
  console.log("---------------------------");

  res.status(200).send({ message: "GPS өгөгдлийг амжилттай хүлээн авлаа." });
};
