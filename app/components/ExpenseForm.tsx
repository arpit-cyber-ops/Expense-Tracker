"use client"
import { useEffect, useState } from "react";
import { ExpenseProps } from "../type/ExpenseProps";
import { FormProps } from "../type/FormProps";

interface Expense {
    onAddExpense: (expense: ExpenseProps) => void;
    editingExpense: ExpenseProps | null;
    onUpdateExpense: (updateExpense: ExpenseProps) => void;
    onFinishEditing: () => void;
}

export default function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onFinishEditing }: Expense) {

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState<FormProps>({
        amount: "",
        category: "",
        description: ""
    })

    function resetForm() {
        setFormData({
            amount: "",
            category: "",
            description: ""
        })
    }

    function validateForm() {
        if (Number(formData.amount) <= 0) {
            setError("Enter a valid amount");
            return false;
        }
        if (!formData.category) {
            setError("Category cannot be empty");
            return false;
        }
        if (!formData.description.trim()) {
            setError("Description cannot be empty");
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                amount: String(editingExpense.amount),
                category: editingExpense.category,
                description: editingExpense.description,
            });
        } else {
            resetForm();
        }
    }, [editingExpense])

    async function handleEdit() {
        setError("");
        if (!editingExpense) return;
        if (!validateForm()) return;

        setSaving(true);
        try {

            const response = await fetch("/api/expense", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    id: editingExpense.id,
                    ...formData,
                    amount: Number(formData.amount),
                }),
            });

            if (!response.ok) {
                throw new Error("Request Failed");
            }

            const updatedExpense = await response.json();
            onUpdateExpense(updatedExpense);

            resetForm();
            onFinishEditing();
        }
        catch (error) {
            setError("Failed to edit expense! Please try again")
        }

        finally {
            setSaving(false);
        }

    }

    async function handleSave() {
        setError("");
        if (!validateForm()) return;
        setSaving(true)
        try {

            const response = await fetch("/api/expense", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    amount: Number(formData.amount),
                }),
            });

            if (!response.ok) {
                throw new Error("Request Failed");
            }

            const data = await response.json();
            const newCard: ExpenseProps = {
                id: data.id,
                description: data.description,
                category: data.category,
                createdAt: data.createdAt,
                amount: data.amount,
            };

            onAddExpense(newCard);
            resetForm();
        }

        catch (error) {
            setError("Failed to save expense! Please try again")
        }

        finally {
            setSaving(false);
        }
    }

    return (
        <div className="border border-gray-300 bg-white rounded-xl flex flex-col gap-4 p-4 w-1/3">

            <div className="flex flex-col">
                <h2 className="font-semibold text-lg">Add Expense</h2>
                <p className="text-md text-gray-600">Record a new transaction</p>
            </div>

            <div className="flex flex-col gap-5">

                <div>
                    {error && (
                        <p className="text-black border-2 rounded-2xl p-2 bg-red-500">{error}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="$ 0.00"
                        className="rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                        value={formData.amount}
                        onChange={(e) => { !Number.isNaN(Number(e.target.value)) &&
                            setFormData((prev) => ({
                                ...prev,
                                amount: e.target.value,
                            }))
                        }} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                        className={`rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform ${formData.category === ""
                            ? "text-gray-500"
                            : "text-black"
                            }`}>
                        <option value="" disabled>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Learning">Learning</option>
                        <option value="Other">Other</option>
                    </select>

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

                <div className="flex flex-col gap-4 items-center">
                    <button
                        className="text-white font-semibold w-full bg-black rounded-xl p-2.5 mt-1 cursor-pointer hover:scale-102 hover:bg-gray-950 transition-transform"
                        onClick={editingExpense ? handleEdit : handleSave}
                        disabled={saving}>
                        {saving ?
                            editingExpense ?
                                "Updating..." : "Saving..." :
                            editingExpense ? "Update Expense" : "Add Expense"}
                    </button>
                    {editingExpense &&
                        <button
                            className="bg-black text-white rounded-xl p-2 cursor-pointer hover:scale-102 hover:bg-gray-950 transition-transform"
                            onClick={() => {
                                onFinishEditing();
                                resetForm();
                                setError("");
                            }}>
                            Cancel
                        </button>
                    }
                </div>

            </div>

        </div>
    )
}