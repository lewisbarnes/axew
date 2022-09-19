import { useRouter } from 'next/router';
import { useState } from 'react';

const PasteForm: React.FC<{ slug?: string; mode: string }> = ({ slug, mode }) => {
  const host = window.location.origin;
  const [pasteValue, setPasteValue] = useState('');
  const router = useRouter();

  const fetchPaste = async () => {
    const paste = await fetch(`${host}/api/paste/get/${slug}`);
    const data = await paste.json();
    if (data.message) {
      setPasteValue(data.message);
    } else if (data.content) {
      setPasteValue(data.content);
    }
  };

  const createPaste = async () => {
    const paste = await fetch(`${host}/api/paste/create`, {
      method: 'POST',
      body: JSON.stringify({ content: pasteValue }),
    });
    const data = await paste.json();
    if (data.pasteURL) {
      router.push(data.pasteURL);
    }
  };

  if (mode === 'view') {
    fetchPaste();
  }
  return (
    <form className="mx-auto w-full md:w-4/5 lg:w-6/8 xl:w-4/5">
      <textarea
        className="w-full h-[40rem] bg-[#313131] border-2 rounded-md text-white focus:outline-none p-3 overflow-auto font-mono"
        value={pasteValue}
        disabled={mode === 'view'}
        onChange={(e) => setPasteValue(e.target.value)}
      ></textarea>
      {mode === 'view' ? (
        <div className="flex gap-3 justify-center">
          <div className="bg-[#a6ae89] px-3 rounded-md text-black w-max py-1">
            <a href={`${host}/paste/${slug}/raw`} download={`${slug}.axewpaste`} target="_blank">
							download
            </a>
          </div>
          <div className="bg-[#a6ae89] px-3 rounded-md text-black w-max py-1">
            <a href={`${host}/paste/${slug}/raw`} target="_blank">
              raw
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-[#a6ae89] px-3 rounded-md text-black mx-auto w-max">
          <input type="button" value="create" onClick={() => createPaste()} />
        </div>
      )}
    </form>
  );
};
export default PasteForm;
