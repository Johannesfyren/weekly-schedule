//import Snowfall from "react-snowfall";
//import { Fireworks } from "@fireworks-js/react";
import Board from "./components/Board";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
    return (
        <>
            {/* <Snowfall snowflakeCount={200} /> */}
            {/* <Fireworks
                options={{
                    opacity: 0.5,
                    intensity: 20,
                    gravity: 2,
                    flickering: 50,
                    traceSpeed: 1,
                    explosion: 5,
                }}
                style={{
                    top: 100,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                }}
            /> */}
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
