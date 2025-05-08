import { Producer } from "../models/producermodel.js";

export const createProducer = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;
    if (!name || !gender || !dob || !bio) {
      return res.status(400).json({ message: "All producer fields are required." });
    }

    const producer = new Producer({ name, gender, dob, bio });
    await producer.save();
    res.status(201).json({ message: "Producer created successfully", producer });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducers = async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json({ producers });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch producers" });
  }
};

export const updateProducer = async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }

    const { name, gender, dob, bio } = req.body;
    producer.name = name || producer.name;
    producer.gender = gender || producer.gender;
    producer.dob = dob || producer.dob;
    producer.bio = bio || producer.bio;

    await producer.save();
    res.json({ message: "Producer updated successfully", producer });
  } catch (err) {
    res.status(500).json({ message: "Failed to update producer" });
  }
};

export const deleteProducer = async (req, res) => {
  try {
    const producer = await Producer.findByIdAndDelete(req.params.id);
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }

    res.json({ message: "Producer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete producer" });
  }
};
