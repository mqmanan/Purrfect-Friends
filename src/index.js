import { Purrfect } from "./components/Purrfect"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Purrfect />
    </BrowserRouter>
)

