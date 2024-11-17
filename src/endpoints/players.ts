import { Request, Response } from "express";
import {PlayerCredentials, PlayerRegister} from "../types/player";
import { db } from "../server";
import { PlayerData, User } from "../models/user";
import bcrypt from 'bcrypt';
import TeamData from "../models/team";

const generatePassword = (
    length = 20,
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ) =>
    Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join('');

export const login = async (req: Request, res: Response) => {
    const body: PlayerCredentials = req.body;
    const query = { login: body.login }
    const user = await db.collection<User>("users").findOne(query);
    if(!user) {
        res.status(404).send({error: "User has not been set."});
        return;
    }
    if(!bcrypt.compareSync(body.password, user.password)) {
        res.status(401).send({error: "Wrong password!"});
        return;
    }
    const teamQuery = { teamName: user.teamName };
    const team = await db.collection<TeamData>("teams").findOne(teamQuery);
    if(!team) {
        res.status(401).send({error: "Team not presented"});
        return;
    }
    const response: PlayerData = {
        login: user.login,
        team,
        role: user.role
    };
    res.status(200).send(response);
}

export const register = async (req: Request, res: Response) => {
    const body: PlayerRegister = req.body;
    const teamQuery = { teamName: body.teamName };
    const team = await db.collection<TeamData>("teams").findOne(teamQuery);
    if(!team) {
        res.status(404).send({error: "Team not found"});
        return;
    }
    const password = generatePassword();
    const user: User = {
        login: body.login,
        password,
        teamName: body.teamName,
        role: body.role
    }
    const userToInsert: User = {
        login: body.login,
        password: bcrypt.hashSync(password, 10),
        teamName: body.teamName,
        role: body.role
    }
    db.collection("users").insertOne(userToInsert);
    res.status(200).send(user);
}