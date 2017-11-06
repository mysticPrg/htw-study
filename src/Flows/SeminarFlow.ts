import { grab, push } from '../Utils';
import { loadSeminar } from '../Utils/fakeAPI';
import { SystemAction, SeminarAction } from '../Actions';

let lastIndex = 0;

async function seminarInit() {
	const { next } = await grab(SystemAction.init);
	next();
	
	const res = await loadSeminar();
	for ( let i = 0 ; i < res.body.length ; i++ ) {
		const seminarInfo = res.body[i];
		await push(SeminarAction.add.create({
			...seminarInfo,
			isOpen: false,
		}));
		lastIndex++;
	}
	
	push(SeminarAction.initDone.create());
}

async function handleSeminarRefresh() {
	while ( true ) {
		await grab(SeminarAction.refresh);
		await push(SeminarAction.add.create({
			id: lastIndex++,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`,
			isOpen: false,
		}));
	}
}

export default async function seminarFlow() {
	seminarInit();
	handleSeminarRefresh();
}