

import React from "react";
import './Sequencer.scss';
import Dice from "../Dice/Dice";

interface SequencerComponentProps {
    onPress?: any;
}

const Sequencer = ({ onPress }: SequencerComponentProps) => {

    // const [bas, setBa] = useState(false);

    return (
        <div className="sequencer">
            <div className="tracks">
                <div className="track">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(v=> (
                        <div key={v} className="step"></div>
                    ))}
                </div>
                <div className="track">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(v => (
                        <div key={v} className="step">
                            <div className="active"></div>
                        </div>
                    ))}
                </div>
                <div className="track">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(v => (
                        <div key={v} className="step"></div>
                    ))}
                </div>
                <div className="track">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(v => (
                        <div key={v} className="step"></div>
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