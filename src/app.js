import {service} from "./server.js"
import express from 'express'
import {prisma} from "./lib/prisma.js"
import {get} from "./controllers/controllers.js"
import {router} from "./routes/routes.js";
import {notfound} from "./middleware/notfound.js"
import {logger} from "./middleware/requestlogger.js"
import {seedlisting,seedresponse,seedskill,seedskill_listing,seeduser} from "../prisma/seed.js"

service();