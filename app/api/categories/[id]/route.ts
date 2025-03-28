// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// interface Params {
//   params: {
//     id: string
//   }
// }

// export async function DELETE(request:NextRequest,  { params }:Params) {

//   const id = params.id

//   if(!id) {
//     return NextResponse.json({error: {message: 'MISSING_URL_PARAMS'}}, {status: 400})
//   }

//   const { userId } = await auth()

//   if(!userId) {
//     NextResponse.json({error: {message: 'UNAUTHORIZED'}}, {status: 403})
//   }

//   try {

//   }

// }
