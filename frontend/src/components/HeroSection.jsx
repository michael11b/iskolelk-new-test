'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedGradient from './AnimatedGradient';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />
      <AnimatedGradient />
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Iskolelk
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          Access a comprehensive collection of past exam papers to help you excel in your studies
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Browse Papers
          </button>
          <button className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
      {/* Hero Image */}
      <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-[500px]">
        <Image
          src="/hero/student.png"
          alt="Hero illustration"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
};

export default HeroSection; 