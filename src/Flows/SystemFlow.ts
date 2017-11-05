import { grab, push } from '../Utils';

import { SystemAction, SeminarAction } from '../Actions';

async function handleInitDone() {
	await grab(SeminarAction.initDone);
	await push(SystemAction.initDone.create());
}

async function handleHashChanged() {
	const { action: firstAction, next: nextForFirstHashchanged } = await grab(SystemAction.hashChanged);
	const { next: nextForInitDone } = await grab(SystemAction.initDone);
	nextForInitDone();
	nextForFirstHashchanged();

	let ID = Number.parseInt(firstAction.payload);
	push(SeminarAction.closeAndOpen.create(ID));

	while ( true ) {
		const { action, next } = await grab(SystemAction.hashChanged);
		ID = Number.parseInt(action.payload);
		push(SeminarAction.closeAndOpen.create(ID));
		next();
	}
}

export default async function systemFlow() {
	handleInitDone();
	handleHashChanged();
}