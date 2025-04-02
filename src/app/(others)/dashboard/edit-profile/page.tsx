"use client"
import React, { useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Select from "@/components/Select/Select";  // Assuming Select component exists

const DashboardEditProfile = () => {
  const [formData, setFormData] = useState({
    civility: "Monsieur",  // Default civility
    role: "ETUDIANT",      // Default role
    surname: "",
    firstname: "",
    regNumber: "",
    phoneNumber: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

        {/* Civility Dropdown */}
        <label htmlFor="civility" className="block">
          <Label>Civilité</Label>
          <Select
            id="civility"
            name="civility"
            value={formData.civility}
            onChange={handleChange}
            className="mt-1"
          >
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
          </Select>
        </label>

        {/* Role Dropdown */}
        <label htmlFor="role" className="block">
          <Label>Rôle</Label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1"
          >
            <option value="ETUDIANT">Etudiant</option>
            <option value="ENSEIGNANT">Enseignant</option>
            <option value="BIBLIOTHECAIRE">Bibliothécaire</option>
            <option value="ADMINISTRATEUR">Administrateur</option>
          </Select>
        </label>

        {/* Last Name Field */}
        <label htmlFor="surname" className="block">
          <Label>Nom</Label>
          <Input
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Doe"
            type="text"
            className="mt-1"
          />
        </label>

        {/* First Name Field */}
        <label htmlFor="firstname" className="block">
          <Label>Prénom(s)</Label>
          <Input
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="John"
            type="text"
            className="mt-1"
          />
        </label>

        {/* Registration Number Field */}
        <label htmlFor="regNumber" className="block">
          <Label>Matricule</Label>
          <Input
            id="regNumber"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleChange}
            placeholder="123456"
            type="text"
            className="mt-1"
          />
        </label>

        {/* Phone Number Field */}
        <label htmlFor="phoneNumber" className="block">
          <Label>Numéro de téléphone</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            type="tel"
            className="mt-1"
          />
        </label>

        {/* Email Field */}
        <label htmlFor="email" className="block md:col-span-2">
          <Label>Adresse email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>

        {/* Current Password Field */}
        <label htmlFor="currentPassword" className="block">
          <Label>Mot de passe actuel</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="***"
            type="password"
            className="mt-1"
          />
        </label>

        {/* New Password Field */}
        <label htmlFor="newPassword" className="block">
          <Label>Nouveau mot de passe</Label>
          <Input
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            type="password"
            className="mt-1"
          />
        </label>

        {/* Submit Button */}
        <ButtonPrimary className="md:col-span-2" type="submit">
          Mettre à jour
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
