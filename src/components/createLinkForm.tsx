import { nanoid } from 'nanoid';
import { useState } from 'react';

type Form = {
	slug: string;
	url: string;
};

const createLinkForm = () => {
	const [form, setForm] = useState<Form>({ slug: '', url: '' });
	const [returnShortLink, setReturnShortLink] = useState('');
	const host = window.location.origin;

	const createSlug = async () => {
		console.log(`${host}/api/url/create`);
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
	if(returnShortLink.length == 0) {
		return (
			<form className="input-form">
				<label htmlFor="slug">{host}/s/</label>
				<input
					type="text"
					name="slug"
					value={form.slug}
					placeholder="Hitmonchan"
					onChange={(e) => {
						setForm({ ...form, slug: e.target.value });
					}}
				/>
				<input
					className="button"
					type="button"
					value="random"
					onClick={(e) => {
						setForm({ ...form, slug: nanoid(10) });
					}}
				/>
				<label htmlFor="url">url</label>
				<input
					type="text"
					name="url"
					placeholder="https://lewisbarnes.dev/"
					value={form.url}
					onChange={(e) => {
						setForm({ ...form, url: e.target.value });
					}}
				/>
				<input type="button" className="submit-button" value="create" onClick={createSlug} />
			</form>
		);
	}

	return (
		<form className="input-form">
			<label htmlFor="slug">{host}/s/</label>
			<input
				type="text"
				name="slug"
				value={form.slug}
				placeholder="Hitmonchan"
				onChange={(e) => {
					setForm({ ...form, slug: e.target.value });
				}}
			/>
			<input
				className="button"
				type="button"
				value="random"
				onClick={(e) => {
					setForm({ ...form, slug: nanoid(10) });
				}}
			/>
			<label htmlFor="url">url</label>
			<input
				type="text"
				name="url"
				placeholder="https://lewisbarnesss.dev/"
				value={form.url}
				onChange={(e) => {
					setForm({ ...form, url: e.target.value });
				}}
			/>
			<label htmlFor="shortlink">short-link</label>
				<input
				type="text"
				name="shortlink"
				value={returnShortLink}
			/>
			<input type="button" className="submit-button" value="create" onClick={createSlug} />
		</form>
	);

};

export default createLinkForm;
