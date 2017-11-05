import { grab, push } from '../Utils/ActionFlow';

import { SeminarAction } from '../Actions';

let lastIndex = 0;

export async function rootFlow() {
	while ( true ) {
		// await grab(SeminarAction.refresh.type);
		const {action, next} = await grab(SeminarAction.refresh.type);
		console.log(action, next);
		// next();

		await push(SeminarAction.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`
		}));
	}
}