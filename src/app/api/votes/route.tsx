import { db } from "../../../../lib/db"
import { NextResponse } from "next/server";

async function POST(req:Request){
    try{
        const {id,aspect,type}= await req.json()
        const user = await db.user.findUnique({where:{id}})
        const aspectData = await db.aspect.findUnique({where:{id:aspect}})
        if(!user||!aspect){
            return NextResponse.json("User orAspect not found")
        }
        const vote = await db.vote.create({
            data:{
                userId:user.id,
                aspectId:user.id,
                type:type.toUpperCase(),
            }
        })
        return NextResponse.json(vote)

    }catch(error){
        return NextResponse.json({error:`Method${req.method} Not Allowed`})
    }
}