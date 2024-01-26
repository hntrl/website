import sharp from "sharp";
import path from "path";
import fs from "fs";

let imagePath = path.resolve(process.cwd(), "public/dog-images");
let images = fs.readdirSync(imagePath);

export const dynamic = "force-dynamic";

export async function GET() {
  let random_image = path.resolve(
    imagePath,
    images[Math.floor(Math.random() * images.length)]
  );
  let buffer = await sharp(random_image)
    .resize({ height: 900 })
    .withMetadata()
    .toBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Size": buffer.length.toString(),
    },
  });
}
