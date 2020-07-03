import React, { useState, useEffect } from 'react';
import './App.scss';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Waveform, MembraneSynth, Freeverb, Loop, Transport, Distortion } from "tone";
import Slider from './components/Slider/Slider';
import Dice from './components/Dice/Dice';
import Sequencer from './components/Sequencer/Sequencer';

// console.log('STARTUP');

const TEMPO = 166;
const ATTACK = 0.001;
const DECAY = 0.4;
const SUSTAIN = 0.01;
const RELEASE = 1.4;
const PITCH_DECAY = 0.05;
const REVERB_DAMPENING = 40;
const REVERB_WET = 0.9;
const DISTORTION = 0.4;

const soundParamsInit = [
  { id: 'attack', min: 0.001, max: 0.07, step: 0.001, name: 'A', value: ATTACK },
  { id: 'decay', min: 0.01, max: 1.0, step: 0.01, name: 'D', value: DECAY },
  { id: 'pitch_decay', min: 0.0, max: 0.5, step: 0.01, name: '\\', value: PITCH_DECAY },
  { id: 'reverb_dampening', min: 20, max: 150, step: 10, name: 'V', value: REVERB_DAMPENING },
  { id: 'reverb_wet', min: 0, max: 1, step: 0.1, name: 'W', value: REVERB_WET },
  { id: 'distortion', min: 0.0, max: 1, step: 0.05, name: 'X', value: DISTORTION },
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

const voice1 = new MembraneSynth(membraneOptions).toMaster();
const voice2 = new MembraneSynth(membraneOptions).toMaster();
const voice3 = new MembraneSynth(membraneOptions).toMaster();
const voice4 = new MembraneSynth(membraneOptions).toMaster();
const analyser = new Waveform(512);

Transport.bpm.value = TEMPO;

const distortion = new Distortion(DISTORTION).toMaster();

const freeverb = new Freeverb().toMaster();
freeverb.dampening.value = REVERB_DAMPENING;
freeverb.roomSize.value = 0.9;
freeverb.wet.value = REVERB_WET;

voice1.connect(distortion);
voice2.connect(distortion);
voice3.connect(distortion);
voice4.connect(distortion);
voice1.connect(freeverb);
voice2.connect(freeverb);
voice3.connect(freeverb);
voice4.connect(freeverb);
voice1.chain(analyser);
voice2.chain(analyser);
voice3.chain(analyser);
voice4.chain(analyser);
voice1.volume.value = -10;
voice2.volume.value = -10;
voice3.volume.value = -10;
voice4.volume.value = -10;

const tracksPreset = [
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
];


const convertSoundParamsToSynthOptions = (param, val) => {
  switch (param.id) {
    case 'attack':
      voice1.envelope.attack = val;
      voice2.envelope.attack = val;
      voice3.envelope.attack = val;
      voice4.envelope.attack = val;
      break;
    case 'decay':
      voice1.envelope.decay = val;
      voice2.envelope.decay = val;
      voice3.envelope.decay = val;
      voice4.envelope.decay = val;
      break;
    case 'distortion':
      distortion.distortion = val;
      break;
    case 'reverb_dampening':
      freeverb.dampening.value = val;
      break;
    case 'reverb_wet':
      freeverb.wet.value = val;
      break;
    case 'pitch_decay':
      voice1.pitchDecay = val;
      voice2.pitchDecay = val;
      voice3.pitchDecay = val;
      voice4.pitchDecay = val;
      break;
  }
};

function randomWithProbability() {
  var notRandomNumbers = [0, 0, 0, 0, 1];
  var idx = Math.floor(Math.random() * notRandomNumbers.length);
  return notRandomNumbers[idx];
}

let stepTone = 0;
let tracksTone= [...tracksPreset];

function App() {

  const [soundParams, setSoundParams] = useState(soundParamsInit);
  const [loop, setLoop] = useState();
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(TEMPO);
  const [tracks, setTracks] = useState(tracksPreset);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    setLoop(new Loop(songSequence, '8n'));
  }, []);

  useEffect(() => {
    stepTone = (activeStep +1) % 16;
    tracksTone = [...tracks];
  }, [activeStep, tracks]);

  const songSequence = (time) => {
    if (tracksTone[0][stepTone]) {
      voice1.triggerAttackRelease(`C1`, `4n`, time);
    }
    if (tracksTone[1][stepTone]) {
      voice2.triggerAttackRelease(`Eb2`, `4n`, time);
    }
    if (tracksTone[2][stepTone]) {
      voice3.triggerAttackRelease(`G2`, `4n`, time);
    }
    if (tracksTone[3][stepTone]) {
      voice4.triggerAttackRelease(`C3`, `4n`, time);
    }
    setActiveStep(prev => (prev + 1) % 16);
  }

  const setup = (p5: p5Types | any, canvasParentRef: Element) => {
    p5.pixelDensity(1);
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

  const windowResized = (p5: p5Types | any) => {
    p5.resizeCanvas(p5.windowWidth - 20, p5.windowHeight - 20);
  }

  const onPress = () => {
    Transport.start();
    if (loop.state === 'started') {
      loop.stop();
      setPlaying(false);
    } else {
      setActiveStep(-1);
      setPlaying(true);
      loop.start(0);
    }
  }

  const changeSoundParam = (index, val) => {
    setSoundParams(prev => {
      prev[index].value = val;
      convertSoundParamsToSynthOptions(prev[index], val);
      return [...prev]
    });
  }

  const radomizeAllSoundParams = () => {
    soundParams.forEach((param, i) => {
      const val = Math.random() * (param.max - param.min) + param.min;
      changeSoundParam(i, val);
    });
  }

  const randomizeSequencer = () => {
    const newState = [...tracks];
    setTracks(newState.map(track => track.map(step => randomWithProbability())))
  }

  const changeStep = (trackIndex, stepIndex) => {
    const newState = [...tracks];
    newState[trackIndex][stepIndex] = Math.abs(newState[trackIndex][stepIndex] - 1);
    setTracks(newState);
  }

  const changeTempo = (tempo) => {
    Transport.bpm.value = tempo;
    setTempo(tempo);
  }


  return (
    <div className="App">

      <img src="/logo512.png" className="logo" alt="wv"/>

      <div className="interface-container">
        <div className="sequencer-container">
          <Sequencer changeTempo={val => changeTempo(val)} tempo={tempo} activeStep={activeStep} tracks={tracks} onPress={(trackIndex, stepIndex) => changeStep(trackIndex, stepIndex)} randomizeSequencer={randomizeSequencer}/>
        </div>
        <div className="center-area">
          <img src={playing ? '/stop_sm.png' : '/play_sm.png'} onClick={onPress} className="play" alt="play"/>
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

      <footer>DM\WV v1.0</footer>
    </div>
  );
}

export default App;
