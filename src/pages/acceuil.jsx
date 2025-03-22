import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Dashboard() {
  const [faqQuestion, setFaqQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showProfile, setShowProfile] = useState(false);
  const [newsletterPreferences, setNewsletterPreferences] = useState({
    categories: false,
    tags: false,
    auteurs: false,
    titres: false
  });
  const [requestForm, setRequestForm] = useState({
    titre: '',
    auteur: '',
    description: '',
    autresInfos: '',
    urgent: false,
    informerStatut: false
  });

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    console.log('Question FAQ soumise:', faqQuestion);
    // Logique pour soumettre la question
  };

  const handleNewsletterChange = (e) => {
    setNewsletterPreferences({
      ...newsletterPreferences,
      [e.target.name]: e.target.checked
    });
  };

  const handleRequestChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRequestForm({
      ...requestForm,
      [e.target.name]: value
    });
  };
  const handleSearch = () => {
    console.log('Recherche:', searchQuery);
};

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log('Requête soumise:', requestForm);
    // Logique pour soumettre la requête
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Marge à gauche */}
      <aside className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <img src="/image3A.jpg" alt="Logo" className={styles.logo} />
                </div>
                <nav className={styles.nav}>
                    <h2 className={styles.navTitle}>Fichiers</h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un fichier"
                        className={styles.searchInput}
                    />
                    <button onClick={handleSearch} className={styles.searchButton}>
                        Rechercher
                    </button>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>Rag Agent</a></Link>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>Uploader/Ajouter un fichier</a></Link>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>Requête de mise à disposition</a></Link>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>Favoris</a></Link>

                    <h2 className={styles.navTitle}>Autres</h2>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>FAQ</a></Link>
                    <Link href="/" legacyBehavior><a className={styles.navLink}>Nouveautés</a></Link>
                </nav>
            </aside>


      {/* Contenu principal */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.profileSection}>
            <FaUserCircle 
              className={styles.profileIcon} 
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className={styles.profileDropdown}>
                <p>Nom: John Doe</p>
                <p>Email: john@example.com</p>
                <Link href="/edit-profile" legacyBehavior>
  <a className={styles.editProfileLink}>Modifier le profil</a>
</Link>

              </div>
            )}
          </div>
        </header>

        {/* Formulaires */}
        <div className={styles.formContainer}>
          {/* Formulaire FAQ */}
          <form onSubmit={handleFaqSubmit} className={styles.form}>
            <h2>FAQ</h2>
            <textarea
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              placeholder="Posez votre question ici"
              className={styles.textarea}
            />
            <button type="submit" className={styles.button}>Soumettre la question</button>
          </form>

          {/* Formulaire Newsletter */}
          <form className={styles.form}>
            <h2>Préférences Newsletter</h2>
            {Object.entries(newsletterPreferences).map(([key, value]) => (
              <label key={key} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleNewsletterChange}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </form>
        </div>

        {/* Formulaire de Requête de mise à disposition */}
        <form onSubmit={handleRequestSubmit} className={styles.form}>
          <h2>Requête de mise à disposition</h2>
          <input
            type="text"
            name="titre"
            value={requestForm.titre}
            onChange={handleRequestChange}
            placeholder="Titre"
            className={styles.input}
          />
          <input
            type="text"
            name="auteur"
            value={requestForm.auteur}
            onChange={handleRequestChange}
            placeholder="Auteur"
            className={styles.input}
          />
          <textarea
            name="description"
            value={requestForm.description}
            onChange={handleRequestChange}
            placeholder="Description"
            className={styles.textarea}
          />
          <textarea
            name="autresInfos"
            value={requestForm.autresInfos}
            onChange={handleRequestChange}
            placeholder="Autres informations utiles"
            className={styles.textarea}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="urgent"
              checked={requestForm.urgent}
              onChange={handleRequestChange}
            />
            Urgent
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="informerStatut"
              checked={requestForm.informerStatut}
              onChange={handleRequestChange}
            />
            M'informer du statut de la requête
          </label>
          <button type="submit" className={styles.button}>Valider la requête</button>
        </form>
      </main>
    </div>
  );
}
