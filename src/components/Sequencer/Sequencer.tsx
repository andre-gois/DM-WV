

import React from "react";
import './Sequencer.scss';
import Dice from "../Dice/Dice";

interface SequencerComponentProps {
    activeStep: number;
    tracks: [[number]];
    onPress: any;
    randomizeSequencer: any;
}

const Sequencer = ({ onPress, activeStep, tracks, randomizeSequencer }: SequencerComponentProps) => {

    // const [bas, setBa] = useState(false);

    return (
        <div className="sequencer">
            <div className="tracks">
                {tracks.map((track, trackIndex) => (
                    <div key={trackIndex} className="track">
                        {track.map((step, stepIndex) => (
                            <div key={stepIndex} className={`step clickable ${stepIndex === activeStep ? 'active' : ''}`} onClick={() => onPress(trackIndex, stepIndex)}>
                                {step === 1 ? <div className="active"/> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="randomize">
                <Dice onPress={() => randomizeSequencer()}/>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default Sequencer;