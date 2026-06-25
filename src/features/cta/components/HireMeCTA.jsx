import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';

export default function HireMeCTA() {
  return (
    <section className={styles.section} id="hire-me-cta">
      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.textBlock}>
            <h2 className={styles.title}>
              I will build a full stack web app with django and react
            </h2>
            <p className={styles.desc}>
              Hire me on Fiverr for high-performance backend systems, distributed architectures, and custom React interfaces. Available for end-to-end full-stack development.
            </p>
          </div>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.contactBtn}>
              <span>Contact Me</span>
              <ArrowRight size={16} />
            </Link>
            <a 
              href="https://www.fiverr.com/s/rEYj067" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.fiverrBtn}
            >
              <span>Order on Fiverr</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
