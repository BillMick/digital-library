import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/Home.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    if (!searchQuery) {
      setErrorMessage('Veuillez entrer un terme de recherche.');
    } else {
      setErrorMessage('');
      console.log('Recherche:', searchQuery);
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    console.log('Inscription à la newsletter:', email);
    setEmail('');
  };

  const carouselItems = [
    { id: 1, title: 'Nouveautés', image: '/image3.jpg', description: 'Découvrez nos dernières nouveautés littéraires.' },
    { id: 2, title: 'Événements', image: '/image3.jpg', description: 'Participez à nos événements culturels et ateliers.' },
    { id: 3, title: 'Ressources', image: '/image3.jpg', description: 'Explorez nos ressources numériques exclusives.' },
  ];
  

  const bookCategories = [
    {
      id: 1,
      name: 'Romans',
      books: [
        { id: 1, title: 'Livre 1', image: '/image1.jpg', excerpt: 'Extrait du livre 1' },
        { id: 2, title: 'Livre 2', image: '/image1.jpg', excerpt: 'Extrait du livre 2' },
        { id: 1, title: 'Livre 1', image: '/image1.jpg', excerpt: 'Extrait du livre 1' },
        { id: 2, title: 'Livre 2', image: '/image1.jpg', excerpt: 'Extrait du livre 2' },
        { id: 1, title: 'Livre 1', image: '/image1.jpg', excerpt: 'Extrait du livre 1' },
        { id: 2, title: 'Livre 2', image: '/image1.jpg', excerpt: 'Extrait du livre 2' },
        { id: 1, title: 'Livre 1', image: '/image1.jpg', excerpt: 'Extrait du livre 1' },
      ],
    },
    {
      id: 2,
      name: 'Science-Fiction',
      books: [
        { id: 3, title: 'Livre 3', image: '/image1.jpg', excerpt: 'Extrait du livre 3' },
        { id: 4, title: 'Livre 4', image: '/image1.jpg', excerpt: 'Extrait du livre 4' },
      ],
    },
  ];

  const newsItems = [
    { id: 1, title: 'Dernières actualités', content: 'Contenu de l\'actualité 1' },
    { id: 2, title: 'Événements à venir', content: 'Contenu de l\'actualité 2' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Bibliothèques de Paris - Accueil</title>
        <meta name="description" content="Bibliothèque numérique" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* En-tête */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/image3A.jpg" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Bibliothèques de Paris</h1>
        </div>
        <nav className={styles.nav}>
        <Link href="/acceuil" legacyBehavior>
  <a className={styles.navLink}>Accueil</a>
</Link>

          <Link href="/" legacyBehavior><a className={styles.navLink}>Catalogue</a></Link>
          <Link href="/" legacyBehavior><a className={styles.navLink}>Services</a></Link>
          <Link href="/" legacyBehavior><a className={styles.navLink}>Événements</a></Link>
          <Link href="/" legacyBehavior><a className={styles.navLink}>Ressources</a></Link>
          <Link href="/" legacyBehavior><a className={styles.navLink}>Infos Pratiques</a></Link>
          <Link href="/" legacyBehavior><a className={styles.navLink}>Contact</a></Link>
        </nav>

        {/* Mon compte */}
        <div className={styles.monCompte}>
          <FaUserCircle className={styles.monCompteIcon} />
          <span>Mon Compte</span>
        </div>
      </header>

      {/* Carrousel */}
      <Slider {...settings} className={styles.carousel}>
        {carouselItems.map(item => (
          <div key={item.id} className={styles.carouselItem}>
            <div className={styles.carouselImageContainer}>
              <img src={item.image} alt={item.title} className={styles.carouselImage} />
              <div className={styles.carouselText}>{item.description}</div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Contenu principal */}
      <main className={styles.main}>
        {/* Section de recherche */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recherche</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un document"
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              <span className={styles.searchIcon}>&#x1F50D;</span>
            </button>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </section>

        {/* Catégories de livres */}
        <section className={styles.bookCategoriesSection}>
          <h2 className={styles.sectionTitle}>Catégories de livres</h2>
          {bookCategories.map(category => (
            <div key={category.id} className={styles.bookCategory}>
              <h3>{category.name}</h3>
              <div className={styles.bookList}>
                {category.books.map(book => (
                  <div key={book.id} className={styles.bookItem}>
                    <img src={book.image} alt={book.title} className={styles.bookImage} />
                    <h4>{book.title}</h4>
                    <p>{book.excerpt}</p>
                    <button className={styles.viewMoreButton}>Voir plus</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Actualités */}
        <section className={styles.newsSection}>
          <h2 className={styles.sectionTitle}>Actualités</h2>
          <div className={styles.newsList}>
            {newsItems.map(item => (
              <div key={item.id} className={styles.newsItem}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Section Contact & Newsletter */}
      <section className={styles.contactSection}>
        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h2>Contact</h2>
          <p>Email: contact@bibliotheques.paris.fr</p>
          <p>Téléphone: 01 23 45 67 89</p>
        </div>

        {/* Newsletter Form */}
        <div className={styles.newsletterContainer}>
          <h2 className={styles.newsletterTitle}>Newsletter</h2>
          <form onSubmit={handleNewsletter} className={styles.newsletterForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>S'inscrire</button>
          </form>
        </div>

        {/* Autre section intéressante */}
        <div className={styles.extraSection}>
          <h2>À découvrir</h2>
          <p>Explorez nos événements culturels et ateliers interactifs.</p>
        </div>
      </section>

      {/* Pied de page */}
      <footer className={styles.footer}>
        <p>© 2025 Bibliothèques de Paris. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
