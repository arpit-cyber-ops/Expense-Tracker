export default function ExpenseList() {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-xl flex-1">
            <div >
                <h2 className="font-semibold text-lg">Transactions</h2>
                <p className="text-md text-gray-600">Your latest expenses</p>
            </div>
            <div>
                <div className="flex justify-between border px-4">
                    <div>
                        <p>Description</p>
                        <div className="flex gap-4">
                            <p>Category</p>
                            <p>Date</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p>$...</p>
                        <button className="border">delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}