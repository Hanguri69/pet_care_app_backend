const Pet = require("../models/Pet");
const User = require("../models/User");
const Geofence = require("../models/Geofence");
const multer = require("multer");

// Configure multer for handling form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });
//asdf
module.exports = {
  //Хэрэглэгч амьтан нэмэх
  createPet: async (req, res) => {
    try {
      const photoUrls = req.files.map((file) => file.path);
      const { name, breedId, photos } = req.body;
      const ownerId = req.user.id;

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
      });

      res.status(201).json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getPetByOwner: async (req, res) => {
    try {
      const pets = await Pet.find({ owner: req.user.id }).select("name photos"); // Select only name and photos

      res.json({ status: true, data: pets });
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
      const { latitude, longitude, speed, id } = req.body;
      console.log(req.body);
      res.json({ status: true, data: { latitude, longitude } });

      //   if (!petId || latitude == null || longitude == null) {
      //     return res
      //       .status(422)
      //       .json({ status: false, message: "Missing required GPS data" });
      //   }

      //   const pet = await Pet.findOne({ _id: petId, owner: ownerId });
      //   if (!pet) {
      //     return res
      //       .status(404)
      //       .json({ status: false, message: "Pet not found" });
      //   }

      //   // Update location as GeoJSON point
      //   pet.location = {
      //     type: "Point",
      //     coordinates: [longitude, latitude],
      //   };
      //   await pet.save();
      //   const [longitude1, latitude1] = pet.location.coordinates;
      //   return res.json({
      //     status: true,
      //     data: { latitude1, longitude1 },
      //   });
      // } catch (error) {
      //   res.status(500).json({ status: false, message: error.message });
    } catch (error) {}
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

  getPetById: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id)
        .populate("breed")
        .populate("owner", "username email")
        .populate("geofence");
      if (!pet)
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      res.json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  updatePet: async (req, res) => {
    try {
      const updates = req.body;
      const pet = await Pet.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      })
        .populate("breed")
        .populate("owner", "username email")
        .populate("geofence");
      if (!pet)
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      res.json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // Delete a pet
  deletePet: async (req, res) => {
    try {
      const pet = await Pet.findByIdAndDelete(req.params.id);
      if (!pet)
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      res.json({ status: true, message: "Pet deleted" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // Get pets within a radius (in meters) of a point
  getPetsWithinRadius: async (req, res) => {
    try {
      const { lng, lat, radius = 1000 } = req.query;
      if (!lng || !lat) {
        return res
          .status(422)
          .json({ status: false, message: "Coordinates required" });
      }
      const distance = radius / 6378137; // radius of Earth in meters
      const pets = await Pet.find({
        location: {
          $geoWithin: {
            $centerSphere: [[parseFloat(lng), parseFloat(lat)], distance],
          },
        },
      })
        .populate("breed")
        .populate("owner", "username");
      res.json({ status: true, data: pets });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // Get pets by geofence
  getPetsByGeofence: async (req, res) => {
    try {
      const geofenceId = req.params.geofenceId;
      const pets = await Pet.find({ geofence: geofenceId })
        .populate("breed")
        .populate("owner", "username");
      res.json({ status: true, data: pets });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  // Upload photos for a pet (assumes middleware like multer populates req.files)

  // Delete a specific photo from a pet
  deletePetPhoto: async (req, res) => {
    try {
      const { id, photoIndex } = req.params;
      const pet = await Pet.findById(id);
      if (!pet)
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });

      // Remove photo by index
      pet.photos.splice(photoIndex, 1);
      await pet.save();
      res.json({ status: true, data: pet });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
