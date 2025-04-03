"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FAQDataSchema } from "@/data/dataFetchUtil";

const faqs = [
  { question: "How many team members can I invite?", answer: "You can invite up to 10 team members per subscription." },
  { question: "What is the maximum file upload size?", answer: "The maximum file upload size is 2GB." },
  { question: "How do I reset my password?", answer: "Go to settings and click on 'Reset Password'." },
  { question: "Can I cancel my subscription?", answer: "Yes, you can cancel anytime in your account settings." },
  { question: "Do you provide additional support?", answer: "Yes, we offer 24/7 support for all premium users." },
];

import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
} from "@mui/material";

type Props = {
  faqList: FAQDataSchema;
};

// dividers are created using pseudo element ":before"

const FAQ = ({ faqList }: Props) => {
  const [expanded, setExpanded] = useState<string | false>("faq-2");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const generateAccordions = () => {
    return faqList.map((faqs) => (
      <React.Fragment key={faqs.params.id}>
        <Accordion
          expanded={expanded === faqs.params.id}
          onChange={handleChange(faqs.params.id)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreRounded style={{ color: "hsl(14, 88%, 65%)" }} />
            }
          >
            <Typography>{faqs.params.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography id="answer">{faqs.params.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    ));
  };

  return (
    <Container disableGutters component={"section"} id="faq-accordion">
      <Typography variant="h1">FAQ</Typography>
      {generateAccordions()}
    </Container>
  );
};

export default FAQ;
