import styles from './builder-profile.module.css';
import BuilderProfile from './builder-profile/BuilderProfile.tsx';

export function BuilderProfilePage() {
  return (
    <div className={styles['container']}>
      <BuilderProfile />{' '}
    </div>
  );
}

export default BuilderProfilePage;
