'use client'
import Image from 'next/image'
import React, { useState } from 'react'

// Reusable SpaceLoader Component
interface SpaceLoaderProps {
	onComplete?: () => void
	duration?: number
}

const SpaceLoader = ({ onComplete, duration = 3000 }: SpaceLoaderProps) => {
	const [showVideo, setShowVideo] = useState(false)
	const [fadeOut, setFadeOut] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const progressRef = React.useRef<HTMLDivElement | null>(null)

	const handleMissionStart = () => {
		setShowVideo(true)
	}

	const handleVideoEnd = () => {
		setFadeOut(true)
		if (onComplete) {
			setTimeout(onComplete, 1000) // Wait for fade out animation
		}
	}

	// detect mobile screens
	React.useEffect(() => {
		const check = () =>
			setIsMobile(
				typeof window !== 'undefined' && window.innerWidth <= 768,
			)
		check()
		window.addEventListener('resize', check)
		return () => window.removeEventListener('resize', check)
	}, [])

	// Mobile progress bar behavior
	React.useEffect(() => {
		if (!isMobile) return

		// animate progress bar
		if (progressRef.current) {
			progressRef.current.style.width = '0%'
			// ensure transition applies
			progressRef.current.style.transition = `width ${duration}ms linear`
			requestAnimationFrame(() => {
				if (progressRef.current)
					progressRef.current.style.width = '100%'
			})
		}

		const t = setTimeout(() => {
			setFadeOut(true)
			if (onComplete) setTimeout(onComplete, 300)
		}, duration)

		return () => clearTimeout(t)
	}, [isMobile, duration, onComplete])

	return (
		<div className="fixed inset-0 overflow-hidden bg-black">
			<div
				className={`absolute inset-0 transition-opacity duration-700 ${
					fadeOut ? 'opacity-0' : 'opacity-100'
				}`}
			>
				{/* Mobile: simple progress bar with starry background */}
				{isMobile ? (
					<div className="absolute inset-0 z-0 flex items-center justify-center">
						<Image
							fill
							src="/space.gif"
							alt="Starry background"
							className="w-full h-full object-cover"
							style={{ imageRendering: 'pixelated' }}
							loading="lazy"
						/>

						<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
							<div className="mobile-loader w-11/12 max-w-sm mx-auto text-center">
								<div className="star-row mb-1">
									<Image
										src="/ship.png"
										alt="Loading star"
										className="w-50 h-70 mx-auto rotate-90"
									/>
								</div>

								<div className="progress-track w-full h-3 bg-white/10 rounded-full overflow-hidden">
									<div
										ref={progressRef}
										className="progress-fill h-full bg-gradient-to-r from-yellow-300 to-yellow-500 w-0"
									/>
								</div>

								<div className="mt-3 text-xs text-white/70">
									Loading…
								</div>
							</div>
						</div>

						<div className="absolute inset-0 z-15 pointer-events-none mobile-stars" />
					</div>
				) : (
					// Desktop / tablet: keep existing complex loader
					<>
						{/* Space GIF Background - Shows until video plays */}
						{!showVideo && (
							<div className="absolute inset-0 z-0">
								<Image
									fill
									src="/space.gif"
									alt="Space background"
									className="w-full h-full object-cover"
									style={{ imageRendering: 'pixelated' }}
								/>
							</div>
						)}

						{/* Video Player - Full Screen Behind Everything */}
						{showVideo && (
							<div className="absolute inset-0 z-0">
								<video
									src="/space.mp4"
									autoPlay
									onEnded={handleVideoEnd}
									className="w-full h-full object-cover"
									style={{ imageRendering: 'pixelated' }}
								/>
							</div>
						)}

						{/* Cockpit PNG Overlay - Always visible */}
						<div className="absolute inset-0 z-10 pointer-events-none">
							<Image
								fill
								src="/spaceship.png"
								alt="Cockpit"
								className="w-full h-full object-cover scale-105"
								style={{ imageRendering: 'pixelated' }}
							/>
						</div>

						{/* CRT Scanline Effect */}
						<div className="absolute inset-0 z-15 pointer-events-none scanlines"></div>

						{/* Content Layer */}
						<div className="absolute inset-0 z-20 flex items-center justify-center">
							<div className="relative w-[800px] h-[450px] flex items-center justify-center translate-y-35">
								{!showVideo ? (
									/* Mission Briefing Terminal */
									<div className="w-full h-full flex flex-col items-start justify-center px-40 space-y-4">
										<div className="terminal-text text-[#a9c7a9] text-[8px] leading-relaxed">
											<div className="mb-4">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												INITIALIZING MISSION PROTOCOL...
											</div>
											<div className="mb-4">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												COORDINATES LOCKED
											</div>
											<div className="mb-8">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												DESTINATION: EVENT HORIZON
											</div>

											<div className="mb-6 pl-4 border-l-2 border-[#a9c7a9] text-[8px]">
												<p className="mb-3">
													MISSION BRIEFING:
												</p>
												<p className="mb-3">
													You are about to embark on a
													journey to the most
												</p>
												<p className="mb-3">
													mysterious phenomenon in the
													known universe - a
												</p>
												<p className="mb-3">
													supermassive black hole.
													Beyond the event horizon,
												</p>
												<p className="mb-3">
													the laws of physics as we
													know them cease to exist.
												</p>
												<p className="mb-3">
													Time dilates. Space warps.
													Reality bends.
												</p>
												<p>
													There is no return from this
													voyage.
												</p>
											</div>

											<div className="mb-3 text-[8px]">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												AWAITING CONFIRMATION...
											</div>
										</div>

										{/* Game-style Option */}
										<div className="w-full flex items-center space-x-3 pl-4">
											<span className="terminal-text text-[#a9c7a9] text-sm">
												{'>'}
											</span>
											<button
												onClick={handleMissionStart}
												className="terminal-text text-[#a9c7a9] text-[8px] bg-transparent border-2 border-[#a9c7a9] px-6 py-2 hover:bg-[#a9c7a9] hover:text-black transition-all duration-200 cursor-pointer uppercase tracking-wider"
											>
												[ LET&apos;S GO ]
											</button>
										</div>
									</div>
								) : (
									/* Status Text During Video */
									<div className="w-full h-full flex flex-col items-start justify-center px-40">
										<div className="terminal-text text-[#a9c7a9] text-[8px] leading-relaxed">
											<div className="mb-4">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												MISSION INITIATED...
											</div>
											<div className="mb-4">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												ENTERING WARP DRIVE
											</div>
											<div className="mb-4">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												APPROACHING EVENT HORIZON...
											</div>
											<div className="mb-4 animate-pulse">
												<span className="text-[#a9c7a9]">
													{'>'}
												</span>{' '}
												SYSTEMS NOMINAL
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>

			<style jsx>{`
				@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

				.terminal-text {
					font-family: 'Press Start 2P', monospace;
					text-shadow: 0 0 10px rgba(169, 199, 169, 0.8);
					line-height: 1.8;
				}

				.scanlines {
					background: linear-gradient(
						to bottom,
						transparent 50%,
						rgba(0, 0, 0, 0.3) 50%
					);
					background-size: 100% 4px;
					animation: scanline 8s linear infinite;
				}

				/* Mobile loader visuals */
				.mobile-stars {
					background-image:
						radial-gradient(
							rgba(255, 255, 255, 0.18) 1px,
							transparent 1px
						),
						radial-gradient(
							rgba(255, 255, 255, 0.12) 1px,
							transparent 1px
						);
					background-position:
						0 0,
						40px 60px;
					background-size:
						80px 80px,
						120px 120px;
					opacity: 0.8;
					mix-blend-mode: screen;
				}

				.mobile-loader .star-icon {
					filter: drop-shadow(0 0 6px rgba(255, 223, 0, 0.7));
				}

				.progress-track {
					backdrop-filter: blur(4px);
					box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.6);
				}

				@keyframes scanline {
					0% {
						background-position: 0 0;
					}
					100% {
						background-position: 0 100%;
					}
				}

				@media (min-width: 769px) {
					.mobile-loader {
						display: none;
					}
				}
			`}</style>
		</div>
	)
}

export default SpaceLoader
