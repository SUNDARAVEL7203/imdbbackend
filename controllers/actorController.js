import { Actor } from "../models/actormodel.js";

export const createActor = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;
    if (!name || !gender || !dob || !bio) {
      return res.status(400).json({ message: "All actor fields are required." });
    }

    const actor = new Actor({ name, gender, dob, bio });
    await actor.save();
    res.status(201).json({ message: "Actor created successfully", actor });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json({ actors });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch actors" });
  }
};

export const updateActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }

    const { name, gender, dob, bio } = req.body;
    actor.name = name || actor.name;
    actor.gender = gender || actor.gender;
    actor.dob = dob || actor.dob;
    actor.bio = bio || actor.bio;

    await actor.save();
    res.json({ message: "Actor updated successfully", actor });
  } catch (err) {
    res.status(500).json({ message: "Failed to update actor" });
  }
};

export const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }

    res.json({ message: "Actor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete actor" });
  }
};
