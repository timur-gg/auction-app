import styles from './signup.module.css';
import Signup from './signup/Signup.tsx';

export function SignupPage() {
  return (
    <div className={styles['container']}>
      <Signup />
    </div>
  );
}

export default SignupPage;

