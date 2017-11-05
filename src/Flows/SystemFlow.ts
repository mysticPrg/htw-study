import { grab, push } from '../Utils/ActionFlow';

import { SystemAction, SeminarAction } from '../Actions';

async function handleInitDone() {
	await grab(SeminarAction.initDone.type);
	await push(SystemAction.initDone.create());
}

async function handleHashChanged() {
	while ( true ) {
		const { next: nextForHashchanged } = await grab(SystemAction.hashChanged.type);
		const { next: nextForInitDone } = await grab(SystemAction.initDone.type);
		
		nextForInitDone();
		nextForHashchanged();
	}
}

export default async function systemFlow() {
	handleInitDone();
	handleHashChanged();
}