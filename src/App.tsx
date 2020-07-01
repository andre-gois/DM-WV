import React from 'react';
import './App.css';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Synth } from "tone";

const synth = new Synth().toMaster();

function App() {

  //See annotations in JS for more information
  const setup = (p5: p5Types | any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth -20, p5.windowHeight -20).parent(canvasParentRef);
  };

  const draw = (p5: p5Types | any) => {
    p5.background(10);
  };

  const onPress = () => {
    synth.triggerAttackRelease("A3", "8n");
  }

  return (
    <div className="App">

      <img src="/logo512.png" className="logo" onClick={onPress} alt="wv"/>

      <div className="interface-container">
        <div className="">
          <p>hello</p>
          <button className="btn" onClick={onPress}>play</button>
        </div>
      </div>

      <div className="sketch-container">
        <Sketch setup={setup} draw={draw} />
      </div>

      <footer>andregois.com</footer>
    </div>
  );
}

export default App;
