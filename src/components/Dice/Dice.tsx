
import React, { useState} from "react";
import './Dice.scss';

interface DiceComponentProps {
    onPress?: any;
    small?: boolean;
}

const rollDice = (currentNum?) => {
    const num = Math.floor(Math.random() * 6) + 1;
    if (num !== currentNum) {
        return num;
    } else {
        return (currentNum + 1) % 6;
    }
}

const Dice = ({ onPress, small = false }: DiceComponentProps) => {

    const [currentNum, setCurrentNum] = useState(rollDice());

    const changeFace = () => {
        console.log('changeFace:');
        setCurrentNum(prev => rollDice(prev));
        onPress();
    }

    return (
        <div className={`scene ${small ? 'small': ''}`} onClick={changeFace}>
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