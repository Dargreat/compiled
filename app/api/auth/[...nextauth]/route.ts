// app/api/reddit/password/[id]/route.ts
import { handlers } from "@/auth"; // v5 auth handlers
import { getServerSession } from "next-auth";

// Force Node.js runtime
export const runtime = "nodejs";

// Re-export standard NextAuth handlers
export const { POST } = handlers;

// Custom GET logic
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(); // pass config if needed
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Your custom logic here
  return new Response(`Password ID: ${params.id}`, { status: 200 });
}
