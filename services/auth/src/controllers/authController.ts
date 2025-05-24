import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Kullanıcı zaten var mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Şifreyi geri döndürme
    const { password: _, ...userData } = savedUser.toObject();

    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı var mı?
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Token oluştur
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};