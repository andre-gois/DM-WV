import React, { useState } from 'react';
import './App.scss';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Waveform, MembraneSynth, Freeverb } from "tone";
import Slider from './components/Slider/Slider';
import Dice from './components/Dice/Dice';
import Sequencer from './components/Sequencer/Sequencer';

console.log('STARTUP');

const TEMPO = 120;
const ATTACK = 0.001;
const DECAY = 0.4;
const SUSTAIN = 0.01;
const RELEASE = 1.4;
const PITCH_DECAY = 0.05;
const REVERB_DAMPENING = 40;
const REVERB_WET = 0.3;

const soundParamsInit = [
  { id: 'tempo', min: 20, max: 220, step: 1, name: 'T', value: TEMPO },
  { id: 'attack', min: 0.001, max: 1.0, step: 0.001, name: 'A', value: ATTACK },
  { id: 'decay', min: 0.01, max: 2.0, step: 0.01, name: 'D', value: DECAY },
  { id: 'release', min: 0.1, max: 4, step: 0.1, name: 'R', value: RELEASE },
  { id: 'pitch_decay', min: 0.0, max: 0.5, step: 0.01, name: '\\', value: PITCH_DECAY },
  { id: 'reverb_dampening', min: 20, max: 150, step: 10, name: 'V', value: REVERB_DAMPENING },
  { id: 'reverb_wet', min: 0, max: 1, step: 0.1, name: 'W', value: REVERB_WET },
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

const freeverb = new Freeverb().toMaster();
freeverb.dampening.value = REVERB_DAMPENING;
freeverb.roomSize.value = 0.9;
freeverb.wet.value = REVERB_WET;

synth.connect(freeverb);
synth.chain(analyser);
synth.volume.value = -10;


const convertSoundParamsToSynthOptions = (param, val) => {
  switch (param.id) {
    case 'attack':
      synth.envelope.attack = val;
      break;
    case 'decay':
      synth.envelope.decay = val;
      break;
    case 'release':
      synth.envelope.release = val;
      break;
    case 'reverb_dampening':
      freeverb.dampening.value = val;
      break;
    case 'reverb_wet':
      freeverb.wet.value = val;
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
          <Sequencer />
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
