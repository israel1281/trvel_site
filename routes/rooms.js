import express from 'express';
import {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoomAvailability,
} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//create
router.post('/hotelid', verifyAdmin, createRoom);

//update
router.put('/:id', verifyAdmin, updateRoom);

//Make reservation
router.put('availability/:id', updateRoomAvailability);

//Delete
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

//Get
router.get('/:id', getRoom);
router.get('/', getRooms);

export default router;
