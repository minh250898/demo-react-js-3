import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  function generateNewDice() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice;
  }
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDice()
    }))
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    }))
  }
  const diceElements = dice.map((x) => <Die key={x.id} value={x.value} isHeld={x.isHeld} holdDice={() => holdDice(x.id)} />)
  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
