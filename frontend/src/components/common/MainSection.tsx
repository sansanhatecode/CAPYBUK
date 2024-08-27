import React, { ReactNode } from 'react';

interface MainSectionProps {
  children?: ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ children }) => {
  return (
    <div className='z-10 min-h-[100vh] w-[50%] bg-[#ffffffc9] min-w-[320px]'>
      {children}
    </div>
  );
}

export default MainSection;