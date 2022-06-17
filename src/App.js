import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])
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
      {tenzies && <Confetti />}
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
    </main>
  );
}

export default App;
