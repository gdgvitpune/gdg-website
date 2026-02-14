// Google brand colors palette
export const GOOGLE_COLORS = [
	'#4285F4', // Blue
	'#DB4437', // Red
	'#F9AB00', // Yellow/Orange
	'#0F9D58', // Green
]

/**
 * Generates a randomized sequence of colors ensuring no adjacent colors are the same
 * @param count - Number of colors needed
 * @returns Array of color hex codes
 */
export function generateRandomColorSequence(count: number): string[] {
	if (count === 0) return []
	if (count === 1) return [GOOGLE_COLORS[Math.floor(Math.random() * GOOGLE_COLORS.length)]]

	const result: string[] = []
	const availableColors = [...GOOGLE_COLORS]

	// Pick first color randomly
	const firstIndex = Math.floor(Math.random() * availableColors.length)
	result.push(availableColors[firstIndex])

	// For each subsequent color, ensure it's different from the previous one
	for (let i = 1; i < count; i++) {
		const lastColor = result[i - 1]
		const eligibleColors = GOOGLE_COLORS.filter((color) => color !== lastColor)

		// Pick random color from eligible ones
		const randomIndex = Math.floor(Math.random() * eligibleColors.length)
		result.push(eligibleColors[randomIndex])
	}

	return result
}

/**
 * Helper to create a glow effect for a color
 */
export function createColorGlow(color: string, opacity: string = '66'): string {
	return `0 0 30px ${color}${opacity}`
}
