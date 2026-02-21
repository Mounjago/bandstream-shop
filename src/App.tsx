/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Search, Menu, Heart, Share2, MoreHorizontal, ShoppingBag, User, Disc } from 'lucide-react';
import { motion } from 'motion/react';

// --- Components ---

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized 'B' / Heart shape based on the PDF logo */}
    <path 
      d="M20 20 H50 C75 20 90 35 90 55 C90 75 75 90 50 90 H20 C10 90 0 80 0 70 V40 C0 30 10 20 20 20Z" 
      fill="#0ED894" 
    />
    <path 
      d="M20 20 V55 H50 C65 55 75 45 75 37.5 C75 30 65 20 50 20 H20Z" 
      fill="#0ED894" 
    />
    {/* Inner Play Button */}
    <path d="M45 45 L65 55 L45 65 V45Z" fill="black" />
  </svg>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  icon: Icon
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  icon?: React.ElementType;
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display font-bold transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-band-green text-band-black hover:bg-white hover:scale-105",
    secondary: "bg-band-cream text-band-black hover:bg-white",
    outline: "border-2 border-band-green text-band-green hover:bg-band-green hover:text-band-black",
    ghost: "text-band-cream hover:text-band-green"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

const AlbumCard = ({ title, artist, price, image, tags }: { title: string, artist: string, price: string, image: string, tags: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group relative bg-band-gray-dark rounded-2xl overflow-hidden cursor-pointer"
  >
    <div className="aspect-square overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <button className="w-12 h-12 bg-band-green rounded-full flex items-center justify-center text-band-black transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
          <Play fill="currentColor" size={20} className="ml-1" />
        </button>
        <button className="w-10 h-10 bg-band-cream rounded-full flex items-center justify-center text-band-black transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
          <Heart size={18} />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display font-bold text-lg text-white leading-tight mb-1 truncate">{title}</h3>
      <p className="text-band-gray-medium text-sm font-medium mb-3">{artist}</p>
      <div className="flex items-center justify-between">
        <span className="text-band-green font-bold font-display">{price}</span>
        <div className="flex gap-2">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-band-gray-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const DecorativeCurve = () => (
  <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none overflow-hidden z-0 hidden md:block">
    <svg viewBox="0 0 400 800" className="h-full w-full" preserveAspectRatio="none">
      <path 
        d="M400 0 H200 C100 200 100 300 200 400 C300 500 300 600 200 800 H400 V0Z" 
        fill="#EBF5DF" 
        opacity="0.05"
      />
      <path 
        d="M400 100 H300 C200 300 200 400 300 500 C400 600 400 700 300 900 H400 V100Z" 
        fill="#0ED894" 
        opacity="0.1"
      />
    </svg>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');

  const albums = [
    { title: "Neon Nights", artist: "Cyber Collective", price: "€12", image: "https://picsum.photos/seed/neon/400/400", tags: ["Synth", "Retro"] },
    { title: "Organic Matter", artist: "Forest Sounds", price: "€10", image: "https://picsum.photos/seed/forest/400/400", tags: ["Ambient", "Folk"] },
    { title: "Heavy Metal Heart", artist: "Iron Pulse", price: "€15", image: "https://picsum.photos/seed/metal/400/400", tags: ["Metal", "Rock"] },
    { title: "Deep Space", artist: "Lunar Module", price: "€8", image: "https://picsum.photos/seed/space/400/400", tags: ["Electronic", "Lo-Fi"] },
    { title: "Urban Flow", artist: "City Beats", price: "€12", image: "https://picsum.photos/seed/city/400/400", tags: ["Hip Hop", "Jazz"] },
    { title: "Waves", artist: "Ocean Blue", price: "€10", image: "https://picsum.photos/seed/ocean/400/400", tags: ["Indie", "Pop"] },
    { title: "Midnight Drive", artist: "Nightcrawler", price: "€14", image: "https://picsum.photos/seed/night/400/400", tags: ["Synthwave"] },
    { title: "Abstract Thoughts", artist: "Mind Over Matter", price: "€9", image: "https://picsum.photos/seed/abstract/400/400", tags: ["Experimental"] },
  ];

  return (
    <div className="min-h-screen bg-band-black text-band-cream font-body selection:bg-band-green selection:text-band-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-band-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <Logo className="w-10 h-10" />
            <span className="font-display font-bold text-2xl tracking-tight">band<span className="text-band-green">stream</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search for artists, tracks, tags..." 
                className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 w-64 focus:w-80 focus:border-band-green focus:outline-none transition-all duration-300 text-sm placeholder-white/30"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            </div>
            <a href="#" className="text-sm font-medium hover:text-band-green transition-colors">Discover</a>
            <a href="#" className="text-sm font-medium hover:text-band-green transition-colors">Sell Music</a>
            <a href="#" className="text-sm font-medium hover:text-band-green transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-band-green transition-colors">
              Log in
            </button>
            <Button variant="primary" className="!px-5 !py-2 text-sm">Sign up</Button>
            <button className="md:hidden text-white">
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 H50 C75 20 90 35 90 55 C90 75 75 90 50 90 H20 C10 90 0 80 0 70 V40 C0 30 10 20 20 20Z' fill='%230ED894' /%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
        <DecorativeCurve />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-bold text-6xl md:text-8xl leading-[0.9] mb-8 text-white">
                No fluff,<br />
                <span className="text-band-green">just results.</span>
              </h1>
              <p className="text-xl md:text-2xl text-band-cream/80 max-w-xl mb-10 font-light leading-relaxed">
                The fairest platform for artists and fans. Directly support the music you love, without the algorithmic noise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" icon={Play}>Start Listening</Button>
                <Button variant="outline" icon={User}>Artist Sign Up</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="py-20 px-6 bg-band-gray-dark/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display font-bold text-4xl mb-2">Fresh on Bandstream</h2>
              <p className="text-band-gray-medium">Hand-picked selections from the underground.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">Electronic</button>
              <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">Rock</button>
              <button className="px-4 py-2 rounded-full bg-band-green text-band-black text-sm font-bold transition-colors">All Genres</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {albums.map((album, index) => (
              <AlbumCard key={index} {...album} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" className="!px-10">View All New Releases</Button>
          </div>
        </div>
      </section>

      {/* Value Proposition / "Habillage" Style Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-band-green text-band-black">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-black/5 rounded-l-full transform translate-x-1/2 scale-150"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="font-display font-bold text-5xl md:text-6xl mb-6 leading-tight">
              Direct to Fan.<br/>Direct to Artist.
            </h2>
            <p className="text-xl font-medium opacity-80 mb-8 max-w-md">
              We take a lower cut than anyone else, meaning your favorite artists actually get paid for their work.
            </p>
            <button className="bg-band-black text-band-green px-8 py-4 rounded-full font-display font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
              <ShoppingBag size={20} />
              Start Supporting
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-band-black rounded-full flex items-center justify-center p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="text-center text-band-cream">
                 <Logo className="w-24 h-24 mx-auto mb-4" />
                 <p className="font-display font-bold text-2xl">bandstream</p>
                 <p className="text-sm opacity-60 mt-2">EST. 2026</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-band-black pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="w-8 h-8" />
              <span className="font-display font-bold text-xl">bandstream</span>
            </div>
            <p className="text-band-gray-medium text-sm leading-relaxed">
              Empowering independent artists and labels to share and earn from their music.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Discover</h4>
            <ul className="space-y-3 text-sm text-band-gray-medium">
              <li><a href="#" className="hover:text-band-green transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Genres</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Weekly Stream</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">For Artists</h4>
            <ul className="space-y-3 text-sm text-band-gray-medium">
              <li><a href="#" className="hover:text-band-green transition-colors">Sign Up</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Artist Guide</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Merch Store</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Stats & Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-band-gray-medium">
              <li><a href="#" className="hover:text-band-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-band-green transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-band-gray-medium">© 2026 Bandstream Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Share2 size={16} className="text-band-gray-medium hover:text-white cursor-pointer" />
            <Heart size={16} className="text-band-gray-medium hover:text-white cursor-pointer" />
            <MoreHorizontal size={16} className="text-band-gray-medium hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* Sticky Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-band-black border-t border-white/10 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/3">
            <div className="w-12 h-12 bg-band-gray-dark rounded-md overflow-hidden relative group">
               <img src="https://picsum.photos/seed/neon/100/100" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                 <Disc size={16} className="animate-spin" />
               </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Neon Nights</h4>
              <p className="text-xs text-band-gray-medium">Cyber Collective</p>
            </div>
            <Heart size={16} className="text-band-green ml-2 cursor-pointer" />
          </div>

          <div className="flex flex-col items-center w-1/3">
            <div className="flex items-center gap-6 mb-2">
              <button className="text-band-gray-medium hover:text-white"><MoreHorizontal size={16} /></button>
              <button className="text-white hover:text-band-green transform rotate-180"><Play size={16} /></button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                <Play fill="currentColor" size={18} className="ml-1" />
              </button>
              <button className="text-white hover:text-band-green"><Play size={16} /></button>
              <button className="text-band-gray-medium hover:text-white"><Share2 size={16} /></button>
            </div>
            <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-band-green rounded-full"></div>
            </div>
          </div>

          <div className="w-1/3 flex justify-end items-center gap-4">
            <span className="text-xs font-bold text-band-green border border-band-green px-2 py-1 rounded">BUY €12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

