import { grab, push } from '../Utils';

import { SystemAction, SeminarAction } from '../Actions';

async function handleInitDone() {
	await grab(SeminarAction.initDone);
	await push(SystemAction.initDone.create());
	
	const url = 'https://my-json-server.typicode.com/mysticPrg/fakeAPI/seminar';
	const res = await fetch(url);
	if ( res.ok ) {
		const blob = await res.blob();
		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			console.log(reader.result);
		});
		reader.readAsText(blob);
	}
}

async function handleHashChangeRequest() {
	while ( true ) {
		const { action } = await grab(SystemAction.hashChangeRequest);
		window.location.hash = `#${action.payload}`;
	}
}

async function handleHashChanged() {
	let isInitDone = false;
	let lastHash = null;
	(async () => {
		while ( !isInitDone ) {
			const { action } = await grab(SystemAction.hashChanged);
			lastHash = action.payload;
		}
	})();

	const { next: systemInit } = await grab(SystemAction.initDone);
	isInitDone = false;
	systemInit();

	function openCard(hash: string) {
		push(SeminarAction.closeAll.create());

		let ID = Number.parseInt(hash);
		if ( !Number.isNaN(ID) ) {
			push(SeminarAction.open.create(ID));
		}
	}

	if ( lastHash ) {
		openCard(lastHash);
	}

	while ( true ) {
		const { action } = await grab(SystemAction.hashChanged);
		openCard(action.payload);
	}
}

export default async function systemFlow() {
	handleInitDone();
	handleHashChangeRequest();
	handleHashChanged();
}