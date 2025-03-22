import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/EditProfile.module.css';

export default function EditProfile() {
  const [profile, setProfile] = useState({
    nom: 'John Doe',
    email: 'john@example.com',
    telephone: '0123456789',
    adresse: '123 Rue de la République, 75001 Paris'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouteriez la logique pour envoyer les données mises à jour au serveur
    console.log('Profil mis à jour:', profile);
    alert('Profil mis à jour avec succès !');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Éditer le Profil</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={profile.nom}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telephone">Téléphone :</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={profile.telephone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="adresse">Adresse :</label>
          <textarea
            id="adresse"
            name="adresse"
            value={profile.adresse}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>Mettre à jour le profil</button>
      </form>
      <Link href="/accueil">
        <a className={styles.backLink}>Retour au Dashboard</a>
      </Link>
    </div>
  );
}
