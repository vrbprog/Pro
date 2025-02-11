import { useState } from "react";
import GameBoard from "../GameBoard/GameBoard";
import frameworks from "./../../assets/frameworks.json";

export default function Game() {
    const [startFlag, setStartFlag] = useState(0);

    const handlerStart = () => {
        setStartFlag(1);

        setTimeout(() => {
            setStartFlag(2);
        }, 1000);
    };

    return (
        <div className="container">
            <button onClick={handlerStart}>Start</button>
            <GameBoard list={frameworks} start={startFlag} />
            <h1>Score: 0</h1>
        </div>
    );
}
