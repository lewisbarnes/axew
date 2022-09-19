import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="bg-[#404040] text-white p-2 flex gap-3 -mb-3 -mx-3 justify-start items-center">
      <Link href="/">home</Link>
      <Link href="/paste">paste</Link>
      <div className="flex-grow"></div>
      <a href="https://create.t3.gg/" target="_blank" rel="noreferrer" className='flex gap-1 items-center bg-[#313131] p-1 rounded-md text-sm hover:bg-zinc-800'>
        <img src="https://create.t3.gg/favicon.svg" className='h-6 rounded-md greyscale'></img>Powered by T3 Stack
      </a>
    </div>
  );
};

export default Footer;
