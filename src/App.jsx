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
			<div className="roleta-container" style={{
				background: 'radial-gradient(circle at 60% 40%, #232946 60%, #121629 100%)',
				minHeight: '100vh',
				padding: '0',
				boxShadow: '0 0 80px #43e97b inset',
			}}>
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
								filter: 'blur(1px)',
							}}
						/>
					))}
				</div>

				{/* Título com efeito neon */}
				<h1 className="roleta-title" style={{
					fontSize: '3rem',
					textAlign: 'center',
					marginTop: '2rem',
					color: '#fff',
					textShadow: '0 0 20px #43e97b, 0 0 40px #232946',
					letterSpacing: '2px',
				}}>
					<span className="neon-text">ROLETA</span>
					<span className="neon-subtext" style={{
						display: 'block',
						fontSize: '1.2rem',
						color: '#38f9d7',
						textShadow: '0 0 10px #38f9d7',
					}}>DOS BENEFÍCIOS</span>
				</h1>

				{/* Roleta com react-custom-roulette */}
				<div className="wheel-wrapper" style={{
					position: 'relative',
					margin: '2rem auto',
					width: wheelSize,
					maxWidth: '100vw',
					boxShadow: '0 8px 40px #38f9d7, 0 0 80px #43e97b inset',
					borderRadius: '50%',
					background: 'linear-gradient(145deg, #232946 60%, #38f9d7 100%)',
					padding: '2rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
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
					{/* Seta 3D */}
					<div style={{
						position: 'absolute',
						top: '50%',
						left: '100%',
						transform: 'translate(-50%, -50%)',
						zIndex: 2,
					}}>
						<svg width="60" height="60" style={{ filter: 'drop-shadow(0 0 12px #43e97b)' }}>
							<polygon points="0,30 60,0 60,60" fill="#fff" stroke="#43e97b" strokeWidth="6" />
							<polygon points="10,30 50,10 50,50" fill="#38f9d7" opacity="0.5" />
						</svg>
					</div>
				</div>

				{/* Botão de ação */}
				<button
					className={`spin-button ${mustSpin ? 'disabled' : ''}`}
					onClick={handleSpinClick}
					disabled={mustSpin}
					style={{
						margin: '2rem auto',
						display: 'block',
						fontSize: '1.3rem',
						padding: '1rem 2.5rem',
						borderRadius: '40px',
						background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
						color: '#fff',
						fontWeight: 'bold',
						boxShadow: '0 0 20px #43e97b',
						border: 'none',
						cursor: mustSpin ? 'not-allowed' : 'pointer',
						transition: 'background 0.3s',
					}}
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
							background: winner.style.backgroundColor,
							color: winner.style.textColor,
							boxShadow: winner.style.boxShadow,
							borderRadius: '24px',
							padding: '2rem',
							margin: '2rem auto',
							maxWidth: '400px',
							textAlign: 'center',
							fontSize: '1.2rem',
						}}
					>
						<h3 style={{ fontSize: '2rem', marginBottom: '1rem', textShadow: '0 0 10px #fff' }}>🎉 VOCÊ GANHOU:</h3>
						<p className="prize-name" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
							{winner.icon} {winner.option}
						</p>
						<p className="prize-description" style={{ marginBottom: '1rem' }}>{winner.description}</p>
						{winner.option !== 'Nada' && winner.option !== 'Tente Novamente' && (
							<button className="claim-button" style={{
								background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
								color: '#fff',
								border: 'none',
								borderRadius: '30px',
								padding: '0.7rem 2rem',
								fontWeight: 'bold',
								fontSize: '1.1rem',
								boxShadow: '0 0 10px #43e97b',
								cursor: 'pointer',
								marginTop: '1rem',
							}}>RESGATAR PRÊMIO</button>
						)}
					</div>
				)}

				{/* Rodapé */}
				<p className="disclaimer" style={{
					color: '#fff',
					textAlign: 'center',
					marginTop: '2rem',
					opacity: 0.7,
					fontSize: '1rem',
					textShadow: '0 0 8px #232946',
				}}>
					Giros disponíveis: 1 por dia
					<br />
					Ofertas válidas por tempo limitado
				</p>
			</div>
		);
}