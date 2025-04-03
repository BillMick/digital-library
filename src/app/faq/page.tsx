"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Combien de livres puis-je emprunter à la fois ?",
    answer: "Vous pouvez emprunter jusqu'à 5 livres en même temps.",
  },
  {
    question: "Quel est le format des livres disponibles ?",
    answer: "Nos livres sont disponibles en format numérique (PDF, ePub) et audio.",
  },
  {
    question: "Comment puis-je réserver un livre qui est déjà emprunté ?",
    answer: "Vous pouvez réserver un livre en cliquant sur 'Réserver' et vous serez notifié dès qu'il sera disponible.",
  },
  {
    question: "Puis-je lire un livre sans connexion Internet ?",
    answer: "Oui, vous pouvez télécharger les livres pour les lire hors ligne après les avoir empruntés.",
  },
  {
    question: "Y a-t-il une limite de temps pour emprunter un livre ?",
    answer: "Oui, chaque livre peut être emprunté pour une durée maximale de 30 jours.",
  },
  {
    question: "Puis-je lire des livres sur plusieurs appareils ?",
    answer: "Oui, vous pouvez lire vos livres sur plusieurs appareils, à condition d'utiliser le même compte.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 bg-gray-50">
      {/* Header des FAQ */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">Questions Fréquemment Posées</h2>
        <p className="text-gray-600 mt-2">Trouvez des réponses aux questions courantes sur notre bibliothèque en ligne.</p>
      </div>

      {/* Contenu des FAQ */}
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-none">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-left text-gray-800 font-medium focus:outline-none"
            >
              {faq.question}
              <ChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>

            {/* Réponse de la FAQ avec une animation fluide */}
            <motion.div
              initial={false}
              animate={{ height: openIndex === index ? "auto" : 0 }}
              className="overflow-hidden text-gray-600"
            >
              <p className="pb-4">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Illustration (optionnelle) */}
      <div className="mt-10">
        <Image src="/faq-image.svg" alt="Illustration des FAQ" width={300} height={300} />
      </div>
    </section>
  );
}
