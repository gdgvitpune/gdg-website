export type Newsletter = {
	id: number
	slug: string
	title: string
	description: string
	date: string
	edition: string
	driveLink: string
	tags: string[]
	color: string
}

export const newsletters: Newsletter[] = [
	{
		id: 1,
		slug: 'edition-1',
		title: 'The First Edition',
		description:
			'This issue is packed with fresh insights, community highlights, and interactive sections designed to keep you inspired and up to date with the latest in tech.',
		date: 'FEB 2026',
		edition: 'Edition 1',
		driveLink:
			'https://drive.google.com/file/d/1aMEpwQf3AdtBkrQ5gPSNT15XRBiXou_Y/view?usp=sharing',
		tags: ['Community', 'Recap'],
		color: 'from-blue-500 to-cyan-400',
	},
	{
		id: 2,
		slug: 'edition-2',
		title: 'The Open Source Issue',
		description:
			'From the tools developers rely on every day to the communities that build them, open source is where collaboration meets real-world impact.',
		date: 'MAR 2026',
		edition: 'Edition 2',
		driveLink:
			'https://drive.google.com/file/d/1SJOe_ayQlvD39VqT5O-y4cpWW3L6uCwV/view?usp=sharing',
		tags: ['Open Source', 'GenAI', 'Career'],
		color: 'from-red-500 to-orange-400',
	},
	{
		id: 3,
		slug: 'edition-3',
		title: 'The Startup Edition',
		description:
			'The ideas, the grit, and the stories that prove big things often start small - from student founders who built something meaningful right out of college, to legendary ventures that reshaped entire industries.',
		date: 'APR 2026',
		edition: 'Edition 3',
		driveLink:
			'https://drive.google.com/file/d/1GNBaSs6nFNqo6e5OfBIPE7tkvrcjucM0/view?usp=sharing',
		tags: ['Startups', 'Entrepreneurship'],
		color: 'from-green-500 to-slate-500',
	},
]

export function getDriveEmbedUrl(driveLink: string): string {
	const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/)
	if (!match) return driveLink
	return `https://drive.google.com/file/d/${match[1]}/preview`
}
