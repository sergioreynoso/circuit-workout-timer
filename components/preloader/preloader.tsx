import React from 'react';

const Preloader = ({ label = 'preloader' }: { label: string }) => {
  return <div className="flex justify-center p-6 align-middle h-28">{label}</div>;
};

export default Preloader;
