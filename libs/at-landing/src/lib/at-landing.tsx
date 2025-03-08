import styles from './at-landing.module.css';
import Landing from "./Landing/Landing.tsx";

export function AtLanding() {
  return (
    <div className={styles['container']}>
      <Landing></Landing>
    </div>
  );
}

export default AtLanding;
