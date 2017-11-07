import { grab, push } from '../Utils';

import { SystemAction, SeminarAction } from '../Actions';

async function handleInitDone() {
	await grab(SeminarAction.initDone);
	
	await push(SystemAction.initDone.create());
}

async function openCard(hash: string) {
	await push(SeminarAction.closeAll.create());
	
	let ID = parseInt(hash, 10);
	if ( !isNaN(ID) ) {
		await push(SeminarAction.open.create(ID));
	}
}

async function handleHashChangedBeforeInit() {
	const { action } = await grab(SystemAction.hashChanged);
	const { next: systemInit } = await grab(SystemAction.initDone);
	systemInit();
	
	await openCard(action.payload);
}

async function handleHashChanged() {
	const { next: systemInit } = await grab(SystemAction.initDone);
	systemInit();

	while ( true ) {
		const { action } = await grab(SystemAction.hashChanged);
		await openCard(action.payload);
	}
}

export default async function systemFlow() {
	handleInitDone();
	handleHashChangedBeforeInit();
	handleHashChanged();
}