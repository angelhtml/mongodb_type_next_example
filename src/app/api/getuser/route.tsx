import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request: Request, res : any) {
    
    const Schema = mongoose.Schema;
    
    const UserSchema = new Schema({
    name: String,
    password: String
});

  const user = mongoose.models.user || mongoose.model('modelName', UserSchema )

  const result = await user.find({})
  
  return NextResponse.json(result)
}