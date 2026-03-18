import React from 'react';

const WhiteSection = ({ title, children }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      { title && <h2 className="text-2xl font-bold mb-4 ">{title}</h2> }
      {children}
    </section>
  )
};

export default WhiteSection;