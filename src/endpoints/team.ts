import TeamData from "../models/team";
import { db } from "../server";
import { Request, Response } from "express";


export const fetchTeams = async (req: Request, res: Response) => {
    const teams = await db.collection("teams").find();
    res.status(200).send(teams);
}

export const registerTeam = async (req: Request, res: Response) => {
    const team: TeamData = req.body;
    await db.collection("teams").insertOne(team);
    res.status(201).send();
}