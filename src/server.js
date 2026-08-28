import express from 'express'
import {prisma} from "./lib/prisma.js"
import {get} from "./controllers/controllers.js"
import {router} from "./routes/routes.js";
import {notfound} from "./middleware/notfound.js"
import {logger} from "./middleware/requestlogger.js"
import {seedlisting,seedresponse,seedskill,seedskill_listing,seeduser} from "../prisma/seed.js"
const server=express();
/* await prisma.listings.createMany({ data: seedlisting })
await prisma.users.createMany({ data: seeduser })
await prisma.skills.createMany({ data: seedskill })
await prisma.responses.createMany({ data: seedresponse })
await prisma.skill_listing.createMany({ data: seedskill_listing }) */

export function service()
{server.use(express.json());

server.use((err, req, res, next) => {
  if (err.name === 'SyntaxError') {
    return res.status(400).json({ message: "Invalid JSON format, please check your data" });
  }
  next(err);
});

server.use(logger)

server.use("/api", router)

server.use(notfound)


server.listen(3000,()=>{
    console.log("Server is listenign at 3000!")
})}

