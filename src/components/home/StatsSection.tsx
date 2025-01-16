import React from 'react';
import { motion } from 'framer-motion';
import { School, Users, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  {
    icon: School,
    label: 'Schools Transitioned',
    value: 145012,
    suffix: '+',
    color: 'text-emerald-500',
  },
  {
    icon: TrendingUp,
    label: 'Resources Allocated',
    value: 10,
    suffix: 'M+',
    color: 'text-blue-500',
  },
  {
    icon: Users,
    label: 'Stakeholder Engagements',
    value: 200,
    suffix: 'K+',
    color: 'text-indigo-500',
  },
];

export function StatsSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${stat.color} bg-opacity-10 mb-4`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-2">
                <CountUp end={stat.value} duration={2.5} separator="," />
                {stat.suffix}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
