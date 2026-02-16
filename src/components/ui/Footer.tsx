export default function Footer() {
    return (
        <footer className="relative z-20 py-12 border-t border-white/5 bg-[#121212] text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-8 tracking-tighter">Let&apos;s work together.</h2>
                <a
                    href="mailto:yanakandlaharshavardhan@gmail.com"
                    className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 mb-12"
                >
                    Get in touch
                </a>

                <div className="flex gap-8 text-white/40 text-sm">
                    <span>© 2026 Harsha Vardhan Yanakandla</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
