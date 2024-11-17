import { Request, Response } from "express";
import { db } from "../server";
import { SkinInfo } from "../models/skins";

export const getSkin = async (req: Request, res: Response) => {
    const skinId = req.query.game_role;
    const skinQuery = {id: skinId};
    const info = await db.collection("skins").findOne(skinQuery);
    res.status(200).send(info);
}

export const insertSkin = async (req: Request, res: Response) => {
    const body: SkinInfo = req.body;
    await db.collection("skins").insertOne(body);
    res.status(201).send();
}