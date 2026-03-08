'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { NewsletterForm } from '@/components/NewsletterForm'
import { Footer } from '@/components/sections/Footer'
import AndroidMascot from '@/components/AndroidMascot'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react'
import { newsletters } from '@/data/newsletters'

const MotionLink = motion(Link)

export default function NewsletterPage() {
	const [isButtonHovered, setIsButtonHovered] = useState(false)
	const [mascotEmotion, _setMascotEmotion] = useState<
		'neutral' | 'happy' | 'success' | 'sad'
	>('neutral')

	return (
		<main className="min-h-screen bg-black text-white relative overflow-hidden">
			<div className="fixed inset-0 w-full h-full z-0">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
					style={{
						backgroundImage: "url('/1.gif')",
					}}
				/>
				<div className="absolute inset-0 bg-black/20" />
			</div>

			<div className="fixed top-6 left-6 z-50">
				<Link
					href="/"
					className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
				>
					<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					<span className="text-sm font-medium">Back to Home</span>
				</Link>
			</div>

			<div className="relative z-10 pt-24">
				<div className="flex flex-col">
					<section className="relative py-20 px-4">
						<div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
						<div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

						<div className="relative max-w-5xl mx-auto">
							<motion.div
								className="text-center mb-14"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
							>
								<div className="flex items-center justify-center gap-2 mb-4">
									<BookOpen className="w-5 h-5 text-blue-400/70" />
									<span className="text-sm font-semibold text-blue-400/70 uppercase tracking-widest">
										Past Editions
									</span>
								</div>
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
									<span className="text-blue-400/80">
										Our{' '}
									</span>
									<span className="text-red-400/80">
										Newsletter{' '}
									</span>
									<span className="text-white">Archive</span>
								</h1>
								<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
									Browse through every edition of the GDG VIT
									Pune newsletter — event recaps, community
									spotlights, and tech deep-dives.
								</p>
							</motion.div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{newsletters.map((newsletter, index) => (
									<MotionLink
										key={newsletter.id}
										href={`/newsletter/${newsletter.slug}`}
										className="group relative flex flex-col gap-4 rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
										initial={{ opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: index * 0.08,
										}}
										whileHover={{ scale: 1.015 }}
									>
										<div className="flex items-start justify-between gap-4">
											<div
												className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${newsletter.color} flex items-center justify-center shadow-lg`}
											>
												<BookOpen className="w-5 h-5 text-white" />
											</div>
											<div className="flex flex-col items-end text-right gap-1 flex-shrink-0">
												<span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
													{newsletter.edition}
												</span>
												<span className="flex items-center gap-1 text-xs text-gray-500">
													<Calendar className="w-3 h-3" />
													{newsletter.date}
												</span>
											</div>
										</div>

										<div>
											<h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
												{newsletter.title}
											</h3>
											<p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
												{newsletter.description}
											</p>
										</div>

										<div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-white/5">
											<div className="flex flex-wrap gap-1.5">
												{newsletter.tags
													.slice(0, 3)
													.map((tag) => (
														<span
															key={tag}
															className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-gray-400"
														>
															<Tag className="w-2.5 h-2.5" />
															{tag}
														</span>
													))}
											</div>
											<span className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:gap-2 transition-all duration-200 whitespace-nowrap">
												Read Now{' '}
												<ArrowRight className="w-3.5 h-3.5" />
											</span>
										</div>
									</MotionLink>
								))}
							</div>
						</div>
					</section>

					<div className="max-w-5xl mx-auto w-full px-4">
						<div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
					</div>

					<section className="relative min-h-screen flex items-center justify-center py-20">
						<div className="relative container mx-auto px-4">
							<NewsletterForm
								onHoverChange={setIsButtonHovered}
							/>
						</div>
						<div className="absolute bottom-0 right-0 w-full pointer-events-none">
							<AndroidMascot
								isHappy={isButtonHovered}
								emotion={mascotEmotion}
							/>
						</div>
					</section>
				</div>
			</div>
			<Footer isNewsletterPage={true} />
		</main>
	)
}
