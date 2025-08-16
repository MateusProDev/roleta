import { useRef, useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const prizes = [
	{
		text: 'Domínio Grátis',
		icon: '🌐',
		color: '#22d3ee',
		description: '1 ano de domínio .com grátis (R$ 120)',
	},
	{
		text: 'Analytics Pro',
		icon: '📈',
		color: '#a21caf',
		description: '6 meses de analytics premium (R$ 180)',
	},
	{
		text: 'Upgrade Pro',
		icon: '🚀',
		color: '#f59e0b',
		description: '3 meses no plano Pro pelo preço do Básico',
	},
	{
		text: 'Template Black',
		icon: '🎨',
		color: '#10b981',
		description: 'Template exclusivo "Cyber Edition"',
	},
	{
		text: 'SEO Express',
		icon: '🛠️',
		color: '#ec4899',
		description: 'Sessão de 30min com especialista SEO',
	},
	{
		text: 'Tente Novamente',
		icon: '🔄',
		color: '#facc15',
		description: 'Volte amanhã para outra chance!',
	},
];

const wheelSize = 400;
const center = wheelSize / 2;
const radius = 160;

function getPrizeIndex(angle) {
	// 0 degrees is at top, clockwise
	const segAngle = 360 / prizes.length;
	let idx = Math.floor(((angle % 360) / segAngle));
	// Seta está a 90 graus (direita), então soma 1/4 do total
	idx = (prizes.length - idx + Math.floor(prizes.length / 4)) % prizes.length;
	return idx;
}

export default function App() {
	const [spinning, setSpinning] = useState(false);
	const [angle, setAngle] = useState(0);
	const [winner, setWinner] = useState(null);
	const [animId, setAnimId] = useState(null);
	const [spinTarget, setSpinTarget] = useState(null);
	const [spinStart, setSpinStart] = useState(null);

	const spinWheel = () => {
		if (spinning) return;
		setWinner(null);
		setSpinning(true);
		const target = Math.floor(Math.random() * 360);
		setSpinTarget(target);
		setSpinStart(angle);
		animateSpin(angle, target, Date.now());
	};

	function animateSpin(start, target, startTime) {
		const duration = 3000; // ms
		const now = Date.now();
		const elapsed = now - startTime;
		if (elapsed >= duration) {
			setAngle(target);
			setSpinning(false);
			const idx = getPrizeIndex(target);
			setWinner(prizes[idx]);
			if (prizes[idx].text !== '🔄 Tente Novamente') {
				confetti({
					particleCount: 150,
					spread: 70,
					origin: { y: 0.6 },
					colors: [prizes[idx].color],
				});
			}
			return;
		}
		// Ease out
		const progress = elapsed / duration;
		const eased = 1 - Math.pow(1 - progress, 3);
		const current = start + (target + 360 * 5 - start) * eased;
		setAngle(current);
		setAnimId(requestAnimationFrame(() => animateSpin(start, target, startTime)));
	}

	// Limpa animação ao desmontar
	const wheelRef = useRef();
	if (animId && !spinning) {
		cancelAnimationFrame(animId);
		setAnimId(null);
	}

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
							'--color': prizes[i % prizes.length].color,
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

			{/* Roleta SVG */}
			<div className="wheel-wrapper" style={{ position: 'relative' }}>
				{/* Seta fixa ao lado direito */}
				<svg
					width={40}
					height={40}
					style={{ position: 'absolute', top: '50%', left: wheelSize - 20, transform: 'translateY(-50%)', zIndex: 2 }}
				>
					<polygon points="0,20 40,0 40,40" fill="#fff" stroke="#22d3ee" strokeWidth="3" filter="drop-shadow(0 0 8px #22d3ee)" />
				</svg>
				<svg
					ref={wheelRef}
					width={wheelSize}
					height={wheelSize}
					style={{ background: 'radial-gradient(circle at 60% 40%, #1a1a2e 60%, #0f172a 100%)', borderRadius: '50%', boxShadow: '0 0 40px #22d3ee', transform: `rotate(${angle}deg)` }}
				>
					{prizes.map((prize, i) => {
						const segAngle = 360 / prizes.length;
						const startAngle = i * segAngle;
						const endAngle = (i + 1) * segAngle;
						const largeArc = segAngle > 180 ? 1 : 0;
						const x1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
						const y1 = center - radius * Math.cos((Math.PI * startAngle) / 180);
						const x2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
						const y2 = center - radius * Math.cos((Math.PI * endAngle) / 180);
						return (
							<path
								key={i}
								d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`}
								fill={prize.color}
								stroke="#fff"
								strokeWidth="2"
								style={{
									filter: 'drop-shadow(0 0 8px ' + prize.color + ')',
								}}
							/>
						);
					})}
					{/* Ícones e nomes */}
					{prizes.map((prize, i) => {
						const segAngle = 360 / prizes.length;
						const angleDeg = i * segAngle + segAngle / 2;
						const x =
							center + (radius - 40) * Math.sin((Math.PI * angleDeg) / 180);
						const y =
							center - (radius - 40) * Math.cos((Math.PI * angleDeg) / 180);
						return (
							<g key={i}>
								<text
									x={x}
									y={y - 18}
									textAnchor="middle"
									alignmentBaseline="middle"
									fontSize="28"
									fontFamily="Orbitron, sans-serif"
									fill="#fff"
									style={{
										textShadow: '0 0 8px ' + prizes[i].color,
									}}
								>
									{prize.icon}
								</text>
								<text
									x={x}
									y={y + 12}
									textAnchor="middle"
									alignmentBaseline="middle"
									fontFamily="Orbitron, sans-serif"
									fontSize="15"
									fill="#fff"
									fontWeight="bold"
									style={{ textShadow: '0 0 5px #000' }}
								>
									{prize.text}
								</text>
							</g>
						);
					})}
				</svg>
			</div>

			{/* Botão de ação */}
			<button
				className={`spin-button ${spinning ? 'disabled' : ''}`}
				onClick={spinWheel}
				disabled={spinning}
			>
				{spinning ? (
					<span className="spinner"></span>
				) : (
					'GIRAR A ROLETA'
				)}
			</button>

			{/* Resultado */}
			{winner && (
				<div
					className="result-container"
					style={{ '--prize-color': winner.color }}
				>
					<h3>🎉 VOCÊ GANHOU:</h3>
					<p className="prize-name">
						{winner.icon} {winner.text}
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