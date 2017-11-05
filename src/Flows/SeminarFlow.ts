import { grab, push } from '../Utils';

import { SystemAction, SeminarAction } from '../Actions';

let lastIndex = 0;

async function fakeInit() {
	const { next } = await grab(SystemAction.init);
	next();
	
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

async function handleSeminarCloseAndOpen() {
	while ( true ) {
		const { action } = await grab(SeminarAction.closeAndOpen);
		await push(SeminarAction.closeAll.create());
		await push(SeminarAction.open.create(action.payload));
	}
}

async function handleSeminarRefresh() {
	while ( true ) {
		await grab(SeminarAction.refresh);
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
	handleSeminarCloseAndOpen();
	handleSeminarRefresh();
}