import React, { ReactNode } from 'react';

interface MainSectionProps {
  children?: ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ children }) => {
  return (
    <div className='z-10 w-[45%] min-w-[320px] flex flex-col gap-3 mt-[55px] pt-3 max-w-[750px]'>
      {children}
    </div>
  );
}

export default MainSection;