import Board from "./components/Board";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Snowfall from "react-snowfall";

function App() {
    return (
        <>
            <Snowfall snowflakeCount={200} />
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
