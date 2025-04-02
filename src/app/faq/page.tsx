"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How many team members can I invite?",
    answer: "You can invite up to 10 team members per subscription.",
  },
  {
    question: "What is the maximum file upload size?",
    answer: "The maximum file upload size is 2GB.",
  },
  {
    question: "How do I reset my password?",
    answer: "Go to settings and click on 'Reset Password'.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime in your account settings.",
  },
  {
    question: "Do you provide additional support?",
    answer: "Yes, we offer 24/7 support for all premium users.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 bg-gray-50">
      {/* FAQ Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">Find answers to common questions.</p>
      </div>

      {/* FAQ Content */}
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

            {/* FAQ Answer with smooth animation */}
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

      {/* Illustration (Optional) */}
      <div className="mt-10">
        <Image src="/faq-image.svg" alt="FAQ Illustration" width={300} height={300} />
      </div>
    </section>
  );
}
