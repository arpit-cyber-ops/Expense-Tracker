import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Header from "./components/Header"
import SummaryCard from "./components/SummaryCard"

export default function App() {
    return (
        <div className="flex flex-col items-center gap-4 w-full min-h-screen bg-white text-black">
            <div className="max-w-5xl w-full px-6 mx-auto flex flex-col gap-6 p-6 m-4">

                <div className="flex flex-col gap-6">

                    <Header />

                    <SummaryCard />

                </div>

                <div className="flex gap-8">

                    <ExpenseForm />

                    <ExpenseList />

                </div>
            </div>
        </div>
    )
}