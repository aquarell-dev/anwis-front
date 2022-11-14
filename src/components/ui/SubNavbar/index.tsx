import { FC } from 'react';

import { ISubNavElement } from './types';

import { Link, useLocation } from 'react-router-dom';

import { cn } from '../../../utils/index';

const SubNavbar: FC<{ elements: ISubNavElement[] }> = ({ elements }) => {
  const router = useLocation();

  return (
    <div className="w-11/12 mx-auto min-h-12 rounded-b-lg shadow-md bg-gray-100">
      <div className="w-full h-full flex flex-col lg:flex-row items-center px-4 py-2 space-x-4">
        {elements.map(({ link, title }, idx) => (
          <div
            className="px-2 cursor-pointer transition duration-300 ease-in-out rounded-md hover:bg-gray-200 py-1"
            key={idx}
          >
            <Link to={link}>
              <p
                className={cn(
                  router.pathname.includes(link)
                    ? 'underline underline-offset-2 underline-indigo-600'
                    : ''
                )}
              >
                {title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubNavbar;
