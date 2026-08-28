export function notfound(req,res, next){
    if(req.path!="api/."){
        return res.status(404).json({message:"Route not found"})
    }
    next();
}
