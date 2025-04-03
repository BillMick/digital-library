import React, { FC } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import SocialsList from "@/components/SocialsList/SocialsList";
import Textarea from "@/components/Textarea/Textarea";
import Heading2 from "@/components/Heading/Heading2";

const info = [
  {
    title: "🗺 ADRESSE",
    desc: "Photo booth tatoué prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ TÉLÉPHONE",
    desc: "000-123-456-7890",
  },
];

const PageContact = ({}) => {
  return (
    <div>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-28 ">
        <Heading2>Nous Contacter</Heading2>
        <hr />
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="max-w-sm space-y-6">
          {info.map((item, index) => (
            <div key={index}>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                {item.title}
              </h3>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          ))}
          <div>
            <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
              🌏 RÉSEAUX SOCIAUX
            </h3>
            <SocialsList className="mt-2" />
          </div>
        </div>
        <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
        <div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <Label>Nom complet</Label>

              <Input placeholder="Exemple Doe" type="text" className="mt-1" />
            </label>
            <label className="block">
              <Label>Adresse e-mail</Label>

              <Input
                type="email"
                placeholder="exemple@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <Label>Message</Label>

              <Textarea className="mt-1" rows={6} />
            </label>
            <ButtonPrimary type="submit">Envoyer le message</ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageContact;
