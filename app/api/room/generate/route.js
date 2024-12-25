import Room from "../../../../models/room";
import User from "../../../../models/user";
import { sendEmail } from "../../../../utils/sendEmail";
import Replicate from "replicate";
import { connectToDB } from "../../../../utils/database";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

async function uploadFromUrl(params) {
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${params.accountId}/uploads/url`;
  const entries = (obj) =>
    Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(params.requestBody),
    headers: Object.fromEntries(
      entries({
        Authorization: `Bearer ${params.apiKey}`,
        "Content-Type": "application/json",
      })
    ),
  });
  const result = await response.json();
  if (Math.floor(response.status / 100) !== 2)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  return result;
}

export const POST = async (req) => {
  const { imageUrl, theme, room, photoName, userId, email } = await req.json();
  console.log(imageUrl, theme, room, userId, email);

  const loggedInUser = await User.findById(userId);
  if (!loggedInUser.credits > 0) {
    return new Response("You need credits to generate new rooms", {
      status: 403,
    });
  }

  const model =
    "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";
  const input = {
    image: imageUrl,
    prompt:
      room === "Gaming Room"
        ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs"
        : `a ${theme.toLowerCase()} ${room.toLowerCase()} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
    a_prompt:
      "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
    n_prompt:
      "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
  };
  const output = await replicate.run(model, { input });
  console.log(output);
  // Save imageUrl, output[1] to the database

  try {
    const generated_photo_bytescale = await uploadFromUrl({
      accountId: process.env.BYTE_SCALE_ACCOUNT_ID,
      apiKey: process.env.BYTE_SCALE_KEY,
      requestBody: {
        url: output[1],
      },
    });

    console.log(imageUrl, generated_photo_bytescale);
    const subject = "Your Room AI Generation is Completed!";
    const text = `
    <h1>Your Room AI Generation is Complete!</h1>
    <p>Dear Customer,</p>
    <p>We are pleased to inform you that the generation process for your room AI has been completed. Here are the details:</p>
    <ul>
    <li>Original Image: <a href="${imageUrl}">View Original Image</a></li>
      <li>Generated Image: <a href="${generated_photo_bytescale.fileUrl}">View Generated Image</a></li>

    </ul>
    <p>Thank you for using our service. If you have any questions or need further assistance, please feel free to contact us.</p>
    <p>Best regards,</p>
    <p>Resigns AI Team</p>
  `;
    await sendEmail(email, subject, text);
    await connectToDB();
    const newRoom = new Room({
      creator: userId,
      name: photoName.replace(/\s/g, ""),
      original_photo: imageUrl,
      generated_photo: generated_photo_bytescale.fileUrl,
    });

    await newRoom.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    return new Response(JSON.stringify(output), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new room", { status: 500 });
  }
};
