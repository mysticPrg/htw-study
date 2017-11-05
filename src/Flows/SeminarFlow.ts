import { grab, push } from '../Utils/ActionFlow';

import { SystemAction, SeminarAction } from '../Actions';

let lastIndex = 0;

async function fakeInit() {
	const { next: nextForInit } = await grab(SystemAction.init.type);
	nextForInit();
	
	for ( let i = 0 ; i < 5 ; i++ ) {
		await push(SeminarAction.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`
		}));
	}

	push(SeminarAction.initDone.create());
}

async function handleSeminarRefresh() {
	while ( true ) {
		await grab(SeminarAction.refresh.type);
		await push(SeminarAction.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`
		}));
	}
}

export default async function seminarFlow() {
	fakeInit();
	handleSeminarRefresh();
}