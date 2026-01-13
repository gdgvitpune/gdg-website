type Event = {
	id: number
	title: string
	subtitle: string
	date: string
	description: string
	color: string
	image: string
	experience: string
	participants: string
	location: string
	status: 'DONE' | 'UPCOMING'
}

export const events: Event[] = [
	{
		id: 1,
		title: 'Hack-O-Verse',
		subtitle: 'OPEN INNOVATION HACKATHON',
		date: 'OCT 12, 2024',
		description:
			'A flagship open-innovation hackathon where students identify real-world problems and build impactful solutions using Google technologies.',
		color: 'from-red-500 to-orange-500',
		image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
		experience: '48 HRS',
		participants: '1000+',
		location: 'Seminar Hall',
		status: 'DONE',
	},
	{
		id: 2,
		title: 'Create-a-Thon',
		subtitle: 'CREATIVE TECH COMPETITION',
		date: 'NOV 24, 2024',
		description:
			'A creative tech competition combining design, storytelling, and technology, encouraging participants to build innovative projects within a fixed theme.',
		color: 'from-orange-400 to-yellow-500',
		image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
		experience: '2 DAYS',
		participants: '1000+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 3,
		title: 'devX Speaker Series',
		subtitle: 'multi-day speaker series',
		date: 'DEC 15, 2024',
		description:
			'A multi-day speaker series featuring industry professionals covering AIML, Web3, and data analytics, including sessions on machine learning, blockchain fundamentals, and a Tableau workshop conducted in collaboration with the Tableau Ambassador Program.',
		color: 'from-purple-500 to-pink-500',
		image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
		experience: '6 HRS',
		participants: '300+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 4,
		title: 'Web Blitz',
		subtitle: 'Hands-on web development workshop',
		date: 'JAN 20, 2025',
		description:
			'A hands-on web development workshop focused on HTML, CSS, JavaScript, React basics, and modern web practices to kickstart students’ web development journey.',
		color: 'from-blue-500 to-cyan-500',
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
		experience: '3 DAYS',
		participants: '700+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 5,
		title: 'Flutter Forge',
		subtitle: 'Flutter workshop',
		date: 'FEB 10, 2025',
		description:
			'An immersive Flutter workshop introducing cross-platform app development, UI building, Firebase integration, and real-world app development concepts.',
		color: 'from-green-500 to-emerald-500',
		image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
		experience: '1 DAY',
		participants: '400+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
]
