import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Orienthiel Healthcare Services has been exceptional in providing me with opportunities to grow in my field. Their professionalism and attention to detail made the entire placement process smooth and efficient. I feel valued and supported in my role, and I appreciate the consistent communication and follow-up. They truly care about their nurses!",
    name: "Michael L.",
    role: "NP"
  },
  {
    quote: "Working with Orienthiel Healthcare Services has been a game-changer for my career. Their dedicated team matched me with a position that perfectly aligns with my skills and career goals. The onboarding process was seamless, and their support has been outstanding. I highly recommend Orienthiel for anyone looking to advance their nursing career!",
    name: "Emma J.",
    role: "RN"
  },
  {
    quote: "I'm thrilled with my experience working with Orienthiel Healthcare Services. From the initial contact to securing my current position, their team was proactive and attentive. They took the time to understand my preferences and found a perfect match. It's refreshing to work with an agency that genuinely prioritizes its staff's well-being and career satisfaction.",
    name: "Sarah T.",
    role: "LPN"
  }
];

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">What our professionals say</h2>
        <div className="relative p-8 bg-[#f7f4ef] rounded-2xl">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#c0996c] text-[#c0996c]" />)}
          </div>
          <p className="text-lg text-slate-700 mb-8 italic">"{testimonials[currentIndex].quote}"</p>
          <div className="font-bold text-[#1d1f39]">{testimonials[currentIndex].name}</div>
          <div className="text-sm text-[#c0996c]">{testimonials[currentIndex].role}</div>
          
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"><ChevronLeft /></button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"><ChevronRight /></button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-[#1d1f39]' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
