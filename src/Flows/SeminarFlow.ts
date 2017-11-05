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
			content: `content${lastIndex}`,
			isOpen: false,
		}));
	}

	push(SeminarAction.initDone.create());
}

async function handleSeminarRefresh() {
	while ( true ) {
		await grab(SeminarAction.refresh);
		await push(SeminarAction.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`,
			isOpen: false,
		}));
	}
}

export default async function seminarFlow() {
	fakeInit();
	handleSeminarRefresh();
}