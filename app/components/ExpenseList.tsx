import { ExpenseProps } from "../type/ExpenseProps"
import ExpenseCard from "./ExpenseCard"

interface ExpenseListProps {
    expenses: ExpenseProps[];
    onDeleteExpense: (id: number) => void;
    onEditingExpense: (expense: ExpenseProps) => void;
}

export default function ExpenseList({expenses, onDeleteExpense, onEditingExpense}: ExpenseListProps) {

    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-white rounded-xl flex-1">
            <div >
                <h2 className="font-semibold text-lg">Transactions</h2>
                <p className="text-md text-gray-600">Your latest expenses</p>
            </div>
            <div className="flex flex-col gap-6 p-2">
                {expenses.map(expense => (
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