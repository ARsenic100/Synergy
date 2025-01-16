import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, School, Users } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

const insights = [
  {
    title: 'Resource Optimization',
    description:
      'AI predicts 25% improvement in resource utilization through smart allocation.',
    icon: TrendingUp,
    color: 'blue',
  },
  {
    title: 'Infrastructure Planning',
    description:
      'Recommended upgrades could benefit 450+ students in the next academic year.',
    icon: School,
    color: 'green',
  },
  {
    title: 'Student Performance',
    description:
      'Data suggests 15% potential improvement in learning outcomes.',
    icon: Users,
    color: 'purple',
  },
];

export function AIInsightsPreview() {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Brain className="h-8 w-8 text-indigo-400" />
          <h2 className="text-3xl font-bold">AI-Powered Insights</h2>
        </div>

        <div className="mb-12 text-center text-lg text-indigo-200">
          <Typewriter
            options={{
              strings: [
                'Analyzing school performance metrics...',
                'Generating resource optimization strategies...',
                'Predicting future requirements...',
                'Providing data-driven recommendations...',
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors"
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-${insight.color}-500/20 mb-4`}
                >
                  <Icon className={`h-6 w-6 text-${insight.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
                <p className="text-indigo-200">{insight.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/analysis">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">
              Explore Full AI Analysis
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
