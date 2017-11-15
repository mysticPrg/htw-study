import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

interface ActionFlow {
	(): Promise<void>;
}

interface ActionFlowMiddleware extends Middleware {
	run(flow: ActionFlow): void;
}

interface Options {
}

function isIE() {
	return (navigator.userAgent.search('Trident') !== -1);
}

const sleep = async (time: Number) => {
	await new Promise(resolve => setTimeout(resolve, time));
};

interface Queue<T> {
	enque(item: T): Promise<void>;
	deque(): Promise<T>;
	isEmpty(): boolean;
}

class SyncQueue<T> implements Queue<T> {
	private list: T[] = [];
	
	isEmpty() {
		return (this.list.length === 0);
	}
	
	async enque(item: T) {
		this.list.push(item);
	}
	
	async deque() {
		return <T> this.list.shift();
	}
}

export class AsyncQueue<T> implements Queue<T> {
	private list: T[] = [];
	private lock: Promise<void>;
	private key: Function;
	
	constructor() {
		this.makeKey();
	}
	
	isEmpty() {
		return (this.list.length === 0);
	}

	async enque(item: T) {
		await new Promise(resolve => setTimeout(resolve, 0));
		this.list.push(item);
		const prevKey = this.makeKey();
		prevKey();
	}

	async deque(): Promise<T> {
		await this.lock;
		return <T> this.list.shift();
	}
	
	clean(): void {
		this.list = [];
	}

	private makeKey() {
		const prevKey = this.key;
		this.lock = new Promise(resolve => { this.key = resolve; });
		return prevKey;
	}
}

/* tslint:disable: no-any */
interface GrabResolveResult { 
	action: any;
	next: Function;
}

interface GrabResolver {
	(result?: GrabResolveResult): void;
}

const grabMap = new Map<any, GrabResolver[]>();
const grabFlow = async <S>(api: MiddlewareAPI<S>, next: Dispatch<S>, action: any) => {
	if ( grabMap.has(action.type) ) {
		let resolveList = <GrabResolver[]> grabMap.get(action.type);
		let nextDone = false;

		let resolve = resolveList.shift();
		while ( resolve ) {
			resolve({
				action,
				next: () => {
					if ( !nextDone ) {
						nextDone = true;
						next(action);
					}
				}
			});
			resolve = resolveList.shift();
		}
	} else {
		next(action);
	}
};

interface PushResolver {
	action: any;
	resolve: Function;
}

// const pushQueue: Queue<T> = new AsyncQueue<PushResolver>();
// const pushFlow = async <S>(api: MiddlewareAPI<S>) => {
// 	while ( true ) {
// 		const resolver = await pushQueue.deque();
// 		api.dispatch(resolver.action);
// 		resolver.resolve();
// 	}
// };

let pushQueue: Queue<PushResolver>;
let pushFlow: <S>(api: MiddlewareAPI<S>) => Promise<void>;

if ( isIE() ) {
	pushQueue = new SyncQueue<PushResolver>();
	pushFlow = async <S>(api: MiddlewareAPI<S>) => {
		while ( true ) {
			while ( !pushQueue.isEmpty() ) {
				const resolver = await pushQueue.deque();
				api.dispatch(resolver.action);
				resolver.resolve();
				console.log(resolver.action);
			}
			await sleep(33);
		}
	};
} else {
	pushQueue = new AsyncQueue<PushResolver>();
	pushFlow = async <S>(api: MiddlewareAPI<S>) => {
		while ( true ) {
			const resolver = await pushQueue.deque();
			api.dispatch(resolver.action);
			resolver.resolve();
		}
	};
}

let getStateFn: Function;

const createActionFlow = (opt?: Options) => {
	const actionFlowMiddleware = <ActionFlowMiddleware> function<S>(api: MiddlewareAPI<S>) {
		pushFlow(api);
		getStateFn = api.getState;

		return (next: Dispatch<S>) => (action: any) => {
			grabFlow(api, next, action);
		};
	};

	actionFlowMiddleware.run = (flow: ActionFlow) => {
		(async () => {
			await flow();
		})();
	};

	return actionFlowMiddleware;
};
export default createActionFlow;

export async function grab<AT>(actionType: AT) {
	const waitForResolve = new Promise<GrabResolveResult>(resolve => {
		let resolveList: GrabResolver[];
		if ( grabMap.has(actionType) ) {
			resolveList = <GrabResolver[]> grabMap.get(actionType);
		} else {
			resolveList = [];
		}
		resolveList.push(resolve);

		grabMap.set(actionType, resolveList);
	});

	return await waitForResolve;
}

// export async function race<AT>(...actionTypes: AT[]) {
// 	const raceResolves: {type: AT, resolve: GrabResolver}[] = [];

// 	const promises = actionTypes.map(actionType => new Promise<GrabResolveResult>(resolve => {
// 		let resolveList: GrabResolver[];
// 		if ( grabMap.has(actionType) ) {
// 			resolveList = <GrabResolver[]> grabMap.get(actionType);
// 		} else {
// 			resolveList = [];
// 		}
// 		resolveList.push(resolve);
// 		raceResolves.push({
// 			type: actionType,
// 			resolve
// 		});

// 		grabMap.set(actionType, resolveList);
// 	}));

// 	const result = await Promise.race(promises);
// 	raceResolves.forEach(useless => {
// 		const grabs = grabMap.get(useless.type);
// 		if ( grabs ) {
// 			const idx = grabs.indexOf(useless.resolve);
// 			grabs.splice(idx, 1);
// 			grabMap.set(useless.type, grabs);
// 		}
// 	});
// 	return result;
// }

export async function push(action: any) {
	await new Promise<void>(resolve => pushQueue.enque({action, resolve}) );
}

export async function getState() {
	return getStateFn();
}