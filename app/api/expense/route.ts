import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
})

export async function GET() {

    const { userId } = await auth();

    if (!userId) {
        return Response.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    };

    const expenses = await prisma.expense.findMany({
        where: {
            userId: userId,
        },
    });
    return Response.json(expenses);
}

export async function POST(request: Request) {

    const { userId } = await auth();

    if (!userId) {
        return Response.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    };

    const body = await request.json();
    const expense = await prisma.expense.create({
        data: {
            description: body.description,
            amount: body.amount,
            category: body.category,
            userId,
        },
    });

    return Response.json(expense);
}

export async function DELETE(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return Response.json(
            {
                error: "Unauthorized!",
            },
            {
                status: 401,
            }
        );
    };

    const body = await request.json();
    const existingExpense = await prisma.expense.findUnique({
        where: {
            id: body.id,
        },
    });

    if (!existingExpense) {
        return Response.json(
            {
                error: "Expense not found",
            },
            {
                status: 404,
            }
        );
    };

    if (existingExpense.userId === userId) {

        const deletingExpense = await prisma.expense.delete({
            where: {
                id: body.id,
            },
        });

        return Response.json(deletingExpense);
    } else {
        return Response.json(
            {
                error: "Expense not found",
            },
            {
                status: 404,
            }
        );
    };
}

export async function PUT(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return Response.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const body = await request.json();

    const existingExpense = await prisma.expense.findUnique({
        where: {
            id: body.id,
        },
    });

    if (!existingExpense) {
        return Response.json(
            {
                error: "Expense Not Found",
            },
            {
                status: 404,
            }
        );
    };

    if (existingExpense.userId === userId) {


        const updatingExpense = await prisma.expense.update({
            where: {
                id: body.id,
            },
            data: {
                description: body.description,
                amount: body.amount,
                category: body.category,
            },
        });
        return Response.json(updatingExpense);
    } else {
        return Response.json(
            {
                error: "Expense not Found",
            },
            {
                status: 404,
            }
        );
    }
}