'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Google Developer Groups
                        </h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Vishwakarma Institute of Technology, Pune. <br />
                            Empowering students to build the future through technology and community.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Events', 'Projects', 'Team', 'Join Us'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} />
                                <span>gdsc@vit.edu</span>
                            </li>
                            <li className="text-gray-400">
                                666, Upper Indiranagar,<br />
                                Bibwewadi, Pune,<br />
                                Maharashtra 411037
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} GDG VIT Pune. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Designed with ❤️ by GDG Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
