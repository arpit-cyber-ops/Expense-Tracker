import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Header from "./components/Header"
import SummaryCard from "./components/SummaryCard"

export default function App() {
    return (
        <div className="flex flex-col items-center gap-4 w-full min-h-screen bg-white text-black">
            <div className="w-4/6">

                <div className="flex flex-col gap-8 m-4 p-4">

                    <Header />

                    <SummaryCard />

                </div>

                <div className="flex mx-4 px-4 gap-8">

                    <ExpenseForm />

                    <ExpenseList />

                </div>
            </div>
        </div>
    )
}