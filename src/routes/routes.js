import { Prisma } from "../generated/prisma/client.ts";
import express from "express"
import {get,getid,postlist,postresp,patchlist,de_list,getresp,getskill} from "../controllers/controllers.js"
import {idcheck,updateval,createval} from "../middleware/validators.js"

export const router=express.Router()

router.get("/listings", get)

router.get("/listings/:id",idcheck, getid)

router.post("/listings",createval, postlist)

router.patch("/listings/:id",idcheck,updateval, patchlist)

router.delete("/listings/:id",idcheck, de_list)

router.get("/listings/:id/responses",idcheck, getresp)

router.post("/listings/:id/responses",idcheck,createval, postresp)

router.get("/skills", getskill)