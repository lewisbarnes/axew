import { nanoid } from 'nanoid';
import { useState } from 'react';

type Form = {
  slug: string;
  url: string;
};

const CreateLinkForm: React.FC = () => {
  const [form, setForm] = useState<Form>({ slug: '', url: '' });
  const [returnShortLink, setReturnShortLink] = useState('');
  const host = window.location.origin;

  const createSlug = async () => {
    const slugResponse = await fetch(`${host}/api/url/create`, {
      method: 'POST',
      body: JSON.stringify(form),
    });
    const respMessage = await slugResponse.json();
    if (slugResponse.status === 400) {
      setReturnShortLink(respMessage.message);
    } else {
      setReturnShortLink(`${host}/s/${respMessage.slug}`);
      setForm({ slug: '', url: '' });
    }
  };

  return (
    <form className="flex flex-col gap-3 mx-auto bg-[#404040] text-white rounded-md p-3 w-full md:w-4/5 lg:w-6/8 xl:w-1/2">
      <div className="flex gap-2 flex-wrap">
        <label htmlFor="slug">{host}/s/</label>
        <input
          className="bg-[#404040] border-2 pl-3 rounded-md flex-grow"
          type="text"
          name="slug"
          value={form.slug}
          placeholder="Hitmonchan"
          onChange={(e) => {
            setForm({ ...form, slug: e.target.value });
          }}
          autoComplete="off"
        />
        <input
          className="bg-[#a6ae89] px-3 rounded-md text-black"
          type="button"
          value="random"
          onClick={(e) => {
            setForm({ ...form, slug: nanoid(10) });
          }}
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <label htmlFor="url" className="text-right">
          url
        </label>
        <input
          className="bg-[#404040] border-2 pl-3 rounded-md flex-grow"
          type="text"
          name="url"
          placeholder="https://lewisbarnes.dev/"
          value={form.url}
          onChange={(e) => {
            setForm({ ...form, url: e.target.value });
          }}
          autoComplete="off"
        />
      </div>
      {returnShortLink.length > 0 ? (
        <div className="flex gap-3 flex-wrap">
          <label htmlFor="shortlink" className="col-start-1 text-right">
            short-link
          </label>
          <input
            type="text"
            name="shortlink"
            className="col-start-2 bg-[#404040] border-2 pl-3 rounded-md flex-grow "
            value={returnShortLink}
            autoComplete="off"
          />
        </div>
      ) : (
        ''
      )}
      <input
        type="button"
        className="bg-[#a6ae89] px-3 rounded-md text-black self-center"
        value="create"
        onClick={createSlug}
      />
    </form>
  );
};

export default CreateLinkForm;
