'use client'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react'

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer
			id="contact"
			className="relative overflow-hidden bg-black pt-20 shadow-[0px_-17px_20px_2px_#00000024]"
		>
			{/* Background image layer */}
			<img
				src="/gdg.png"
				alt=""
				className="
    hidden lg:block
    pointer-events-none
    select-none
    absolute
    inset-0
    mx-auto
    my-auto
    w-[40rem]
    max-w-none
    opacity-10
    blur-[1px]
    z-0
  "
			/>

			{/* Main footer content */}
			<div className="px-10 container mx-auto sm:px-4 sm:px-6 lg:px-8 rounded-[3rem] glass p-10 shadow-xl">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-11 gap-8 md:gap-12 mb-12 ">
					{/* Brand and mission */}
					<div className="md:col-span-1 lg:col-span-5">
						<div className="flex items-center space-x-2 mb-6">
							<img
								src="/gdg.png"
								alt="GDGoC Logo"
								className="h-8"
							/>
						</div>
						<p className="text-white mb-6 ">
							GDGoC VIT Pune is a student-led community passionate
							about building, learning, and growing with Google
							technologies. Empowering developers, one idea at a
							time.
						</p>
						<div className="flex space-x-5">
							<a
								href="https://www.instagram.com/gdg.vitpune/"
								className="text-white hover:text-red-500 transition-colors"
							>
								<Instagram className="size-8" />
							</a>
							<a
								href="https://x.com/gdscvitpune"
								className="text-white hover:text-red-500 transition-colors"
							>
								<Twitter className="size-8" />
							</a>
							<a
								href="https://github.com/gdgvitpune"
								className="text-white hover:text-red-500 transition-colors"
							>
								<Github className="size-8" />
							</a>
							<a
								href="https://www.linkedin.com/company/gdgvitpune"
								className="text-white hover:text-red-500 transition-colors"
								target="_blank"
							>
								<Linkedin className="size-8" />
							</a>
						</div>
					</div>

					{/* Navigation columns */}

					<div className="lg:ml-auto md:col-span-1 lg:col-span-2">
						<h3 className="text-white font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#mission"
									className="text-white hover:text-red-500 text-md transition-colors"
								>
									Our Mission
								</a>
							</li>
							<li>
								<a
									href="#events"
									className="text-white hover:text-red-500 text-md transition-colors"
								>
									Events
								</a>
							</li>
							<li>
								<a
									href="#achievements"
									className="text-white hover:text-red-500 text-md transition-colors"
								>
									Achievements
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="text-white hover:text-red-500 text-md transition-colors"
								>
									Projects
								</a>
							</li>
							<li>
								<a
									href="#team"
									className="text-white hover:text-red-500 text-md transition-colors"
								>
									Team
								</a>
							</li>
						</ul>
					</div>

					<div className="lg:ml-auto md:col-span-1 lg:col-span-3">
						<h3 className="text-white font-semibold mb-6">
							Contact Us
						</h3>
						<div className="space-y-4">
							{/* <div className="flex items-start">
                <MapPin className="w-5 h-5 text-white dark:text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Address</h4>
                  <p className="text-gray-600 dark:text-white text-sm">
                    123 Innovation Boulevard, Tech District, CA 94103
                  </p>
                </div>
              </div> */}
							<div className="flex items-start">
								<Mail className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
								<div>
									<h4 className="font-medium text-white">
										Email
									</h4>
									<p className="text-white text-md">
										gdg@vit.edu
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<Phone className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
								<div>
									<h4 className="font-medium text-white">
										Phone
									</h4>
									<p className="text-white text-md">
										+91 70212 22457
									</p>
									<p className="text-white text-md">
										+91 99603 28138
									</p>
									<p className="text-white text-md">
										+91 88798 64245
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">For Organizers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-white hover:text-white dark:hover:text-red-500 text-sm transition-colors">Host a Challenge</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white hover:text-white dark:hover:text-red-500 text-sm transition-colors">Organizer Tools</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white hover:text-white dark:hover:text-red-500 text-sm transition-colors">Talent Recruitment</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white hover:text-white dark:hover:text-red-500 text-sm transition-colors">Enterprise Solutions</a></li>
            </ul>
          </div> */}
				</div>

				{/* Footer bottom */}
				<div className="border-t border-neutral-700 pt-6 mt-2 flex flex-col justify-between items-center">
					<p className="text-md">
						&copy; {currentYear} GDGoC VIT Pune. All rights
						reserved.
					</p>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				<div className="w-full overflow-hidden pointer-events-none h-65 mask-b-from-30% z-[2]">
					<img
						className="h-[16rem] lg:hidden relative -bottom-[0.1rem] opacity-20 select-none mx-auto"
						src="/gdg.png"
						alt="GDG Logo"
					/>
					<p className="relative -bottom-[0.1rem] text-white text-[16rem] text-center font-extrabold opacity-[22%] select-none hidden lg:block">
						GDGoC VIT
					</p>
				</div>
			</motion.div>
		</footer>
	)
}
