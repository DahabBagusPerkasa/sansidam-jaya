import Link from "next/link";
import { news } from "../../berita/data";
import styles from "./semua-galeri.module.css";

export default function SemuaGaleriPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <Link href="/#galeri" className={styles.backLink}>
            <span className={styles.backIcon} aria-hidden="true">
              ←
            </span>
            <span>Kembali ke Beranda</span>
          </Link>

          <div className={styles.eyebrow}>
            <span className={styles.liveDot} aria-hidden="true" />
            DOKUMENTASI KEGIATAN
          </div>
          <h1 className={styles.title}>Galeri Kegiatan</h1>
          <p className={styles.subtitle}>
            Dokumentasi kegiatan dan aktivitas Sansidam Jaya.
          </p>
          <div className={styles.galleryTotal}>
            <strong>{String(news.length).padStart(2, "0")}</strong>
            <span>
              <b>Total Foto</b>
              <small>Dokumentasi kegiatan Sansidam Jaya</small>
            </span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.galleryGrid}>
          {news.map((item, index) => (
            <article className={styles.galleryCard} key={item.image}>
              <img
                src={`/images/${item.image}`}
                alt={`Foto ${index + 1}: ${item.title}`}
                className={styles.galleryImage}
              />
              <div className={styles.galleryContent}>
                <time>{item.date}</time>
                <h2>{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
