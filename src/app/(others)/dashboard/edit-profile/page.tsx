import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import React from "react";

const DashboardEditProfile = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>Civilité</Label>
          <Input placeholder="Mlle" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Rôle</Label>
          <Input placeholder="Etudiant" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Nom</Label>
          <Input placeholder="Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Prénom(s)</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Matricule</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Numéro de téléphone</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </label>
        <label className="block md:col-span-2">
          <Label>Adresse email</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Mot de passe actuel</Label>
          <Input placeholder="***" type="password" className="mt-1" />
        </label>
        <label className="block">
          <Label>Nouveau mot de passe</Label>
          <Input type="password" className="mt-1" />
        </label>
        <ButtonPrimary className="md:col-span-2" type="submit">
          Mettre à jour
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
