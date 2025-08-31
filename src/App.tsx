import Board from "./components/Board";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
    return (
        <>
            <Board />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </>
    );
}

export default App;
