import {prisma} from "../lib/prisma.js"


export async function getbyid(id){
const found= await prisma.listings.findFirst({
    where:{
        id:Number(id)
    }
})
return found;
}


export async function getall(query){
    const title = query?.title;
    const list_type = query?.list_type;
    const page = query?.page ? Number(query.page) : undefined; 
    const limit = query?.limit ? Number(query.limit) : undefined;
    if(query){
        if(!page && !limit){
        if(title && list_type){
        const listing=await prisma.listings.findMany({
            where:{
                title: title,
                list_type: list_type
            }
        })
        return listing
    }
    else if(title){
        const listing=await prisma.listings.findMany({
            where:{
                title: title
            }
        })
        return listing
    }
    else if(list_type){
        const listing=await prisma.listings.findMany({
            where:{
                list_type: list_type
            }
        })
        return listing
    }}
    else if(page && limit){
        if(title && list_type){
        const listing=await prisma.listings.findMany({
            where:{
                title: title,
                list_type: list_type
            },
            take:limit,
            skip:3*page

        })
        return listing
    }
    else if(title){
        const listing=await prisma.listings.findMany({
            where:{
                title: title
            },
            take:limit,
            skip:3*page
        })
        return listing
    }
    else if(list_type){
        const listing=await prisma.listings.findMany({
            where:{
                list_type: list_type
            },
            take:limit,
            skip:3*page
        })
        return listing
    }
    const listing=await prisma.listings.findMany({
            take:limit,
            skip:3*page

        })
        return listing
    }
    else if(page){
        if(title && list_type){
        const listing=await prisma.listings.findMany({
            where:{
                title: title,
                list_type: list_type
            },
            skip:3*page

        })
        return listing
    }
    else if(title){
        const listing=await prisma.listings.findMany({
            where:{
                title: title
            },
            skip:3*page
        })
        return listing
    }
    else if(list_type){
        const listing=await prisma.listings.findMany({
            where:{
                list_type: list_type
            },
            skip:3*page
        })
        return listing
    }
    const listing=await prisma.listings.findMany({
            skip:3*page
        })
        return listing
    }
    else if(limit){
        if(title && list_type){
        const listing=await prisma.listings.findMany({
            where:{
                title: title,
                list_type: list_type
            },
            take:limit

        })
        return listing
    }
    else if(title){
        const listing=await prisma.listings.findMany({
            where:{
                title: title
            },
            take:limit
        })
        return listing
    }
    else if(list_type){
        const listing=await prisma.listings.findMany({
            where:{
                list_type: list_type
            },
            take:limit
        })
        return listing
    }
    const listing=await prisma.listings.findMany({
            take:limit
        })
        return listing
    }}
        const listing=await prisma.listings.findMany()
        /* console.log(listing) */
        return listing
    
}


export async function postli(post){
    const {title ,description ,list_type}=post
    if(title && description && list_type){
        const posted= await prisma.listings.create({
            data:{
                title:title,
                description:description,
                list_type:list_type
            }
        })
        return post
    }
}

export async function patchli(post,id){
    const {title ,description ,list_type}=post
    if(title && description && list_type){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                title:title,
                description:description,
                list_type:list_type
            }
        })
        return post
    }
    else if(title && description){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                title:title,
                description:description
            }
        })
        return post
    }
    else if(title && list_type){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                title:title,
                list_type:list_type
            }
        })
        return post
    }
    else if(title){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                title:title
            }
        })
        return post
    }
    else if(description){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                description:description
            }
        })
        return post
    }
    else if(list_type){
        const posted= await prisma.listings.update({
            where:{id:id},
            data:{
                list_type:list_type
            }
        })
        return post
    }
}

export async function del_list(id){
    const del=await prisma.listings.delete({
        where:{
            id:id
        }
    })
    return del
}

export async function getresponse(id){
    const found= await prisma.responses.findMany({
        where:{
            listingid:id
        }
    })
    return found
}

export async function postresponse(id,body){
    const found= await prisma.responses.create({
        data:{
            listingid:id,
            userid:body.userid,
            response:body.response,
            accepted:body.accepted

        }
    })
    return found
}

export async function getskills(query){
    if(query){
        if(query.page&&query.limit){
             const skills=await prisma.skills.findMany({
                take:Number(query.limit),
                skip:3*query.page
             })
    return skills
        }
        else if(query.page){
            const skills=await prisma.skills.findMany({
                skip:3*query.page
             })
    return skills
        }
        else if(query.limit){
            const skills=await prisma.skills.findMany({
                take:Number(query.limit)
             })
    return skills
        }
        
}
    
        const skills=await prisma.skills.findMany()
    return skills
    
}

