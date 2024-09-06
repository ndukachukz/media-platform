import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { env } from "@/env";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the event
  const eventType = evt.type;

  switch (eventType) {
    case "user.created":

    case "user.updated":
      const { id: clerk_id, email_addresses, ...userData } = evt.data;
      // Create or update user in your database
      await prisma.user.upsert({
        where: { id: clerk_id, clerk_id },
        update: {
          clerk_id,
          profile: {
            upsert: {
              create: {
                email_or_phone: email_addresses[0]?.email_address || "",
                first_name: userData.first_name || "",
                last_name: userData.last_name || "",
                image: userData.image_url,
              },
              update: {
                email_or_phone: email_addresses[0]?.email_address || "",
                first_name: userData.first_name || "",
                last_name: userData.last_name || "",
                image: userData.image_url,
              },
            },
          },
        },
        create: {
          clerk_id: clerk_id,
          profile: {
            create: {
              email_or_phone: email_addresses[0]?.email_address || "",
              first_name: userData.first_name || "",
              last_name: userData.last_name || "",
              image: userData.image_url,
            },
          },
        },
      });
      console.log(`Processed ${eventType} event for user ${clerk_id}`);
      break;

    case "session.created":
      const { id: session_id, user_id, expire_at } = evt.data;
      // Create a new session record in your database
      await prisma.session.create({
        data: {
          session_token: session_id,
          user_id: user_id,
          expires: new Date(expire_at),
        },
      });
      console.log(`Processed session.created event for user ${user_id}`);
      break;

    // Add more cases as needed for other event types
  }

  return new Response("", { status: 200 });
}
