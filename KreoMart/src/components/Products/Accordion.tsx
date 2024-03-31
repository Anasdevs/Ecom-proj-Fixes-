import React, { useState } from 'react';
interface AccordionProps {
    title: string;
    content: React.ReactNode;
  }
  
  const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <details className="accordion-trigger block font-semibold" onClick={toggleAccordion}>
       <summary>{title}</summary>
      </details>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
