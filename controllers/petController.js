const Pet = require("../models/Pet");
const User = require("../models/User");
const Geofence = require("../models/Geofence");
const multer = require("multer");
const Animal = require("../models/Animal");
// Configure multer for handling form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });
//asdf
module.exports = {
  //Хэрэглэгч амьтан нэмэх
  createPet: async (req, res) => {
    try {
      console.log(req.body);
      const photoUrls = req.files.map((file) => file.path);
      const { name, breedId, AnimalId } = req.body;
      const ownerId = req.user.id;
      const animal = await Animal.findById(AnimalId);
      if (!animal) {
        return res
          .status(404)
          .json({ status: false, message: "Animal not found" });
      }

      if (!name || !breedId || !ownerId) {
        return res
          .status(422)
          .json({ status: false, message: "Missing required fields" });
      }

      const pet = await Pet.create({
        name,
        owner: ownerId,
        breed: breedId,
        photos: photoUrls,
        animalId: AnimalId,
      });

      res.status(201).json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
      console.log(error.message);
    }
  },
  getPetByOwner: async (req, res) => {
    try {
      const pets = await Pet.find({ owner: req.user.id }).select(
        "name photos animalId"
      ); // Select only name and photos

      res.json({ status: true, data: pets });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //write getPetById function
  getPetById: async (req, res) => {
    try {
      const petId = req.params.petId;
      const pet = await Pet.findById(petId)
        .populate("breed")
        .populate("name photos");
      if (!pet) {
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      }
      res.json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // createPetNoLogin: [
  //   async (req, res) => {
  //     const photoUrls = req.files?.map((file) => file.path);

  //     console.log(req.body);
  //     try {
  //       const { name, breedId, photos } = req.body;

  //       if (!name || !breedId) {
  //         return res
  //           .status(422)
  //           .json({ status: false, message: "Missing required fields" });
  //       }

  //       const pet = await Pet.create({
  //         name,
  //         breed: breedId,
  //         photos: photoUrls,
  //       });

  //       res.status(201).json({ status: true, data: pet });
  //     } catch (error) {
  //       res.status(500).json({ status: false, message: error.message });
  //     }
  //   },
  // ],

  //Амьтны байршлыг харуулах

  updatePetLocation: async (req, res) => {
    try {
      const { latitude, longitude, id } = req.body;
      console.log(req.body);
      const pet = await Pet.findOne({ deviceId: id});
      if (!pet) {
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      }

      const data = await Pet.updateOne(
        { deviceId: id,  },
        { $set: { latitude, longitude } }
      );
      if (!data) {
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      }

      return res.json({ status: true, data });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // Get current locations of all pets for the owner
  getPetLocations: async (req, res) => {
    try {
      const ownerId = req.user.id;
      const pets = await Pet.find({ owner: ownerId }).select(
        "deviceId latitude longitude photos "
      );
      if (!pets) {
        return res
          .status(305)
          .json({ status: false, message: "Pets not found" });
      }
      res.json({ status: true, data: pets });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // getAllPets: async (req, res) => {
  //   try {
  //     const { breed, owner, page = 1, limit = 10 } = req.query;
  //     const filter = {};
  //     if (breed) filter.breed = breed;
  //     if (owner) filter.owner = owner;

  //     const skip = (Math.max(page, 1) - 1) * limit;
  //     const pets = await Pet.find(filter)
  //       .populate("breed")
  //       .populate("owner", "username email")
  //       .populate("geofence")
  //       .skip(skip)
  //       .limit(parseInt(limit, 10));

  //     const total = await Pet.countDocuments(filter);
  //     res.json({ status: true, data: pets, total, page: parseInt(page, 10) });
  //   } catch (error) {
  //     res.status(500).json({ status: false, message: error.message });
  //   }
  // },
};


// #include <TinyGPS++.h>
// #include <WiFiManager.h>
// #include <HTTPClient.h>

// #define RXD2 16
// #define TXD2 17
// #define GPS_BAUD 9600

// TinyGPSPlus gps;
// HardwareSerial gpsSerial(2);
// bool isWifiConnected = false;
// unsigned long lastSendTime = 0; // Сүүлд илгээсэн хугацаа

// void setup() {
//   Serial.begin(115200);
//   WiFiManager wm;

//   bool res = wm.autoConnect("AutoConnectAP", "password");

//   if (res) {
//     Serial.println("WiFi connected!");
//     isWifiConnected = true;
//     gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
//     Serial.println("GPS Serial started");
//   } else {
//     Serial.println("Failed to connect to WiFi.");
//   }
// }

// void loop() {
//   if (!isWifiConnected) return;

//   while (gpsSerial.available() > 0) {
//     gps.encode(gpsSerial.read());
//   }
  

//   // 10 секунд тутамд GPS илгээх
//   if (millis() - lastSendTime >= 10000) {
//     if (gps.location.isUpdated()) {
//       float lat = gps.location.lat();
//       float lng = gps.location.lng();
//       float spd = gps.speed.kmph();
//       float alt = gps.altitude.meters();

//       Serial.print("LAT: "); Serial.println(lat, 6);
//       Serial.print("LONG: "); Serial.println(lng, 6);
//       Serial.print("SPEED (km/h): "); Serial.println(spd);
//       Serial.print("ALT (m): "); Serial.println(alt);
//       Serial.print("Satellites: "); Serial.println(gps.satellites.value());

//       sendGPSData(lat, lng, spd, alt);
      
//       lastSendTime = millis(); // Сүүлд илгээсэн хугацааг шинэчлэх
//     }
//   }
// }

// void sendGPSData(float latitude, float longitude, float speed, float altitude) {
//   if (WiFi.status() == WL_CONNECTED) {
//     HTTPClient http;
//     String id = "\"pet1\"";

//     http.begin("http://192.168.1.164/api/pets/location");
//     http.addHeader("Content-Type", "application/json");

//     String jsonData = "{";
//     jsonData += "\"latitude\":" + String(latitude, 6) + ",";
//     jsonData += "\"longitude\":" + String(longitude, 6) + ",";
//     jsonData += "\"speed\":" + String(speed, 2) + ",";
//     jsonData += "\"altitude\":" + String(altitude, 2) + ",";
//     jsonData += "\"id\":" + id;
//     jsonData += "}";

//     int responseCode = http.POST(jsonData);

//     if (responseCode > 0) {
//       Serial.print("POST response: ");
//       Serial.println(responseCode);
//     } else {
//       Serial.print("POST error: ");
//       Serial.println(http.errorToString(responseCode).c_str());
//     }

//     http.end();
//   } else {
//     Serial.println("WiFi disconnected.");
//   }
// }
