import React from 'react';
import './App.css';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Synth, FFT, Waveform } from "tone";

const synth = new Synth().toMaster();
const analyser = new Waveform(512);
synth.chain(analyser);

function App() {

  //See annotations in JS for more information
  const setup = (p5: p5Types | any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth -20, p5.windowHeight -20).parent(canvasParentRef);
    p5.stroke(180);
  };

  const draw = (p5: p5Types | any) => {
    p5.background(10);
    let spectrum = analyser.getValue();
      for (let i = 0; i < spectrum.length; i++) {
        p5.point(
          p5.map(i, 0, spectrum.length, 0, p5.windowWidth - 20),
          p5.map(spectrum[i], -1, 1, p5.windowHeight -20 / 2 -12, 0)
        );
      }
  };

  const onPress = () => {
    const octave = Math.round(Math.random() * 5 + 1);
    synth.triggerAttackRelease(`A${octave}`, "8n");
    // console.log(analyser.getValue());
  }

  return (
    <div className="App">

      <img src="/logo512.png" className="logo" alt="wv"/>

      <div className="interface-container">
        <div className="">
          {/* <p>hello</p> */}
          <img src="/play_sm.png" onClick={onPress} className="play" alt="play"/>
          {/* <button className="btn" onClick={onPress}>play</button> */}
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
