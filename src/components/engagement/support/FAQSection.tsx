import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What is school structure standardization?',
      answer: 'School structure standardization is the process of aligning educational institutions with standard categories defined by the Ministry of Education under the UDISE+ portal. This includes organizing grade levels, infrastructure, and resources according to established guidelines.',
      category: 'general'
    },
    {
      id: '2',
      question: 'How long does the standardization process take?',
      answer: 'The duration varies depending on the current structure and resources available. Typically, the process takes 6-12 months, including assessment, planning, and implementation phases.',
      category: 'process'
    },
    {
      id: '3',
      question: 'What support is available during transition?',
      answer: 'Schools receive comprehensive support including guidance documents, training sessions, resource allocation assistance, and access to expert consultations. Our platform provides tools and resources to facilitate the transition.',
      category: 'support'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-md">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openId === faq.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openId === faq.id && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}