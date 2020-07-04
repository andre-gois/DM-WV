

import React from "react";
import './Sequencer.scss';
import Dice from "../Dice/Dice";
import Slider from "../Slider/Slider";

interface SequencerComponentProps {
    activeStep: number;
    tracks: [[number]];
    onPress: any;
    randomizeSequencer: any;
    randomizeSequencerTrack: any;
    tempo: number;
    changeTempo: any;
}

const Sequencer = ({ onPress, activeStep, tracks, randomizeSequencer, randomizeSequencerTrack, tempo, changeTempo }: SequencerComponentProps) => {

    return (
        <div className="seq-tempo">
            <div className="sequencer">
                <div className="tracks">
                    {tracks.map((track, trackIndex) => (
                        <div key={trackIndex} className="track">

                            <div className="step track-random">
                                <a href={void(0)} onClick={() => randomizeSequencerTrack(trackIndex)}>X</a>
                            </div>

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
            <Slider name="" value={tempo} step={1} min={20} max={300} onChange={val => changeTempo(val)} />
        </div>
    )
}

export default Sequencer;