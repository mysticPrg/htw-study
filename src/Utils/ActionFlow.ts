import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

export interface ActionFlow {
	(): Promise<void>;
}

export interface ActionFlowMiddleware extends Middleware {
	run(flow: ActionFlow): void;
}

interface Options {
	run?: boolean;
}

class AsyncQueue<T> {
	list: T[] = [];
	private lock: Promise<void>;
	private key: Function;
	
	constructor() {
		this.makeKey();
	}

	enque(item: T) {
		this.list.push(item);
		const prevKey = this.makeKey();
		prevKey();
	}

	async deque(): Promise<T> {
		await this.lock;
		return <T> this.list.shift();
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
	(result: GrabResolveResult): void;
}

const grabMap = new Map<any, GrabResolver[]>();
const grabFlow = async <S>(api: MiddlewareAPI<S>, next: Dispatch<S>, action: any) => {
	if ( grabMap.has(action.type) ) {
		let resolveList = <GrabResolver[]> grabMap.get(action.type);
		let nextDone = false;
		resolveList.forEach(resolve => resolve({
			action,
			next: () => {
				if ( !nextDone ) {
					nextDone = true;
					next(action);
				}
			}
		}));
	} else {
		next(action);
	}
};

interface PushResolver {
	action: any;
	resolve: Function;
}

const pushQueue = new AsyncQueue<PushResolver>();
const pushFlow = async <S>(api: MiddlewareAPI<S>) => {
	while ( true ) {
		const resolver = await pushQueue.deque();
		api.dispatch(resolver.action);
		resolver.resolve();
	}
};

const createActionFlow = (opt?: Options) => {
	const actionFlowMiddleware = <ActionFlowMiddleware> function<S>(api: MiddlewareAPI<S>) {
		pushFlow(api);

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

export async function push(action: any) {
	await new Promise<void>(resolve => {
		pushQueue.enque({action, resolve});
	});
}
