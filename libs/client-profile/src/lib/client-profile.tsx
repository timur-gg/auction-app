import styles from './client-profile.module.css';
import ClientProfile from './client-profile/ClientProfile.tsx';

export function ClientProfilePage() {
  return (
    <div className={styles['container']}>
      <ClientProfile />{' '}
    </div>
  );
}

export default ClientProfilePage;
