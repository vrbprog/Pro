import { useState, useEffect } from "react";
import css from "./GameBoard.module.css";

export default function GameBoard({ list, start }) {
    const [cards, setCards] = useState([]);
    const [countClick, setCountClick] = useState(0);

    useEffect(() => {
        const shuffCards = [...list, ...list]
            .map((card) => ({
                ...card,
                id: Math.random() * 1000000,
                isVisible: false,
            }));
        setCards(shuffCards);
    }, []);

    useEffect(() => {
        if (start === 1) {
            setCards(
                cards
                    .sort(() => Math.random() - 0.5)
                    .map((card) => ({
                    ...card,
                    isVisible: true,
                }))
            );
            console.log('Drow')
        } 
        else if (start === 2) {
            setCards(
                cards.map((card) => ({
                    ...card,
                    isVisible: false,
                }))
            );
            console.log('Hide')
        } 
    }, [start]);

    const Drow = () => {
        return cards.map((card) => {
            return (
                <li key={card.id} onClick={() => handlerCard(card)}>
                    <img
                        className={card.isVisible ? css.noRotated : css.rotated}
                        src={card.imgUrl}
                        alt={card.label}
                        width={72}
                    />
                </li>
            );
        });
    };

    const cardList = Drow();

    const handlerCard = (card) => {
        if (card.isVisible) card.isVisible = false;
        else card.isVisible = true;
        setCountClick((prev) => prev + 1);
    };

    return <ul>{cardList}</ul>;
}
