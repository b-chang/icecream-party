import { useState } from 'react';
import styles from './IceCream.module.css'

const IceCream = ({ icecream }) => {
  const { name, image_url, categories, rating, url, review_count, location, transactions } = icecream;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.shop}>
        <img className={styles.picture} src={image_url} />
        <div className={styles.info}>
          <a
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.name} ${isHover ? styles.clickable : ''}`}
            href={url}
            target="_blank"
          >
            {name}
          </a>
          <div>{rating} ({review_count})</div>
          <div className={styles.categories}>
            {categories.map((category, index) => <div key={index} className={styles.category}>{category.title}</div>)}
          </div>
        </div>
      </div>
      <div className={styles.address}>{location.address1}, {location.city}, {location.state}, {location.zip_code} </div>
    </div>
  )
}

export default IceCream