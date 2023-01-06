import express from 'express';
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from '../controllers/user.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('Logged in');
// });
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Admin Logged in, you can delete all account');
// });

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);

export default router;
