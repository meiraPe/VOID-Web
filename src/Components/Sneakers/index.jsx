import React from 'react';
import Image from 'next/image';
import styles from './Sneakers.module.css';

export default function Sneakers({ imagem1Url, marca, nome }) {
  return (
      <div className={styles.productCard}>
        <Image
          src={imagem1Url}
          alt="produto"
          width={120}
          height={60}
          className={styles.productImage}
        />

        <div className={styles.productInfo}>
          <span className={styles.productBrand}>{marca}</span>
          <h3 className={styles.productName}>{nome}</h3>
        </div>
      </div>
  );
}
