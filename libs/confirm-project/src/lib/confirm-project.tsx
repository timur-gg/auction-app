import styles from './confirm-project.module.css';
import ConfirmProject from './ConfirmProject/ConfirmProject.tsx';

export function ConfirmProjectPage() {
  return (
    <div className={styles['container']}>
      <ConfirmProject />
    </div>
  );
}

export default ConfirmProject;

