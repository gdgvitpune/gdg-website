import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import { Partytown } from '@qwik.dev/partytown/react'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		default: 'Google Developer Groups - VIT Pune',
		template: '%s | GDG VIT Pune',
	},
	description:
		'Official website of Google Developer Groups (GDG) VIT Pune — events, projects, and community.',
	keywords: [
		'GDG VIT Pune',
		'Google Developer Groups VIT Pune',
		'GDG',
		'Google Developer Groups',
		'VIT Pune',
		'Google developer community',
		'Kabir Khanuja',
		'Kabir Khanuja GDG', // shameless self promo
		'Kabir Khanuja VIT Pune', // shameless self promo
		'Aditya Bhattacharya VIT GDG',
		'Aditya Bhattacharya', // baap baap hota hai
	],
	authors: [
		{ name: 'GDG VIT Pune' },
		{ name: 'Aditya Bhattacharya' },
		{ name: 'Smrutikant Parida' },
		{ name: 'Vedant Chandore' },
		{ name: 'Rachit Ingole' },
		{ name: 'Kabir Khanuja' },
	],
	creator: 'GDG VIT Pune',
	publisher: 'GDG VIT Pune',
	category: 'Technology',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-snippet': -1,
			'max-image-preview': 'large',
			'max-video-preview': -1,
		},
	},
	openGraph: {
		title: 'Google Developer Groups - VIT Pune',
		description:
			'Official website of Google Developer Groups (GDG) VIT Pune — events, projects, and community.',
		type: 'website',
		siteName: 'GDG VIT Pune',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Google Developer Groups - VIT Pune',
		description:
			'Official website of Google Developer Groups (GDG) VIT Pune — events, projects, and community.',
	},
	alternates: {
		canonical: 'https://gdgvitpune.com',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
	const siteUrl = rawSiteUrl?.startsWith('http') ? rawSiteUrl : undefined

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Google Developer Groups - VIT Pune',
		alternateName: 'GDG VIT Pune',
		url: siteUrl,
	}

	const kabirJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Kabir Khanuja',
		jobTitle: 'Co-Head of Cloud',
		url: siteUrl,
		sameAs: [
			'https://linkedin.com/in/kabirkhanuja',
			'https://github.com/KabirKhanuja',
			'https://www.instagram.com/kabirkhanuja/',
		],
		worksFor: {
			'@type': 'Organization',
			name: 'Google Developer Groups - VIT Pune',
		},
	}

	const adityaJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Aditya Bhattacharya',
		jobTitle: 'Co-Lead',
		url: siteUrl,
		sameAs: [
			'https://www.linkedin.com/in/aditya-bhattacharya-software-developer/',
			'https://github.com/AdityaBhattacharya1',
			'https://www.instagram.com/_aditya.bhattacharya_/',
		],
		worksFor: {
			'@type': 'Organization',
			name: 'Google Developer Groups - VIT Pune',
		},
	}

	return (
		<html lang="en">
			<head>
				<Partytown debug={false} forward={['dataLayer.push']} />

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationJsonLd),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(kabirJsonLd),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(adityaJsonLd),
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
			<script
				src="https://beamanalytics.b-cdn.net/beam.min.js"
				data-token="906f8a55-d563-41ba-87fe-ad8cedd43f5f"
				async
				type="text/partytown"
			></script>
		</html>
	)
}
