import styles from './inventory.module.css';
import Inventory from './inventory/Inventory.tsx';

export function InventoryPage() {
  return (
    <div className={styles['container']}>
      <Inventory />{' '}
    </div>
  );
}

export default InventoryPage;
