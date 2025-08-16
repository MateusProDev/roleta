import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
const prizes = [
  { option: "R$50 OFF", style: { backgroundColor: "#ffd700", textColor: "#181a2a" } },
  { option: "Frete Grátis", style: { backgroundColor: "#c0392b", textColor: "#fffbe6" } },
  { option: "Brinde Surpresa", style: { backgroundColor: "#232946", textColor: "#ffd700" } },
  { option: "Cupom 10%", style: { backgroundColor: "#181a2a", textColor: "#ffd700" } },
  { option: "R$100 OFF", style: { backgroundColor: "#ffd700", textColor: "#c0392b" } },
  { option: "Nada :(", style: { backgroundColor: "#c0392b", textColor: "#fffbe6" } },
];
export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [spun, setSpun] = useState(false);

  const handleSpinClick = () => {
  if (spun) return;
  const newPrizeNumber = Math.floor(Math.random() * prizes.length);
  setPrizeNumber(newPrizeNumber);
  setMustSpin(true);
  setSpun(true);
  };

  const handleStopSpinning = () => {
  setResult(prizes[prizeNumber]);
  };

  return (
  <div className="roleta-premiada-container">
  <h1 className="roleta-premiada-title">Roleta Premiada</h1>
  <div className="roleta-premiada-wheel">
  <div className="wheel-pointer"></div>
  <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={prizes}
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
  className={`roleta-premiada-spin${spun ? " disabled" : ""}`}
  onClick={handleSpinClick}
  disabled={spun}
  >
  Girar
  </button>
  {result && (
  <div className="roleta-premiada-result" style={{"--prize-color": result.style.backgroundColor}}>
          <div className="prize-name">{result.option}</div>
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
// ...existing code...