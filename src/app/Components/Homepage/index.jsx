"use client";

import styles from './Homepage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return(
    <div className={styles.banner}>
      <Image
          src="/placeholders/bannerHome.jpg"
          alt="Banner Home"
          width={1000}
          height={2000}
          priority
        />
    </div>
  )
}