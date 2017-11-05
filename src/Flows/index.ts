import { grab, push } from '../Utils/ActionFlow';

import { SeminarAction } from '../Actions';

let lastIndex = 0;

export async function rootFlow() {
	while ( true ) {
		const { next } = await grab(SeminarAction.refresh.type);
		next();

		await push(SeminarAction.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`
		}));
	}
}