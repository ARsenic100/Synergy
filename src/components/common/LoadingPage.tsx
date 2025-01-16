import React from 'react';
import { School, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-8 h-20 w-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <School className="h-16 w-16 text-indigo-600" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-2xl font-bold text-gray-900">
              School Structure Analysis
            </h1>
            <p className="text-gray-600">Preparing your experience...</p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-2 text-indigo-600"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm">Loading</span>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
