import Users from '../models/Users.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        await newUser.save();
        res.status(200).send('User created successfully');
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            username: req.body.username,
        });
        if (!user) return next(createError(404, 'User not found'));

        const isPassCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPassCorrect)
            return next(createError(400, 'Wrong Password or Username'));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        const { ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json(otherDetails);
    } catch (err) {
        next(err);
    }
};
