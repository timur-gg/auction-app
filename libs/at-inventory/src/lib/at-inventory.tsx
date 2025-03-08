import styles from './at-inventory.module.css';
import Inventory from "./Inventory.tsx";

export function AtInventory() {
  return (
    <div className={styles['container']}>
 <Inventory/>    </div>
  );
}

export default AtInventory;
