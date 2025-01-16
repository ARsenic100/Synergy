import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  school: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    role: 'School Principal',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    quote:
      'The standardization process has revolutionized how we manage resources and deliver education. Our students and teachers are thriving in the new environment.',
    school: 'Delhi Public School',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Education Administrator',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    quote:
      "The transformation has been remarkable. We've seen significant improvements in student performance and teacher satisfaction since implementing the standardized structure.",
    school: "St. Mary's School",
  },
  {
    id: '3',
    name: 'Arun Patel',
    role: 'District Coordinator',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    quote:
      "The platform's AI-driven insights have been invaluable in making data-driven decisions for resource allocation and improvement strategies.",
    school: 'Education Department',
  },
];

export function Testimonials() {
  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Voices of Transformation
          </h2>
          <p className="text-lg text-gray-600">
            Hear from educators and administrators about their standardization
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-indigo-100" />

              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-indigo-600">
                    {testimonial.school}
                  </p>
                </div>
              </div>

              <blockquote className="text-gray-600 relative">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
