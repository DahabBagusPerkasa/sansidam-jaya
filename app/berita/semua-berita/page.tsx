import Link from "next/link";
import { news } from "../data";
import styles from "./semua-berita.module.css";

export default function SemuaBeritaPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <Link href="/#berita" className={styles.backLink}>
            <span className={styles.backIcon} aria-hidden="true">
              ←
            </span>
            <span>Kembali ke Beranda</span>
          </Link>

          <div className={styles.eyebrow}>
            <span className={styles.liveDot} aria-hidden="true" />
            INFORMASI TERKINI
          </div>
          <h1 className={styles.title}>Berita dan Kegiatan</h1>
          <p className={styles.subtitle}>
            Informasi, dokumentasi, dan kabar terbaru dari Sansidam Jaya.
          </p>
          <div className={styles.newsTotal}>
            <strong>{String(news.length).padStart(2, "0")}</strong>
            <span>
              <b>Total Berita</b>
              <small>Dokumentasi kegiatan Sansidam Jaya</small>
            </span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.newsList}>
          {news.map((item) => (
            <article className={styles.newsCard} key={item.image}>
              <div
                className={styles.newsImage}
                role={item.title ? "img" : undefined}
                aria-label={item.title ? `Dokumentasi: ${item.title}` : undefined}
                aria-hidden={!item.title}
                style={{
                  backgroundImage: `url("/images/${item.image}")`,
                }}
              />
              {item.title ? (
                <>
                  <div className={styles.newsContent}>
                    <div className={styles.newsMeta}>
                      <span className={styles.category}>KEGIATAN</span>
                      <time>{item.date}</time>
                    </div>
                    <h2 className={styles.newsTitle}>{item.title}</h2>
                    <span className={styles.cardDivider} aria-hidden="true" />
                    <p className={styles.newsDescription}>
                      {item["berita-lengkap"]}
                    </p>
                  </div>
                </>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
