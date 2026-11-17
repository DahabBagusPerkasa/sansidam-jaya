"use client";

import { useEffect, useRef, useState } from "react";
import { news, publishedNews } from "./berita/data";

const galleryPhotos = news.slice(0, 4);

const heroImages = [
  "/images/hero%201.jpg",
  "/images/hero%202.jpg",
  "/images/hero%203.jpg",
];

const navigation = [
  { label: "Beranda", id: "beranda" },
  { label: "Profil", id: "profil" },
  { label: "Tugas dan Fungsi", id: "tugas" },
  { label: "Berita", id: "berita" },
  { label: "Galeri", id: "galeri" },
  { label: "Kontak", id: "kontak" },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedNews, setSelectedNews] = useState<
    (typeof publishedNews)[number] | null
  >(null);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<
    (typeof news)[number] | null
  >(null);

  const pointerStart = useRef<number | null>(null);
  const newsDialogRef = useRef<HTMLDialogElement | null>(null);
  const galleryDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!selectedNews) return;

    const dialog = newsDialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedNews]);

  useEffect(() => {
    if (!selectedGalleryPhoto) return;

    const dialog = galleryDialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedGalleryPhoto]);

  // HERO SLIDER AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // NAVBAR ACTIVE SECTION
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (pageBottom) {
        setActiveSection("kontak");
        return;
      }

      const scrollPosition = 160;
      let currentSection = "beranda";

      navigation.forEach((item) => {
        const element = document.getElementById(item.id);

        if (element && element.getBoundingClientRect().top <= scrollPosition) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // HERO SLIDER NAVIGATION
  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setActiveSlide(
      (current) => (current + 1) % heroImages.length
    );
  };

  // HERO SLIDER SWIPE
  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;

    if (distance < -50) {
      nextSlide();
    } else if (distance > 50) {
      previousSlide();
    }

    pointerStart.current = null;
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
  };

  return (
    <main>
      {/* NAVBAR */}
      <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="container nav-container">

          <a href="#beranda" className="brand">
            <img
              src="/images/logo%201.png"
              alt="Logo Sansidam Jaya"
              className="logo-placeholder"
            />

            <div className="brand-text">
              <strong>SANSIDAM JAYA</strong>
              <span>Sandi dan Siber Kodam Jaya</span>
            </div>
          </a>

          <nav className="nav-links">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#kontak" className="nav-contact">
            <img
              src="/images/Icon%20Telepon.png"
              alt=""
              className="phone-icon"
            />
            Hubungi Kami
          </a>

          <details className="mobile-menu">
            <summary aria-label="Buka menu navigasi">
              <img
                src="/images/menu.png"
                alt="Menu"
                className="menu-icon"
              />
            </summary>

            <nav>
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "active" : ""}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

        </div>
      </header>


      {/* HERO SECTION */}
      <section
        className="hero"
        id="beranda"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >

        <div className="hero-background">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Banner Sansidam Jaya ${index + 1}`}
              className={`hero-image ${
                activeSlide === index ? "active" : ""
              }`}
              draggable="false"
            />
          ))}
        </div>

        <div className="container hero-content">

          <span className="eyebrow">
            SELAMAT DATANG DI WEBSITE RESMI
          </span>

          <h1>
            SANDI DAN SIBER
            <br />
            KODAM JAYA
          </h1>

          <p className="hero-tagline">
            Menjaga Informasi,
            <br />
            Memperkuat Keamanan Digital.
          </p>

          <a
            href="#profil"
            className="btn btn-gold"
            onPointerDown={(event) => event.stopPropagation()}
          >
            Mengenal Sansidam Jaya
            <img
              src="/images/arrow-up-right.png"
              alt=""
              className="arrow-icon"
            />
          </a>

          <div
            className="hero-indicator"
            onPointerDown={(event) => event.stopPropagation()}
          >
            {heroImages.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Tampilkan banner ${index + 1}`}
                aria-current={activeSlide === index}
                className={
                  activeSlide === index ? "indicator-active" : ""
                }
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

        </div>

        <div className="hero-bottom-label">
          SATRIA YUDHA WASKITA
        </div>

      </section>


      {/* PROFIL */}
      <section className="profile-section section" id="profil">
        <div className="container profile-grid">

          <div className="profile-image-wrap">
            <img
              src="/images/gedung.png"
              alt="Gedung Kodam Jaya"
              className="profile-image"
            />
          </div>

          <div className="profile-content">

            <span className="section-line" />
            <span className="section-label">TENTANG KAMI</span>

            <h2>Mengenal Sansidam Jaya</h2>

            <p>
              Sandi dan Siber Kodam Jaya merupakan unsur pelaksana
              staf di tingkat Markas Komando Daerah Militer Jaya
              yang berperan dalam pembinaan dan penyelenggaraan
              fungsi persandian untuk mendukung pelaksanaan tugas
              pokok Kodam Jaya.
            </p>

            <a href="#tugas" className="btn btn-gold btn-small">
              Selengkapnya
              <img
                src="/images/arrow-up-right.png"
                alt=""
                className="arrow-icon"
              />
            </a>

          </div>

          <div className="motto-card">
            <span>MOTTO KODAM JAYA</span>

            <h3>
              ANEKA DAYA
              <br />
              TUNGGAL BHAKTI
            </h3>

            <p>
              Beraneka Macam Kekuatan
              <br />
              Satu Pengabdian.
            </p>

          </div>

        </div>
      </section>


      {/* TUGAS DAN FUNGSI */}
      <section className="duties-section section" id="tugas">
        <div className="container duties-grid">

          <div className="duties-intro">

            <span className="section-line" />
            <span className="section-label">
              PERAN DAN TANGGUNG JAWAB
            </span>

            <h2>Tugas dan Fungsi</h2>

            <p>
              Mengenal bidang persandian dan keamanan informasi
              yang menjadi bagian dari peran Sansidam Jaya.
            </p>

            <a href="#berita" className="btn btn-gold">
              Pelajari Lebih Lanjut
              <img
                src="/images/arrow-up-right.png"
                alt=""
                className="arrow-icon"
              />
            </a>

          </div>

          <div className="duty-card">

            <img
              src="/images/persandian-icon.png"
              alt=""
              className="duty-icon"
            />

            <h3>Persandian</h3>

            <p>
              Pembinaan dan penyelenggaraan fungsi persandian
              dalam mendukung keamanan informasi.
            </p>

            <a href="#kontak" aria-label="Informasi persandian">
              <img
                src="/images/arrow-right.png"
                alt=""
                className="arrow-icon"
              />
            </a>

          </div>

          <div className="duty-card">

            <img
              src="/images/siber-icon.png"
              alt=""
              className="duty-icon"
            />

            <h3>Keamanan Siber</h3>

            <p>
              Pengenalan bidang keamanan informasi dan
              perlindungan ruang siber.
            </p>

            <a href="#kontak" aria-label="Informasi keamanan siber">
              <img
                src="/images/arrow-right.png"
                alt=""
                className="arrow-icon"
              />
            </a>

          </div>

        </div>
      </section>


      {/* BERITA */}
      <section className="news-section section" id="berita">
        <div className="container">

          <div className="section-heading">

            <div>
              <span className="section-line" />
              <span className="section-label">
                INFORMASI TERKINI
              </span>

              <h2>Berita dan Kegiatan</h2>

              <p>
                Informasi dan dokumentasi kegiatan Sansidam Jaya.
              </p>
            </div>

            <a
              href="/berita/semua-berita"
              className="btn btn-outline news-all-link"
            >
              Lihat Semua Berita
              <svg
                className="news-all-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>

          </div>

          <div className="news-grid">

            {publishedNews.map((item, index) => (
              <article className="news-card" key={item.image}>
                <button
                  type="button"
                  className="news-card-trigger"
                  aria-label={`Buka berita: ${item.title}`}
                  onClick={() => setSelectedNews(item)}
                />

                <img
                  src={`/images/${item.image}`}
                  alt={`Foto berita ${index + 1}`}
                  className="news-image"
                />

                <div className="news-content">

                  <span className="news-date">
                    <img
                      src="/images/calendar-icon.png"
                      alt=""
                      className="calendar-icon"
                    />
                    {item.date}
                  </span>

                  <h3>{item.title}</h3>

                  <span className="news-card-arrow" aria-hidden="true">
                    <img
                      src="/images/arrow-up-right.png"
                      alt=""
                      className="arrow-icon"
                    />
                  </span>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {selectedNews && (
        <dialog
          ref={newsDialogRef}
          className="news-modal"
          aria-labelledby="news-modal-title"
          onClose={() => setSelectedNews(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              newsDialogRef.current?.close();
            }
          }}
        >
          <button
            type="button"
            className="news-modal-close"
            aria-label="Tutup berita"
            autoFocus
            onClick={() => newsDialogRef.current?.close()}
          >
            ×
          </button>

          <img
            src={`/images/${selectedNews.image}`}
            alt={`Foto lengkap: ${selectedNews.title}`}
            className="news-modal-image"
          />

          <div className="news-modal-content">
            <time className="news-date">{selectedNews.date}</time>
            <h2 id="news-modal-title">{selectedNews.title}</h2>
            <p>{selectedNews["berita-lengkap"]}</p>
          </div>
        </dialog>
      )}

      {selectedGalleryPhoto && (
        <dialog
          ref={galleryDialogRef}
          className="gallery-modal"
          aria-label={`Foto galeri: ${selectedGalleryPhoto.title}`}
          onClose={() => setSelectedGalleryPhoto(null)}
          onCancel={(event) => {
            event.preventDefault();
            galleryDialogRef.current?.close();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              galleryDialogRef.current?.close();
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              galleryDialogRef.current?.close();
            }
          }}
        >
          <button
            type="button"
            className="news-modal-close"
            aria-label="Tutup foto"
            autoFocus
            onClick={() => galleryDialogRef.current?.close()}
          >
            ×
          </button>
          <img
            src={`/images/${selectedGalleryPhoto.image}`}
            alt={selectedGalleryPhoto.title}
            className="gallery-modal-image"
          />
        </dialog>
      )}

      {/* GALERI */}
      <section className="gallery-section section" id="galeri">
        <div className="container gallery-layout">

          <div className="gallery-intro">

            <span className="section-line" />
            <span className="section-label">DOKUMENTASI</span>

            <h2>Galeri Kegiatan</h2>

            <p>
              Dokumentasi kegiatan dan aktivitas Sansidam Jaya.
            </p>

            <a href="/galeri/semua-galeri" className="btn btn-gold btn-small">
              Lihat Galeri
              <img
                src="/images/arrow-up-right.png"
                alt=""
                className="arrow-icon"
              />
            </a>

          </div>

          <div className="gallery-grid">

            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.image}
                type="button"
                className="gallery-image-trigger"
                aria-label={`Perbesar foto ${index + 1}: ${photo.title}`}
                onClick={() => setSelectedGalleryPhoto(photo)}
              >
                <img
                  src={`/images/${photo.image}`}
                  alt={photo.title}
                  className="gallery-image"
                />
              </button>
            ))}

          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="footer" id="kontak">
        <div className="container footer-grid">

          <div className="footer-brand">

            <strong>SANSIDAM JAYA</strong>
            <span>Sandi dan Siber Kodam Jaya</span>

            <p>
              Berkomitmen dalam mendukung keamanan informasi
              untuk menunjang pelaksanaan tugas Kodam Jaya.
            </p>

          </div>

          <div className="footer-column">

            <h3>Navigasi</h3>

            <a href="#beranda">Beranda</a>
            <a href="#profil">Profil</a>
            <a href="#tugas">Tugas dan Fungsi</a>
            <a href="#berita">Berita</a>
            <a href="#galeri">Galeri</a>

          </div>

          <div className="footer-column">

            <h3>Informasi</h3>

            <p>
              <strong>Alamat:</strong>
              <br />
              Jl. Mayor Jendral Sutoyo No. 5, RT. 7/RW. 7, Cawang, Kecamatan
              Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta
              13630
            </p>
            <p>
              <strong>Email Utama Kodam Jaya:</strong>
              <br />
              <a href="mailto:kodamjayajayakarta@gmail.com">
                kodamjayajayakarta@gmail.com
              </a>
            </p>
            <p>
              <strong>Telepon:</strong>
              <br />
              <a href="tel:+62218093100">(021) 809-3100</a>
              <br />
              Telepon umum Kodam Jaya
            </p>

          </div>

          <div className="footer-column">

            <h3>Media Sosial</h3>

            <a
              className="footer-social-link"
              href="https://www.instagram.com/sansidamjy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Sansidam Jaya, @sansidamjy"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              @sansidamjy
            </a>

          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Sansidam Jaya. Hak Cipta Dilindungi.</p>
        </div>

      </footer>

    </main>
  );
}