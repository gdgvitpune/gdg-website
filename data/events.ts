type Event = {
	id: number
	title: string
	subtitle: string
	date: string
	description: string
	color: string
	image: string
	experience: string | null // null if not applicable or duration does not make sense
	participants: string
	location: string
	status: 'DONE' | 'UPCOMING'
}

export const events: Event[] = [
	{
		id: 1,
		title: 'Hack-O-Verse',
		subtitle: 'OPEN INNOVATION HACKATHON',
		date: 'JAN 19, 2026',
		description:
			'A flagship open-innovation hackathon where students identify real-world problems and build impactful solutions using Google technologies.',
		color: 'from-red-500 to-orange-500',
		image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
		experience: null,
		participants: '1000+',
		location: 'Seminar Hall',
		status: 'DONE',
	},
	{
		id: 2,
		title: 'Google Cloud StudyJams',
		subtitle: 'Google Cloud learning series',
		date: 'OCT, 2025',
		description:
			'A month long series of workshops and hands-on labs focused on Google Cloud technologies, covering topics such as cloud fundamentals, data engineering, and machine learning on Google Cloud Platform.',
		color: 'from-red-500 to-orange-500',
		image: 'https://res.cloudinary.com/da62knsgf/image/upload/v1768413293/IMG_8180_d5doh8.jpg',
		experience: null,
		participants: '100+',
		location: 'Online',
		status: 'DONE',
	},
	{
		id: 3,
		title: 'Create-a-Thon',
		subtitle: 'CREATIVE TECH COMPETITION',
		date: 'APR 12, 2025',
		description:
			'A creative tech competition combining design, storytelling, and technology, encouraging participants to build innovative projects within a fixed theme.',
		color: 'from-orange-400 to-yellow-500',
		image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
		experience: '7 DAYS',
		participants: '1000+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 4,
		title: 'devX Speaker Series',
		subtitle: 'multi-day speaker series',
		date: 'MAR 27-28, 2025',
		description:
			'A multi-day speaker series featuring industry professionals covering AIML, Web3, and data analytics, including sessions on machine learning, blockchain fundamentals, and a Tableau workshop conducted in collaboration with the Tableau Ambassador Program.',
		color: 'from-purple-500 to-pink-500',
		image: 'https://res.cloudinary.com/da62knsgf/image/upload/v1768413469/_DSC8867_vg06rd.jpg',
		experience: '2 DAYS',
		participants: '300+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 5,
		title: 'Web Blitz',
		subtitle: 'Hands-on web development workshop',
		date: 'APR 12-14, 2024',
		description:
			'A hands-on web development workshop focused on HTML, CSS, JavaScript, React basics, and modern web practices to kickstart students’ web development journey.',
		color: 'from-blue-500 to-cyan-500',
		image: 'https://res.cloudinary.com/da62knsgf/image/upload/v1768413930/456229527_1012838817053932_2658903234004751981_n_oqauhz.jpg',
		experience: '3 DAYS',
		participants: '700+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
	{
		id: 6,
		title: 'Flutter Forge',
		subtitle: 'Flutter workshop',
		date: 'MAR 16, 2024',
		description:
			'An immersive Flutter workshop introducing cross-platform app development, UI building, Firebase integration, and real-world app development concepts.',
		color: 'from-green-500 to-emerald-500',
		image: 'https://res.cloudinary.com/da62knsgf/image/upload/v1768413886/456415876_370263439288574_2792809665262326446_n_ryib6v.jpg',
		experience: '1 DAY',
		participants: '400+',
		location: '1325-1328 Bibwewadi Campus',
		status: 'DONE',
	},
]
