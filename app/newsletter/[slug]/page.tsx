import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react'
import { newsletters, getDriveEmbedUrl } from '@/data/newsletters'
import { Footer } from '@/components/sections/Footer'

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	return newsletters.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params
	const newsletter = newsletters.find((n) => n.slug === slug)
	if (!newsletter) return {}
	return {
		title: `${newsletter.title} | GDG VIT Pune`,
		description: newsletter.description,
	}
}

export default async function NewsletterSlugPage({ params }: Props) {
	const { slug } = await params
	const newsletter = newsletters.find((n) => n.slug === slug)

	if (!newsletter) notFound()

	const embedUrl = getDriveEmbedUrl(newsletter.driveLink)

	return (
		<main className="min-h-screen bg-black text-white relative overflow-hidden">
			<div className="fixed inset-0 w-full h-full z-0">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
					style={{ backgroundImage: "url('/1.gif')" }}
				/>
				<div className="absolute inset-0 bg-black/40" />
			</div>

			<div className="fixed top-1/4 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />
			<div className="fixed bottom-1/4 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none z-0" />

			<div className="fixed top-6 left-6 z-50">
				<Link
					href="/newsletter"
					className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
				>
					<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					<span className="text-sm font-medium">All Newsletters</span>
				</Link>
			</div>

			<div className="relative z-10 pt-24 pb-0">
				<div className="max-w-5xl mx-auto px-4">
					<div className="mb-8">
						<div
							className={`w-12 h-1 rounded-full bg-gradient-to-r ${newsletter.color} mb-6`}
						/>

						<div className="flex flex-wrap items-start justify-between gap-4 mb-4">
							<div>
								<p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
									{newsletter.edition}
								</p>
								<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
									{newsletter.title}
								</h1>
							</div>
							<span className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
								<Calendar className="w-4 h-4" />
								{newsletter.date}
							</span>
						</div>

						<p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mb-5">
							{newsletter.description}
						</p>

						<div className="flex flex-wrap items-center gap-3">
							<div className="flex flex-wrap gap-2">
								{newsletter.tags.map((tag) => (
									<span
										key={tag}
										className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
									>
										<Tag className="w-2.5 h-2.5" />
										{tag}
									</span>
								))}
							</div>
							<a
								href={newsletter.driveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 ml-auto"
							>
								Open in Drive{' '}
								<ExternalLink className="w-3.5 h-3.5" />
							</a>
						</div>
					</div>

					<div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
						<iframe
							src={embedUrl}
							className="w-full"
							style={{ height: '100vh', minHeight: '600px' }}
							allow="autoplay"
							title={newsletter.title}
						/>
					</div>
				</div>
			</div>

			<Footer isNewsletterPage={true} />
		</main>
	)
}
