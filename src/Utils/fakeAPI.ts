import { Seminar } from '../Stores';

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

async function getFromAPI(url: string) {
	const res = await fetch(url);
	const blob = await res.blob();

	const reader = new FileReader();
	const p = addEventListenerPromise(reader, 'loadend');
	reader.readAsText(blob);
	await p;

	return {
		body: JSON.parse(reader.result),
		headers: res.headers,
		ok: res.ok,
		status: res.status,
		url: res.url
	};
}

const serverURL = 'https://my-json-server.typicode.com/mysticPrg/fakeAPI';

export const loadSeminar = async () => {
	const res = await getFromAPI(`${serverURL}/seminar`);
	return <Seminar[]> res.body.map((data: Seminar) => ({
		...data,
		isOpen: false
	}));
};