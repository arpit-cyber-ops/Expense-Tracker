import { useState } from "react";
import { ExpenseProps } from "../type/ExpenseProps"
import ExpenseCard from "./ExpenseCard"

interface ExpenseListProps {
    expenses: ExpenseProps[];
    onDeleteExpense: (id: number) => void;
    onEditingExpense: (expense: ExpenseProps) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense, onEditingExpense }: ExpenseListProps) {

    const [filter, setFilter] = useState("");

    const filteredExpense: ExpenseProps[] =
        filter === ""
            ? expenses
            : expenses.filter(expense => expense.category === filter);

    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-white rounded-xl flex-1">
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
                        className="rounded-md bg-gray-100 px-2 py-1.5 hover:scale-102 transition-transform"
                    >
                        <option value="">All</option>
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Learning">Learning</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-6 p-2">
                {filteredExpense.map(expense => (
                    <ExpenseCard
                        key={expense.id}
                        id={expense.id}
                        description={expense.description}
                        category={expense.category}
                        createdAt={expense.createdAt}
                        amount={expense.amount}
                        onDeleteExpense={onDeleteExpense}
                        onEditingExpense={onEditingExpense}
                    />
                ))}
            </div>
        </div>
    )
}