import { db } from "../../../../lib/db"
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const {name,aspect,type}= await req.json()
        const user = await db.user.findUnique({where:{name}})
        const aspectData = await db.aspect.findUnique({where:{name:aspect}})
        if(!user||!aspectData){
            return NextResponse.json("User orAspect not found")
        }
        const vote = await db.vote.create({
            data:{
                userId:user.id,
                aspectId:aspectData.id,
                type:type.toUpperCase(),
            }
        })
        return NextResponse.json(vote)

    }catch(error){
        return NextResponse.json({error:`Method${req.method} Not Allowed`})
    }
}