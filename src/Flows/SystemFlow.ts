import { grab, push, getState } from '../Utils';

import { SystemAction, SeminarAction } from '../Actions';

async function handleInitDone() {
	await grab(SeminarAction.initDone);
	
	await push(SystemAction.initDone.create());
}

async function handleHashChanged() {
	let lastHash = null;
	
	(async () => {
		let state;
		do {
			const { action } = await grab(SystemAction.hashChanged);
			lastHash = action.payload;
			state = await getState();
		} while ( !state.system.init );
	})();

	const { next: systemInit } = await grab(SystemAction.initDone);
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
	handleHashChanged();
}