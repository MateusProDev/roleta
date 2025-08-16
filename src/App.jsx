import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import { Wheel } from 'react-custom-roulette';

const prizes = [
	{
		option: '10% OFF Mensalidade',
		style: { backgroundColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', textColor: '#fff', boxShadow: '0 0 20px #43e97b' },
		icon: '💸',
		description: 'Desconto de 10% na próxima mensalidade!',
	},
	{
		option: 'Domínio Grátis',
		style: { backgroundColor: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)', textColor: '#fff', boxShadow: '0 0 20px #22d3ee' },
		icon: '🌐',
		description: '1 ano de domínio .com grátis (R$ 120)',
	},
	{
		option: 'Nada',
		style: { backgroundColor: 'linear-gradient(135deg, #6b7280 0%, #111827 100%)', textColor: '#fff', boxShadow: '0 0 30px #6b7280' },
		icon: '❌',
		description: 'Não foi dessa vez. Tente novamente amanhã!',
	},
	{
		option: 'Analytics Pro',
		style: { backgroundColor: 'linear-gradient(135deg, #a21caf 0%, #f472b6 100%)', textColor: '#fff', boxShadow: '0 0 20px #a21caf' },
		icon: '📈',
		description: '6 meses de analytics premium (R$ 180)',
	},
	{
		option: 'Upgrade Pro',
		style: { backgroundColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', textColor: '#fff', boxShadow: '0 0 20px #f59e0b' },
		icon: '🚀',
		description: '3 meses no plano Pro pelo preço do Básico',
	},
	{
		option: 'Template Black',
		style: { backgroundColor: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', textColor: '#fff', boxShadow: '0 0 20px #10b981' },
		icon: '🎨',
		description: 'Template exclusivo "Cyber Edition"',
	},
	{
		option: 'SEO Express',
		style: { backgroundColor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)', textColor: '#fff', boxShadow: '0 0 20px #ec4899' },
		icon: '🛠️',
		description: 'Sessão de 30min com especialista SEO',
	},
	{
		option: 'Tente Novamente',
		style: { backgroundColor: 'linear-gradient(135deg, #facc15 0%, #fde68a 100%)', textColor: '#fff', boxShadow: '0 0 20px #facc15' },
		icon: '🔄',
		description: 'Volte amanhã para outra chance!',
	},
];

const wheelSize = 400;


export default function App() {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(null);
	const [winner, setWinner] = useState(null);

	const handleSpinClick = () => {
		const newPrizeNumber = Math.floor(Math.random() * prizes.length);
		setPrizeNumber(newPrizeNumber);
		setMustSpin(true);
		setWinner(null);
	};

			return (
				<div className="roleta-container">
				{/* Efeito de partículas */}
						<div className="particles-container">
							{[...Array(30)].map((_, i) => (
								<div
									key={i}
									className="particle"
									style={{
										'--delay': `${i * 0.15}s`,
										'--color': prizes[i % prizes.length].style.backgroundColor,
										'--size': `${Math.random() * 10 + 6}px`,
										'--pos-x': `${Math.random() * 100}%`,
										'--pos-y': `${Math.random() * 100}%`,
									}}
								/>
							))}
						</div>

				{/* Título com efeito neon */}
						<h1 className="roleta-title">
							<span className="neon-text">ROLETA</span>
							<span className="neon-subtext">DOS BENEFÍCIOS</span>
						</h1>

				{/* Roleta com react-custom-roulette */}
				<div className="wheel-wrapper">
					<Wheel
						mustStartSpinning={mustSpin}
						prizeNumber={prizeNumber}
						data={prizes.map(p => ({ ...p, style: undefined }))}
						backgroundColors={prizes.map(p => p.style.backgroundColor)}
						textColors={prizes.map(p => p.style.textColor)}
						onStopSpinning={() => {
							setMustSpin(false);
							setWinner(prizes[prizeNumber]);
							if (prizes[prizeNumber].option !== 'Nada' && prizes[prizeNumber].option !== 'Tente Novamente') {
								confetti({
									particleCount: 180,
									spread: 90,
									origin: { y: 0.6 },
									colors: [prizes[prizeNumber].style.backgroundColor],
								});
							}
						}}
						outerBorderColor={['#43e97b']}
						outerBorderWidth={12}
						innerBorderColor={['#fff']}
						innerBorderWidth={4}
						radiusLineColor={['#38f9d7']}
						radiusLineWidth={3}
						fontFamily="Orbitron, sans-serif"
						fontSize={22}
						spinDuration={0.8}
						perpendicularText={true}
						width={wheelSize}
					/>
				</div>

				{/* Botão de ação */}
						<button
							className={`spin-button ${mustSpin ? 'disabled' : ''}`}
							onClick={handleSpinClick}
							disabled={mustSpin}
						>
					{mustSpin ? (
						<span className="spinner"></span>
					) : (
						'GIRAR A ROLETA'
					)}
				</button>

				{/* Resultado */}
						{winner && (
							<div
								className="result-container"
								style={{
									'--prize-color': winner.style.backgroundColor,
									color: winner.style.textColor,
									boxShadow: winner.style.boxShadow,
								}}
							>
								<h3 className="result-title">🎉 VOCÊ GANHOU:</h3>
								<p className="prize-name">
									{winner.icon} {winner.option}
								</p>
								<p className="prize-description">{winner.description}</p>
								{winner.option !== 'Nada' && winner.option !== 'Tente Novamente' && (
									<button className="claim-button">RESGATAR PRÊMIO</button>
								)}
							</div>
						)}

				{/* Rodapé */}
						<p className="disclaimer">
							Giros disponíveis: 1 por dia
							<br />
							Ofertas válidas por tempo limitado
						</p>
			</div>
		);
}