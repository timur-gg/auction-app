import styles from './auction.module.css';
import Auction from './auction/Auction.tsx';
import Project from './project/Project.tsx';

export function AuctionPage() {
  return (
    <div className={styles['container']}>
      <Auction />{' '}
    </div>
  );
}

export function ProjectPage({ registered = false }: { registered?: boolean }) {
  return (
    <div className={styles['container']}>
      <Project registered={registered} /> {/* ✅ Pass the prop down */}
    </div>
  );
}
