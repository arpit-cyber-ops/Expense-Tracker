import ExpenseCard from "./ExpenseCard";

export default function ExpenseList() {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-xl flex-1">
            <div >
                <h2 className="font-semibold text-lg">Transactions</h2>
                <p className="text-md text-gray-600">Your latest expenses</p>
            </div>
            <div>
                <ExpenseCard
                    description="Grocery Shopping"
                    category="Food"
                    date="Today"
                    amount={250}
                />
            </div>
        </div>
    )
}