export default function ExpenseForm() {
    return (
        <div className="border border-gray-300 rounded-xl flex flex-col gap-4 p-4 w-1/3">

            <div className="flex flex-col">
                <h2 className="font-semibold text-lg">Add Expense</h2>
                <p className="text-md text-gray-600">Record a new transaction</p>
            </div>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" placeholder="$ 0.00" className="rounded-md bg-gray-200 px-2 py-1.5" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" placeholder="Select Category" className="rounded-md bg-gray-200 px-2 py-1.5" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" placeholder="What did you spend on?" className="rounded-md bg-gray-200 px-2 py-1.5" />
                </div>

                <div className="flex flex-col">
                    <button className="text-white font-semibold bg-black rounded-xl p-2.5 mt-1">+ Add Expense</button>
                </div>
                
            </div>

        </div>
    )
}