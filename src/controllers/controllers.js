import { prisma } from "../lib/prisma.js";
import { getall,getbyid,postli,patchli,del_list,getresponse,postresponse,getskills } from "../services/services.js"


export async function get(req,res){
    const query=req.query
    const data= await getall(query);
    if(!data)
        return res.status(404).json({message: "listing not found"})
    return res.status(200).json(data)
}
export async function getid(req,res){
    const id=req.params.id
    const data= await getbyid(id)
    if(!data)
        return res.status(404).json({message: "listing not found"})
    return res.status(200).json(data)
}

export async function postlist(req,res){
    const post=req.body
    const data= await postli(post)
    return res.status(201).json(data)
}

export async function patchlist(req,res){
    const id=Number(req.params.id)
    const post=req.body
    if(!post)
        return res.status(400).json({message:"Please enter input!"})
    const data= await patchli(post,id)
    if(!data)
        return res.status(404).json({message:"Record doesnt exist!"})
    return res.status(200).json(data)
}

export async function de_list(req,res){
    const id=Number(req.params.id)
    const deleted= await del_list(id);
    return res.status(204).json(deleted)
}

export async function getresp(req,res){
    const id=Number(req.params.id)
    const check= await getresponse(id);
    if(!check)
        return res.status(404).json({message:"Record doesnt exist!"})
    return res.status(200).json(check)
}

export async function postresp(req,res){
    const body=req.body
    const id=Number(req.params.id)
    const check=await prisma.listings.findMany(
        {
            where:{id:id}
        }
    )
    if(!check)
        return res.status(404).json({message:"listing id not non existing!"})
    const data= await postresponse(id,body)
    if(!data)
        return res.status(400).json({message:"Enter input please!"})
    return res.status(200).json(data)

}

export async function getskill(req,res){
    const query=req.query
    const skills= await getskills(query)
    res.status(200).json(skills)
}
