import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma?.$extends(withAccelerate()) || new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
export default prismadb;
