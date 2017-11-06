/* tslint:disable: no-any */
function addEventListenerPromise(target: any, event: string) {
	return new Promise((resolve, reject) => {
		function fn(...args: any[]) {
			target.removeEventListener(event, fn);
			resolve(...args);
		}
		target.addEventListener(event, fn);
	});
}
/* tslint:enable: no-any */

interface SeminarInfo {
	id: number;
	author: string;
	content: string;
	title: string;
}

async function getFromAPI(url: string) {
	const res = await fetch(url);
	const blob = await res.blob();

	const reader = new FileReader();
	const p = addEventListenerPromise(reader, 'loadend');
	reader.readAsText(blob);
	await p;

	return {
		body: <SeminarInfo[]> JSON.parse(reader.result),
		headers: res.headers,
		ok: res.ok,
		status: res.status,
		url: res.url
	};
}

const serverURL = 'https://my-json-server.typicode.com/mysticPrg/fakeAPI';

export const loadSeminar = async () => {
	return await getFromAPI(`${serverURL}/seminar`);
};