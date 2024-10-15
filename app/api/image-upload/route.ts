import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { userID } = auth(request);

  // Check if user is authenticated
  if (!userID) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    // Get form data and the uploaded file
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    // Check if a file was uploaded
    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the file to Cloudinary
    const uploadResult: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "next-cloudinary-upload",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          }
        );
        uploadStream.end(buffer);
      }
    );

    // Return the upload result as a JSON response
    return NextResponse.json(uploadResult);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Return specific error message
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
    // Handle unknown errors
    return NextResponse.json(
      {
        error: "Unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
