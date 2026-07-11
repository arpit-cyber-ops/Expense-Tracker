import { ExpenseProps } from "../type/ExpenseProps";

interface ExpenseCardProps {
    id: number
    description: string;
    category: string;
    createdAt: string;
    amount: number;
    onDeleteExpense: (id: number) => void;
    onEditingExpense: (expense: ExpenseProps) => void;
}

export default function ExpenseCard({ id, description, category, createdAt, amount, onDeleteExpense, onEditingExpense }: ExpenseCardProps) {
    return (
        <div className="flex justify-between border border-gray-300 rounded-lg p-4 ">
            <div>
                <p className="text-lg">{description}</p>
                <div className="flex gap-4">
                    <p className="text-gray-600">{category}</p>
                    <p className="text-gray-600">
                        | {new Date(createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <p>${amount}</p>
                <button
                    onClick={() => onEditingExpense({
                        id: id,
                        description: description,
                        category: category,
                        amount: amount,
                        createdAt: createdAt,
                    })}
                    className="cursor-pointer hover:scale-125 transition-transform">
                    ✏️
                </button>
                <button
                    className="cursor-pointer hover:scale-125 transition-transform"
                    onClick={() => onDeleteExpense(id)}>
                    🗑️
                </button>
            </div>
        </div>
    )
}