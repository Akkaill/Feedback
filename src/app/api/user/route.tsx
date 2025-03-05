import { db } from "../../../../lib/db";
import { NextResponse ,NextRequest} from "next/server"

export async function GET(req:Request){
    try{
        const users = await db.user.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                votes:true
            }
        })
        return NextResponse.json(users)

    }catch(error){
        NextResponse.json({error:"Erorr Fetching User"})
    }
}

export async function POST(req:Request){
    try{
        const {name}= await req.json()
        const user = await db.user.create({data:{name}})
        return NextResponse.json(user)
    }catch(error){
        return NextResponse.json({error:"Error Creating User"})
    }
}