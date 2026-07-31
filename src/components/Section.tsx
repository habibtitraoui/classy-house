import type { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
