import TeamData from "../models/team";
import { db } from "../server";
import { Request, Response } from "express";


export const fetchTeams = async (req: Request, res: Response) => {
    const list = await db.collection<TeamData>("teams").find().toArray();
    console.log(list);
    res.status(200).send(list);
}

export const registerTeam = async (req: Request, res: Response) => {
    const team: TeamData = req.body;
    await db.collection("teams").insertOne(team);
    res.status(201).send();
}