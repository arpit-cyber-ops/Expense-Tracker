import { ExpenseProps } from "../type/ExpenseProps"
interface ExpenseSummaryProps {
    expenses: ExpenseProps[];
};

export default function SummaryCard({ expenses }: ExpenseSummaryProps) {

    let total : number = 0;
    for (const expense of expenses) {
        total += expense.amount;
    };

    return (
        <div className="border text-white flex min-h-25 bg-purple-600 rounded-2xl">
        <div className=" flex flex-col flex-1 gap-4 p-4 items-center border border-r-white">
            <p className="text-xl text-white/90">Total Expenses</p>
            <p className="text-4xl">{`$ ${total}`}</p>
        </div>
        <div className="flex-1 flex flex-col border border-l-white items-center gap-4 p-4">
            <p className="text-xl text-white/90">Total Transactions</p>
            <p className="text-3xl">{(expenses.length) <= 9 ? `0${expenses.length}` : expenses.length}</p>
        </div>  
        </div>
    )
}