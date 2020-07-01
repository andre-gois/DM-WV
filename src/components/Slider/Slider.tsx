
import React from "react";
import './Slider.scss';

interface SliderComponentProps {
    name: string;
    min: number;
    max: number;
    step: number;
    value: number;
}

const Slider = ({name, min, max, step, value}: SliderComponentProps) => {

    return (
        <div className="slider-container">
            <div className="input-container">
                <input className="range" type="range"  step={step} min={min} max={max} />
            </div>  
            <div className="name">
                {name}
            </div>
        </div>
    )
}

export default Slider;