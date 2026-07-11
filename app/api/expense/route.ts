import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
})

export async function GET() {
    const expenses = await prisma.expense.findMany()
    return Response.json(expenses);
}

export async function POST(request: Request) {
    const body = await request.json();
    const expense = await prisma.expense.create({
        data: {
            description: body.description,
            amount: body.amount,
            category: body.category
        },
    });

    return Response.json(expense);
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const expense = await prisma.expense.delete({
        where: {
            id: body.id,
        },
    });

    return Response.json(expense);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const expense = await prisma.expense.update({
        where: {
            id: body.id,
        },
        data: {
            description: body.description,
            amount: body.amount,
            category: body.category,
        },
    });

    return Response.json(expense);
}