

import React, { useState } from "react";
import './Sequencer.scss';
import Dice from "../Dice/Dice";

interface SequencerComponentProps {
    onPress?: any;
}

const Sequencer = ({ onPress }: SequencerComponentProps) => {

    return (
        <div className="sequencer">
                <div className="tracks">T</div>
                <div className="randomize">
                    <Dice onPress={() => null}/>
                </div>
        </div>
    )
}

export default Sequencer;