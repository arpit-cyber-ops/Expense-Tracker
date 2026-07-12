"use client"
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import Header from "./Header"
import SummaryCard from "./SummaryCard"
import { ExpenseProps } from "../type/ExpenseProps";

export default function ExpensePage() {

    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [editingExpense, setEditingExpense] = useState<ExpenseProps | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchExpenses() {
            try {

                const response = await fetch("/api/expense");

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses")
                }
                const data: ExpenseProps[] = await response.json();

                setExpenses(data);
            }   
            
            catch (error) {
                console.log(error);
                setError("Failed to load expenses. Please refresh the page.")
            }

            finally {
                setLoading(false)
            }
        }
        fetchExpenses()
    }, [])

    async function deleteExpense(deleteId: number) {
        setError("");
        try {
            const response = await fetch("/api/expense", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    id: deleteId,
                }),
            });
            if (!response.ok) {
                throw new Error("Deleting failed. Try again")
            }
            setExpenses(prev => prev.filter(expense => expense.id !== deleteId))
        }

        catch (error) {
            console.log(error);

            setError("Failed to delete expense. Please try again.");
        }

        finally {
            setEditingExpense(null);
        }
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
                        onFinishEditing={() => setEditingExpense(null)}
                    />

                    <ExpenseList
                        expenses={expenses}
                        onDeleteExpense={deleteExpense}
                        onEditingExpense={(expense) => setEditingExpense(expense)}
                        error={error}
                        loading={loading}
                    />

                </div>
            </div>
        </div>
    )
}