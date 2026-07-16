import ExpensePage from "./components/ExpensePage";
import { auth } from "@clerk/nextjs/server";


export default async function App() {

    await auth.protect();

    return (
        <ExpensePage />
    )
}