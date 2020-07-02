
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
        onPress();
    }

    return (
        <div className="scene" onClick={changeFace}>
            <div className={`cube show-${currentNum}`}>
                {[1,2,3,4,5,6].map(v => (
                    <div key={v} className={`cube__face cube__face--${v}`}>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dice;