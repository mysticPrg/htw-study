import { Dispatch, Middleware, MiddlewareAPI, Action } from 'redux';

export interface ActionFlow {
	(): Promise<void>;
}

export interface ActionFlowMiddleware extends Middleware {
	run(flow: ActionFlow): void;
}

interface Options {
	run?: boolean;
}

/* tslint:disable: no-any */

interface GrabResolveResult { 
	action: Action;
	next: Function;
}

interface GrabResolver {
	(result: GrabResolveResult): void;
}

const actionMap = new Map<any, GrabResolver[]>();

const mainFlow = async <S>(api: MiddlewareAPI<S>, next: Dispatch<S>, action: Action) => {
	if ( actionMap.has(action.type) ) {
		let resolveList = <GrabResolver[]> actionMap.get(action.type);
		resolveList.forEach(resolve => resolve({
			action,
			next: () => next(action)
		}));
	} else {
		next(action);
	}
};

const createActionFlow = (opt?: Options) => {
	const actionFlowMiddleware = <ActionFlowMiddleware> function<S>(api: MiddlewareAPI<S>) {
		return (next: Dispatch<S>) => (action: Action) => {
			mainFlow(api, next, action);
		};
	};

	actionFlowMiddleware.run = (flow: ActionFlow) => {
		console.log('start!');
		(async () => {
			await flow();
		})();
	};

	return actionFlowMiddleware;
};
export default createActionFlow;

export async function grab<AT>(actionType: AT) {
	const waitForAction = new Promise<GrabResolveResult>(resolve => {
		let resolveList: GrabResolver[];
		if ( actionMap.has(actionType) ) {
			resolveList = <GrabResolver[]> actionMap.get(actionType);
		} else {
			resolveList = [];
		}

		resolveList.push(resolve);

		actionMap.set(actionType, resolveList);
	});

	const result = await waitForAction;
	return result;
}

export async function push<A>(action: A) {
	return action;
}
