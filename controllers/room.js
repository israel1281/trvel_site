import Room from '../models/Rooms.js';
import Hotel from '../models/Hotels.js';
// import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {
                    rooms: savedRoom._id,
                },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { 'roomNumber2._id': req.params.id },
            {
                $push: {
                    'roomnumbers.$.unavailableDate': req.body.dates,
                },
            }
        );
        res.status(200).json('Room Updated');
    } catch (err) {
        next(err);
    }
};

//Deleting a Room
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {
                    rooms: req.params._id,
                },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json('Room has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

//Getting a Room
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Getting all rooms
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Hotel.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};
