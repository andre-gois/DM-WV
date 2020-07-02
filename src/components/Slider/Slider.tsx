
import React from "react";
import './Slider.scss';

interface SliderComponentProps {
    name: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: any;
}

const Slider = ({name, min, max, step, value, onChange}: SliderComponentProps) => {

    return (
        <div className="slider-container">
            <div className="input-container">
                <input className="range" type="range" value={value} step={step} min={min} max={max} onChange={val => onChange(val.target.value)}/>
            </div>  
            <div className="name">
                {name}
            </div>
        </div>
    )
}

export default Slider;