import React from 'react';
import './App.scss';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Waveform, MembraneSynth } from "tone";
import Slider from './components/Slider/Slider';
import Dice from './components/Dice/Dice';

// const synth = new Synth().toMaster();
const membraneOptions = {
  pitchDecay: 0.01,
  octaves: 10,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.1,
    release: 1.4,
    attackCurve: 'exponential'
  }
}

const synth = new MembraneSynth(membraneOptions).toMaster();
const analyser = new Waveform(512);
synth.chain(analyser);

const soundParams = [
  {id: 'attack', min: 1, max: 10, step: 1, name: 'A', icon: '', value: 2},
  {id: 'decay', min: 1, max: 10, step: 1, name: 'D', icon: '', value: 1},
  {id: 'sustain', min: 1, max: 10, step: 1, name: 'S', icon: '', value: 4},
  {id: 'release', min: 1, max: 10, step: 1, name: 'R', icon: '', value: 2},
  {id: 'pitch_decay', min: 1, max: 10, step: 1, name: '\\', icon: '', value: 1},
  { id: 'duration', min: 1, max: 10, step: 1, name: '>', icon: '', value: 1}
]

function App() {

  //See annotations in JS for more information
  const setup = (p5: p5Types | any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth -20, p5.windowHeight -20).parent(canvasParentRef);
    p5.stroke(100);
  };

  const draw = (p5: p5Types | any) => {
    p5.background(10);
    let spectrum = analyser.getValue();
    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      p5.vertex(
        p5.map(i, 0, spectrum.length, 0, p5.windowWidth - 20),
        p5.map(spectrum[i], -1, 1, p5.windowHeight -20 / 2 -12, 0)
      );
    }
    p5.endShape();
  };

  const onPress = () => {
    const octave = Math.round(Math.random() * 3 + 1);
    synth.triggerAttackRelease(`A${octave}`, "4n");
    // console.log(analyser.getValue());
  }

  return (
    <div className="App">

      <img src="/logo512.png" className="logo" alt="wv"/>

      <div className="interface-container">
        <div className="sequencer">
          sequencer
        </div>
        <div className="center-area">
          <img src="/play_sm.png" onClick={onPress} className="play" alt="play"/>
        </div>
        <div className="controls">
          <div className="params">
            {soundParams.map(param => (
              <Slider key={param.id} name={param.name} value={param.value} step={param.step} min={param.min} max={param.max}/>
            ))}
          </div>
          <div className="bottom-global-action">
            <div className="line"></div>
            <Dice onPress={() => null}/>
          </div>

        </div>
      </div>

      <div className="sketch-container">
        <Sketch setup={setup} draw={draw} />
      </div>

      <footer>v1.0</footer>
    </div>
  );
}

export default App;
