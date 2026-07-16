import { ExpenseProps } from "../type/ExpenseProps";

interface ExpenseCardProps {
    expense: ExpenseProps;
    onDeleteExpense: (id: number) => void;
    onEditingExpense: (expense: ExpenseProps) => void;
}

export default function ExpenseCard({ expense, onDeleteExpense, onEditingExpense }: ExpenseCardProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border border-gray-300 rounded-lg p-4 hover:scale-101 transition-transform duration-200">
            <div>
                <p className="text-lg wrap-break-words">{expense.description}</p>
                <div className="flex flex-wrap gap-2 text-gray-600">
                    <p>{expense.category}</p>
                    <p>
                        | {new Date(expense.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between sm:justify-normal gap-6">
                <p>${expense.amount}</p>
                <button
                    onClick={() => onEditingExpense(expense)}
                    className="cursor-pointer hover:scale-125 transition-transform">
                    ✏️
                </button>
                <button
                    className="cursor-pointer hover:scale-125 transition-transform"
                    onClick={() => onDeleteExpense(expense.id)}>
                    🗑️
                </button>
            </div>
        </div>
    )
}