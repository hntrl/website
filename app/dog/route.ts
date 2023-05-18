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
  let stat = fs.statSync(random_image);
  let buffer = fs.readFileSync(random_image);
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Size": stat.size.toString(),
    },
  });
}
