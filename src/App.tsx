import React, { useState } from 'react';
import './App.css';

const W = 'white'
const B = 'black'

const KEY_NAMES = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
]

function getFirstKeyPosition(firstKey = 'A') {
  return KEY_NAMES.indexOf(firstKey)
}

function getScalePosition(keyNumber: number, keyboardLength = 88, firstKey = 'A') {
  const firstKeyPosition = getFirstKeyPosition(firstKey)
  const keyPosition = keyNumber + firstKeyPosition
  const keyIndex = (keyPosition - 1) % keyboardLength % KEY_NAMES.length

  return keyIndex
}



// Piano Kata, Part 1
function blackOrWhiteKey(keyNumber: number, keyboardLength = 88, firstKey = 'A') {
  const keyIndex = getScalePosition(keyNumber, keyboardLength, firstKey)
  const correctedKey = keyIndex % 5 % 3 % 2

  return correctedKey ? "black" : "white"
}

// Piano Kata, Part 2
function whichNote(keyNumber: number, keyboardLength = 88, firstKey = 'A') {
  const keyIndex = getScalePosition(keyNumber)
  return KEY_NAMES[keyIndex]
}
function App() {
  const [keyboardLength, setKeyboardLength] = useState(88)
  const [firstKey, setFirstKey] = useState('A')
  return (
    <>
      <div className="note-container">
        {Array(keyboardLength).fill(1).map((_, index) => {
          const noteName = <>{whichNote(index, keyboardLength, firstKey)}<br />{index}</>
          return blackOrWhiteKey(index, keyboardLength, firstKey) === W ?
            <div key={index} className="white-note"><p>{noteName}</p></div> :
            <div key={index} className="white-note black-note"><p>{noteName}</p></div>
        })}

      </div>
      <div>
        <form>
          Keyboard length:
          <input type="number" value={keyboardLength} onChange={(e) => setKeyboardLength(Math.max(Number(e.target.value), 1))} />
          First key:
          <select defaultValue={firstKey} onChange={(e) => {
            setFirstKey(e.target.value)
          }}>
            {KEY_NAMES.filter(k => !k.endsWith('#')).map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
        </form>
      </div>
    </>
  );
}

export default App;
