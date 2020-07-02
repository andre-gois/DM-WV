import React, { useState } from 'react';
import './App.scss';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Waveform, MembraneSynth } from "tone";
import Slider from './components/Slider/Slider';
import Dice from './components/Dice/Dice';

console.log('STARTUP');

const ATTACK = 0.001;
const DECAY = 0.4;
const SUSTAIN = 0.01;
const RELEASE = 1.4;
const PITCH_DECAY = 0.05;

const soundParamsInit = [
  { id: 'attack', min: 0.001, max: 1.0, step: 0.001, name: 'A', value: ATTACK },
  { id: 'decay', min: 0.01, max: 2.0, step: 0.01, name: 'D', value: DECAY },
  // { id: 'sustain', min: 0.0, max: 0.6, step: 0.1, name: 'S', value: SUSTAIN },
  { id: 'release', min: 0.1, max: 4, step: 0.1, name: 'R', value: RELEASE },
  { id: 'pitch_decay', min: 0.0, max: 0.5, step: 0.01, name: '\\', value: PITCH_DECAY },
  // { id: 'duration', min: 1, max: 16, step: 1, name: '>', value: DURATION }
];

const membraneOptions = {
  pitchDecay: PITCH_DECAY,
  octaves: 10,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: ATTACK,
    decay: DECAY,
    sustain: SUSTAIN,
    release: RELEASE,
    decayCurve: 'exponential',
    attackCurve: 'exponential'
  }
}

const synth = new MembraneSynth(membraneOptions).toMaster();
const analyser = new Waveform(512);
synth.chain(analyser);

const convertSoundParamsToSynthOptions = (param, val) => {
  switch (param.id) {
    case 'attack':
      synth.envelope.attack = val;
      break;
    case 'decay':
      synth.envelope.decay = val;
      break;
    // case 'sustain':
    //   synth.envelope.sustain = val;
    //   break;
    case 'release':
      synth.envelope.release = val;
      break;
    case 'pitch_decay':
      synth.pitchDecay = val;
      break;
  }
};

function App() {

  const [soundParams, setSoundParams] = useState(soundParamsInit);

  //See annotations in JS for more information
  const setup = (p5: p5Types | any, canvasParentRef: Element) => {
    console.log('setup:')
    p5.createCanvas(p5.windowWidth -20, p5.windowHeight -20).parent(canvasParentRef);
    p5.stroke(100);
    p5.frameRate(50);
  };

  const draw = (p5: p5Types | any) => {
    p5.background(10, 10, 10, 180);
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
    console.log('onPress:');
    const octave = Math.round(Math.random() * 3 + 1);
    synth.triggerAttackRelease(`A${octave}`, `4n`);
  }

  const changeSoundParam = (index, val) => {
    console.log('changeSoundParam:', index, val)
    setSoundParams(prev => {
      prev[index].value = val;
      convertSoundParamsToSynthOptions(prev[index], val);
      return [...prev]
    });
  }

  const radomizeAllSoundParams = () => {
    console.log('radomizeAllSoundParams:');
    soundParams.forEach((param, i) => {
      const val = Math.random() * (param.max - param.min) + param.min;
      changeSoundParam(i, val);
    });
    
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
            {soundParams.map((param, index) => (
              <Slider key={param.id} name={param.name} value={param.value} step={param.step} min={param.min} max={param.max} onChange={val => changeSoundParam(index, val)}/>
            ))}
          </div>
          <div className="bottom-global-action">
            <div className="line"></div>
            <Dice onPress={() => radomizeAllSoundParams()}/>
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
