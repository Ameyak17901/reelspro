import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const imagekit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    });
    const authenticationParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParams);
  } catch (error) {
    console.error("Error in imagekit authentication: " + error);
    return NextResponse.json(
      { error: "Imagekit authentication failed" },
      { status: 500 }
    );
  }
}
