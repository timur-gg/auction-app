import styles from './create-auction.module.css';
import CreateAuction from './CreateAuction/CreateAuction.tsx';

export function CreateAuctionPage() {
  return (
    <div className={styles['container']}>
      <CreateAuction />
    </div>
  );
}

export default CreateAuctionPage;
