"use client"
import { useState } from "react";
import { ExpenseProps } from "../type/ExpenseProps";
import { FormProps } from "../type/FormProps";

interface Expense {
    onAddExpense: (expense: ExpenseProps) => void;
}

export default function ExpenseForm({ onAddExpense }: Expense) {

    const [formData, setFormData] = useState<FormProps>({
        amount: 0,
        category: "",
        description: ""
    })

    async function handleSave() {
        const response = await fetch("/api/expense", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        const newCard: ExpenseProps = {
            id: data.id,
            description: data.description,
            category: data.category,
            createdAt: data.createdAt,
            amount: data.amount,
        };

        onAddExpense(newCard);

        setFormData({
            amount: 0,
            category: "",
            description: ""
        })
    }

    return (
        <div className="border border-gray-300 bg-white rounded-xl flex flex-col gap-4 p-4 w-1/3">

            <div className="flex flex-col">
                <h2 className="font-semibold text-lg">Add Expense</h2>
                <p className="text-md text-gray-600">Record a new transaction</p>
            </div>

            <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="$ 0.00"
                        className="rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                        value={formData.amount === 0 ? "" : formData.amount}
                        onChange={(e) => {
                            setFormData((prev) => ({
                            ...prev,
                            amount: Number(e.target.value),
                        }))
                        }} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        placeholder="Select Category"
                        className="rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            category: e.target.value
                        }))} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="What did you spend on?"
                        className="rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            description: e.target.value
                        }))} />
                </div>

                <div className="flex flex-col">
                    <button
                        className="text-white font-semibold bg-black rounded-xl p-2.5 mt-1 cursor-pointer hover:scale-102 hover:bg-gray-950 transition-transform"
                        onClick={handleSave}>
                        + Add Expense
                    </button>
                </div>

            </div>

        </div>
    )
}