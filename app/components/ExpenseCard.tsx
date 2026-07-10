interface ExpenseCardProps {
    description: string;
    category: string;
    date: string;
    amount: number;
}

export default function ExpenseCard({description, category, date, amount}: ExpenseCardProps) {
    return (
        <div className="flex justify-between border px-4">
            <div>
                <p>{description}</p>
                <div className="flex gap-4">
                    <p>{category}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p>{amount}</p>
                <button className="border">delete</button>
            </div>
        </div>
    )
}