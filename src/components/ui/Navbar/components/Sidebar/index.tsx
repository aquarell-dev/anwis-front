import { FC } from 'react';
import { SetState } from '../../../../../utils/types';
import { links } from '../../links';
import { Link } from 'react-router-dom';

type SideBarProps = { open: boolean, setOpen: SetState<boolean> };

const Sidebar: FC<SideBarProps> = ({ open, setOpen }) => {

  if (!open) return <></>;

  return (
    <div className='w-full z-[1001] sm:w-1/3 xl:w-1/4 min-h-screen top-0 right-0 fixed bg-slate-100'>
      <div
        className="absolute top-0 right-0 m-4"
        onClick={() => setOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 hover:text-slate-600 duration-300 transition ease-in-out cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="blur"/>
      <div className="flex items-center flex-col my-20">
        <h1 className='text-2xl font-medium'>Anwis Dashboard</h1>
        <div className="mt-4">
          {links.map(link => (
            <Link to={link.link} key={link.id}>
              <p className='text-slate-800 hover:text-slate-600 hover:underline transition duration-300 ease-in-out'>
                {link.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;