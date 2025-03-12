import styles from './landing.module.css';
import Landing from './Landing/Landing.tsx';

export function LandingPage() {
  return (
    <div className={styles['container']}>
      <Landing></Landing>
    </div>
  );
}

export default LandingPage;
