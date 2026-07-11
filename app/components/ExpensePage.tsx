"use client"
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import Header from "./Header"
import SummaryCard from "./SummaryCard"
import { ExpenseProps } from "../type/ExpenseProps";

export default function ExpensePage() {

    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [editingExpense, setEdittingExpense] = useState<ExpenseProps | null>(null);

    useEffect(() => {
        
        async function fetchExpenses() {
            const response = await fetch("/api/expense");
            const data: ExpenseProps[] = await response.json();

            setExpenses(data);
        }

        fetchExpenses()
    }, [])

    async function deleteExpense(deleteId: number) {
        const response = await fetch("/api/expense", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: deleteId,
            }),
        });
        setExpenses(prev => prev.filter(expense => expense.id !== deleteId))
        setEdittingExpense(null)
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full min-h-screen bg-slate-50  text-black">
            <div className="max-w-5xl w-full px-6 mx-auto flex flex-col gap-6 p-6 m-4">

                <div className="flex flex-col gap-6">

                    <Header />

                    <SummaryCard />

                </div>

                <div className="flex gap-8 items-start">

                    <ExpenseForm
                        onAddExpense={expense => setExpenses(prev => [...prev, expense])} 
                        editingExpense={editingExpense}
                        onUpdateExpense={(updatedExpense) => setExpenses(prev => (
                            prev.map(expense => (
                                expense.id === updatedExpense.id ? updatedExpense : expense
                            ))
                        ))}
                        onFinishEditing={() => setEdittingExpense(null)}
                    />

                    <ExpenseList 
                        expenses={expenses} 
                        onDeleteExpense = {deleteExpense} 
                        onEditingExpense={(expense) => setEdittingExpense(expense)}
                    />

                </div>
            </div>
        </div>
    )
}