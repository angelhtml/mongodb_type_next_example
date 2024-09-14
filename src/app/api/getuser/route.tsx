import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request: Request, res : any) {
    
    const Schema = mongoose.Schema;
    
    const UserSchema = new Schema({
    name: String,
    password: String
});

  const user = mongoose.models.user || mongoose.model('user', UserSchema )

  const result = await user.aggregate([
    {$unset: 'password'}
  ])
  
  return NextResponse.json(result)
}