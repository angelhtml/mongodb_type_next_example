import { NextResponse,NextRequest } from "next/server"
import mongoose, { Document, Model } from "mongoose";
 
export async function POST(request: NextRequest, response: Response) {
  const data = await request.json()

  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    name: String,
    password: String,
  });

  const user = mongoose.models.user || mongoose.model('user', UserSchema ) 

  await user.create({ 
    name: data.name, 
    password: data.password,
  });

  return NextResponse.json({ 
    name: data.name, 
    password: data.password,
  })
}