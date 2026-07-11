import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
})

export async function GET() {
    const cards = await prisma.expense.findMany()
    return Response.json(cards);
}

export async function POST(request: Request) {
    const body = await request.json();
    const card = await prisma.expense.create({
        data: {
            description: body.description,
            amount: body.amount,
            category: body.category
        },
    });

    return Response.json(card);
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const card = await prisma.expense.delete({
        where: {
            id: body.id,
        },
    });

    return Response.json(card);
}