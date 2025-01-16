import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-2"
    >
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      <span className="text-sm font-medium text-gray-600">Loading...</span>
    </motion.div>
  );
}
