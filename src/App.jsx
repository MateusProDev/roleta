import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import { Wheel } from 'react-custom-roulette';

const prizes = [
	{
		option: 'Domínio Grátis',
		style: { backgroundColor: '#22d3ee', textColor: '#fff' },
		icon: '🌐',
		description: '1 ano de domínio .com grátis (R$ 120)',
	},
	{
		option: 'Analytics Pro',
		style: { backgroundColor: '#a21caf', textColor: '#fff' },
		icon: '📈',
		description: '6 meses de analytics premium (R$ 180)',
	}, 
	{
		option: 'Upgrade Pro',
		style: { backgroundColor: '#f59e0b', textColor: '#fff' },
		icon: '🚀',
		description: '3 meses no plano Pro pelo preço do Básico',
	},
	{
		option: 'Template Black',
		style: { backgroundColor: '#10b981', textColor: '#fff' },
		icon: '🎨',
		description: 'Template exclusivo "Cyber Edition"',
	},
	{
		option: 'SEO Express',
		style: { backgroundColor: '#ec4899', textColor: '#fff' },
		icon: '🛠️',
		description: 'Sessão de 30min com especialista SEO',
	},
	{
		option: 'Tente Novamente',
		style: { backgroundColor: '#facc15', textColor: '#fff' },
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
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="particle"
						style={{
							'--delay': `${i * 0.2}s`,
							'--color': prizes[i % prizes.length].style.backgroundColor,
							'--size': `${Math.random() * 6 + 4}px`,
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
			<div className="wheel-wrapper" style={{ position: 'relative' }}>
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeNumber}
					data={prizes}
					backgroundColors={prizes.map(p => p.style.backgroundColor)}
					textColors={prizes.map(p => p.style.textColor)}
					onStopSpinning={() => {
						setMustSpin(false);
						setWinner(prizes[prizeNumber]);
						if (prizes[prizeNumber].option !== 'Tente Novamente') {
							confetti({
								particleCount: 150,
								spread: 70,
								origin: { y: 0.6 },
								colors: [prizes[prizeNumber].style.backgroundColor],
							});
						}
					}}
					outerBorderColor={['#22d3ee']}
					outerBorderWidth={8}
					innerBorderColor={['#fff']}
					innerBorderWidth={2}
					radiusLineColor={['#fff']}
					radiusLineWidth={2}
					fontFamily="Orbitron, sans-serif"
					fontSize={18}
					spinDuration={0.6}
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
					style={{ '--prize-color': winner.style.backgroundColor }}
				>
					<h3>🎉 VOCÊ GANHOU:</h3>
					<p className="prize-name">
						{winner.icon} {winner.option}
					</p>
					<p className="prize-description">{winner.description}</p>
					<button className="claim-button">RESGATAR PRÊMIO</button>
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