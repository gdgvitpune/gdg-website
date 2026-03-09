'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
	interface Window {
		__gdgCurrentPathname?: string
		__gdgPreviousPathname?: string
	}
}

export default function RouteTracker() {
	const pathname = usePathname()

	useEffect(() => {
		window.__gdgPreviousPathname = window.__gdgCurrentPathname
		window.__gdgCurrentPathname = pathname
	}, [pathname])

	return null
}
