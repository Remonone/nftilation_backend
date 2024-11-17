import { Request, Response } from "express";
import PlayerCredentials from "../types/player";
import { db } from "../server";
import { PlayerData, User } from "../models/user";
import bcrypt from 'bcrypt';
import winston from "winston";
import { logger } from "../logger";

export const login = async (req: Request, res: Response) => {
    const body: PlayerCredentials = req.body;
    const query = { login: body.login }
    const user = await db.collection("users").findOne(query);
    if(!user) {
        res.status(404).send({error: "User has not been set."});
        return;
    }
    if(!bcrypt.compareSync(body.password, user.password)) {
        res.status(401).send({error: "Wrong password!"});
        return;
    }
    const response: PlayerData = {
        login: user.login,
        team: user.teamData,
        role: user.role
    };
    res.status(200).send(response);
}

export const register = (req: Request, res: Response) => {
    logger.debug("Registering...");
}