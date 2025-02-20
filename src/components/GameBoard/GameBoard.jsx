import { useState, useEffect } from "react";
import css from "./GameBoard.module.css";

export default function GameBoard({ list, start }) {
    const [cards, setCards] = useState([]);
    const [countVisible, setCountVisible] = useState(0);

    //const [countClick, setCountClick] = useState(0);

    useEffect(() => {
        const shuffCards = [...list, ...list]
            .map((card) => ({
                ...card,
                id: Math.random() * 1000000,
                isVisible: false,
                isFirst: false,
                isSecond: false,
                isMatch: false,
            }));
        setCards(shuffCards);
    }, [list]);

    const initCards = () => {
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
    }

    useEffect(() => {
        initCards();
        setCountVisible(0);
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
        if (card.isVisible === true) {
            card.isVisible = false;
            setCountVisible(prev => prev - 1);
        }
        else {
            card.isVisible = true;

            if (countVisible === 0) {
                card.isFirst = true;
                setCountVisible(prev => prev + 1);
                console.log(countVisible);
            }
            else if (countVisible === 1) {
                card.isSecond = true;
                setCountVisible(prev => prev + 1);
                console.log(countVisible);
            }
            else {
                cards.forEach(element => {
                    if (element.isFirst === true) {
                        element.isFirst = false;
                        element.isVisible = false;
                    }
                    if (element.isSecond === true) {
                        element.isSecond = false;
                        element.isVisible = false;
                    }
                });
 
                setCountVisible(1);
                card.isFirst = true;
            }
            
        }
          
        const newCards = [...cards];
        setCards(newCards);
    };

    return <ul>{cardList}</ul>;
}
