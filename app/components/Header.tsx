import { UserButton } from "@clerk/nextjs";

export default function Header() {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Expense Tracker</h1>
                <p className="text-xl">Track your spending and manage your budget</p>
            </div>
            <div className="mr-2 p-2">
                <UserButton />
            </div>
        </div>

    )
}