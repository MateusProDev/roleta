import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Wheel } from "react-custom-roulette";
import './App.css';

const prizes = [
  { option: "R$50 OFF", icon: "💸", style: { backgroundColor: "#ffd700", textColor: "#181a2a" } },
  { option: "Frete Grátis", icon: "🚚", style: { backgroundColor: "#c0392b", textColor: "#fffbe6" } },
  { option: "Brinde Surpresa", icon: "🎁", style: { backgroundColor: "#232946", textColor: "#ffd700" } },
  { option: "Cupom 10%", icon: "🎫", style: { backgroundColor: "#181a2a", textColor: "#ffd700" } },
  { option: "R$100 OFF", icon: "🤑", style: { backgroundColor: "#ffd700", textColor: "#c0392b" } },
  { option: "Nada :(", icon: "🙁", style: { backgroundColor: "#c0392b", textColor: "#fffbe6" } },
];

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef();

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * prizes.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setResult(null);
    setIsSpinning(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setResult(prizes[prizeNumber]);
    setIsSpinning(false);
    if (prizes[prizeNumber].option !== "Nada :(") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffd700", "#c0392b", "#fffbe6"]
      });
    }
  };

  return (
    <div className="roleta-premiada-container">
      <h1 className="roleta-premiada-title">Roleta Premiada</h1>
      <div className={`roleta-premiada-wheel${isSpinning ? " spinning" : ""}`} ref={wheelRef}>
        <div className="wheel-pointer" aria-label="Indicador" />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={prizes.map(p => ({ ...p, option: `${p.icon} ${p.option}` }))}
          backgroundColors={["#ffd700", "#c0392b", "#232946", "#181a2a"]}
          textColors={["#181a2a", "#ffd700", "#fffbe6", "#c0392b"]}
          onStopSpinning={handleStopSpinning}
          outerBorderColor="#ffd700"
          outerBorderWidth={8}
          radiusLineColor="#c0392b"
          radiusLineWidth={2}
          fontFamily="Orbitron, Roboto, sans-serif"
        />
      </div>
      <button
        className={`roleta-premiada-spin${isSpinning ? " disabled" : ""}`}
        onClick={handleSpinClick}
        disabled={isSpinning}
        aria-label="Girar roleta"
      >
        {isSpinning ? "Girando..." : "Girar"}
      </button>
      {result && (
        <div className="roleta-premiada-result" style={{"--prize-color": result.style.backgroundColor}}>
          <div className="prize-name">{result.icon} {result.option}</div>
          <div className="prize-description">
            {result.option === "Nada :("
              ? "Tente novamente amanhã!"
              : "Parabéns! Você ganhou."}
          </div>
          {result.option !== "Nada :(" && (
            <button className="claim-button">Resgatar Prêmio</button>
          )}
        </div>
      )}
      <footer className="roleta-premiada-footer">1 giro por dia • Ofertas exclusivas</footer>
    </div>
  );
}