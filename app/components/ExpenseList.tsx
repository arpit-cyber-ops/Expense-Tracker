import { useState } from "react";
import { ExpenseProps } from "../type/ExpenseProps"
import ExpenseCard from "./ExpenseCard"

interface ExpenseListProps {
    expenses: ExpenseProps[];
    onDeleteExpense: (id: number) => void;
    onEditingExpense: (expense: ExpenseProps) => void;
    error: string;
    loading: boolean;
}

export default function ExpenseList({ expenses, onDeleteExpense, onEditingExpense, error, loading }: ExpenseListProps) {

    const [filter, setFilter] = useState("");

    const filteredExpense: ExpenseProps[] =
        filter === ""
            ? expenses
            : expenses.filter(expense => expense.category === filter);

    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-white rounded-xl flex-1 w-full">
            <div className="flex justify-between">
                <div>
                    <h2 className="font-semibold text-lg">Transactions</h2>
                    <p className="text-md text-gray-600">Your latest expenses</p>
                </div>
                <div className="p-2">
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full sm:w-40 rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                    >
                        <option value="">All</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Learning">Learning</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div>{error && (
                <p className="text-black border-2 rounded-2xl p-4 bg-red-500">{error}</p>
            )}
            </div>
            <div className="flex flex-col gap-6 p-2">
                {loading ?
                    <p className="text-center text-2xl rounded-2xl bg-slate-200 p-4">Loading...</p> :
                    filteredExpense.length > 0 ?
                    filteredExpense.map(expense => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            onDeleteExpense={onDeleteExpense}
                            onEditingExpense={onEditingExpense}
                        />
                    )) :
                    <p className="text-center text-xl rounded-2xl bg-slate-100 p-6">Add your first expense</p>
                }
            </div>
        </div>
    )
}