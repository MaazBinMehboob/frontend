import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Shield, Zap, Github, Twitter, Mail, ArrowUp } from 'lucide-react';

const HomePage = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
            🚀 Hackathon<span className="text-indigo-600">Starter</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Home', 'About', 'Features', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">
                {item}
              </a>
            ))}
            <Button size="sm" className="rounded-full px-6">Get Started</Button>
          </div>
          
          {/* Mobile Menu Placeholder (Optional) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">☰</Button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Build Anything <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Fast.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              The ultimate boilerplate for your next big idea. Fully responsive, dark-mode ready, and designed to win hackathons in record time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-md px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/20">
                Deploy Now
              </Button>
              <Button size="lg" variant="outline" className="text-md px-8 py-6 rounded-xl">
                View Demo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full max-w-[500px]"
          >
            <div className="relative aspect-square rounded-3xl bg-gradient-to-tr from-indigo-100 to-violet-100 dark:from-indigo-900/20 dark:to-violet-900/20 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
               {/* Replace with your specific SVG or Image component */}
               <Rocket className="w-32 h-32 text-indigo-600 animate-pulse" />
               <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/50"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Packed with Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Lightning Fast", 
                desc: "Optimized for speed and performance right out of the box.", 
                icon: <Zap className="w-10 h-10 text-yellow-500" /> 
              },
              { 
                title: "Secure by Default", 
                desc: "Industry standard security practices built into every layer.", 
                icon: <Shield className="w-10 h-10 text-blue-500" /> 
              },
              { 
                title: "Modern Stack", 
                desc: "Utilizing React, Tailwind, and Radix UI for the best DX.", 
                icon: <Rocket className="w-10 h-10 text-indigo-500" /> 
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow dark:bg-slate-900">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-500">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Hackathon Project. All rights reserved.
          </p>
        
        </div>
      </footer>

      {/* --- SCROLL TO TOP FAB --- */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all active:scale-95"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HomePage;