import { AppleStyleDock } from '@/components/apple-dock';
import Navbar from '@/components/navbar';
import { AnimatedLayerButton } from '@/components/ui/animated-layer-button';
import ServicesShowcase from '@/components/services-showcase';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar with Animated Text */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm font-semibold text-cyan-600 tracking-widest mb-4">
            INNOVATE • SOLVE • ELEVATE
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Building Tomorrow's Digital Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Expert software and website development tailored to your business needs
          </p>
          <AnimatedLayerButton className="mx-auto">
            Get Started
          </AnimatedLayerButton>
        </div>
      </section>

      {/* Services Section */}
      <ServicesShowcase />

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            About ADVAITA
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a leading software solutions company specializing in building
            cutting-edge software applications and websites. Our team of expert
            developers and designers work together to transform your ideas into
            powerful digital solutions.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
            Portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-900 to-cyan-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Project {i}
                  </h3>
                  <p className="text-gray-600">
                    Innovative solution delivered for our client
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Get In Touch
          </h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
            />
            <div className="text-center">
              <button
                type="submit"
                className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 text-center">
        <p>&copy; 2026 ADVAITA. All rights reserved.</p>
      </footer>

      {/* Apple Style Dock */}
      <AppleStyleDock />
    </main>
  );
}
