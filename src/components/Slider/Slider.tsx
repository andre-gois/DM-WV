
import React from "react";
import './Slider.css';

interface SliderComponentProps {
    name: string;
    min: number;
    max: number;
    step: number;
    value: number;
}

const Slider = ({name, min, max, step, value}: SliderComponentProps) => {

    return (
        <div className="slider">
            <div className="range-slider">
                <input className="range" type="range" value={value} step={step} min={min} max={max} />
            </div>  
            <div className="name">
                {name}
            </div>
        </div>
    )
}

export default Slider;