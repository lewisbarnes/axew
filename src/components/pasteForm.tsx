import { useRouter } from "next/router";
import { useState } from "react";

const PasteForm : React.FC<{slug?: string; mode: string}> = ({slug, mode}) => {

	const host = window.location.origin;
	const [pasteValue, setPasteValue] = useState('');
	const router = useRouter();

	const fetchPaste = async () => {
		const paste = await fetch(`${host}/api/paste/get/${slug}`);
		const data = await paste.json();
		if(data.message) {
			setPasteValue(data.message);
		} else if(data.content) {
			setPasteValue(data.content);
		}
	}

	const createPaste = async() => {
		const paste = await fetch(`${host}/api/paste/create`,{method:'POST', body: JSON.stringify({content: pasteValue})});
		const data = await paste.json();
		if(data.pasteURL) {
			router.push(data.pasteURL);
		}
	}

	if(mode === 'view') {
		fetchPaste();
	}

	if(mode === 'view') {
			return (
				<form className="center-container">
					<textarea className="paste-area" value={pasteValue} disabled={true}></textarea>
					<a href={`${host}/paste/${slug}/raw`} className="button centered">view raw</a>
				</form>
			);
	} else if(mode === 'create') {
		return (
			<form className="center-container">
				<textarea className="paste-area" value={pasteValue} onChange={(e) => setPasteValue(e.target.value)}></textarea>
				<input type="button" value="create" className="button centered" onClick={() => createPaste()}/>
			</form>
		);
	}
	return (
		<form className="center-container">
			<textarea className="paste-area" value={slug} disabled={mode === 'view'}></textarea>
		</form>
	);
}
export default PasteForm;