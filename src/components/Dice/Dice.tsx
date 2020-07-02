
import React, { useState} from "react";
import './Dice.scss';

interface DiceComponentProps {
    onPress?: any;
}

const Dice = ({ onPress }: DiceComponentProps) => {

    const [currentNum, setCurrentNum] = useState(1);

    const rollDice = () => {
        const num = Math.floor(Math.random() * 6) + 1;
        if (num !== currentNum) {
            return num;
        } else {
            return (currentNum + 1) % 6;
        }
    }

    const changeFace = () => {
        setCurrentNum(rollDice());
    }

    return (
        <div className="scene" onClick={changeFace}>
            <div className={`cube show-${currentNum}`}>
                <div className="cube__face cube__face--1">f</div>
                <div className="cube__face cube__face--2">b</div>
                <div className="cube__face cube__face--3">r</div>
                <div className="cube__face cube__face--4">l</div>
                <div className="cube__face cube__face--5">t</div>
                <div className="cube__face cube__face--6">b</div>
            </div>
        </div>
    )
}

export default Dice;