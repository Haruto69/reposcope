import { motion } from 'framer-motion';

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPageWrapper({ children, className = '' }: AnimatedPageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
