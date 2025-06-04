import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from 'yayinstocks_shared_module/models/user.model';

export const signupController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, age, contact, gender } = req.body;
        if (!email || !password || !name || !age || !contact || !gender) {
            res.status(400).json({ message: 'Please fill all fields!' });
            return;
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            contact,
            gender
        });

        if (!newUser) {
            res.status(500).json({ message: 'Failed to create user' });
            return;
        }

        res.status(201).json({
            message: 'Signup successful',
            user: { email }
        });
        return;

    } catch (error) {
        console.error('Error in [signup controller]:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}