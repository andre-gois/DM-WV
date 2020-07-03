

import React from "react";
import './Sequencer.scss';
import Dice from "../Dice/Dice";

interface SequencerComponentProps {
    activeStep: number;
    tracks?: [];
    onPress?: any;
}

const Sequencer = ({ onPress, activeStep, tracks }: SequencerComponentProps) => {

    // const [bas, setBa] = useState(false);

    return (
        <div className="sequencer">
            <div className="tracks">
                <div className="track">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v, i) => (
                        <div key={v} className={`step ${i === activeStep ? 'active' : ''}`}></div>
                    ))}
                </div>
                <div className="track">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v, i) => (
                        <div key={v} className={`step ${i === activeStep ? 'active' : ''}`}>
                            <div className="active"></div>
                        </div>
                    ))}
                </div>
                <div className="track">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v, i) => (
                        <div key={v} className={`step ${i === activeStep ? 'active' : ''}`}></div>
                    ))}
                </div>
                <div className="track">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v, i) => (
                        <div key={v} className={`step ${i === activeStep ? 'active' : ''}`}></div>
                    ))}
                </div>
            </div>
            <div className="randomize">
                <Dice onPress={() => null}/>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default Sequencer;