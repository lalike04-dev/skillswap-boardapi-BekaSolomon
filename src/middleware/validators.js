import express from 'express'
import {prisma} from "../lib/prisma.js"

export async function idcheck(req,res,next){
    const id=Number(req.params.id)
 const foundlist=await prisma.listings?.findUnique({
    where:{
        id:id
    }
 })

 const foundresponse=await prisma.responses?.findMany({
    where:{
        listingid:id
    }
 })
 
 
 if (req.path.includes('/responses')) {
    if (foundresponse.length === 0) {
        return res.status(400).json({ message: "Invalid Input: No responses found" });
    }
} else {
    if (!foundlist) {
        return res.status(400).json({ message: "Invalid Input: Listing not found" });
    }
}

 next();
}

export async function updateval(req,res,next){
    const id=Number(req.body?.id)
    if(id){
        return res.status(400).json({message:"Id isnt meant to be updated!"})
    }
    next();
}

export async function createval(req,res,next){
    if(req.path.includes("/responses")){
        const{userid,listingid,response,accepted}=req.body
        if(!userid)
            return res.status(400).json({message:"User's ID is needed!"})
        if(!listingid)
            return res.status(400).json({message:"Listing ID is needed!"})
        if(!response)
            return res.status(400).json({message:"Response is mandatory!"})
        }
    else{
        const{title,description,list_type}=req.body
        if(!title)
            return res.status(400).json({message:"Title is needed!"})
        if(!description)
            return res.status(400).json({message:"Listing description is needed!"})
        if(!list_type)
            return res.status(400).json({message:"Listing type is needed!"})
        else if(list_type!="Offering" || list_type!="Recieving"){
            return res.status(400).json({message:"Invalid input for listing type!"})
        }
    }
    next();
    }