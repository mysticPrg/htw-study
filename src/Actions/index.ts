export * from './SeminarAction';
export * from './SystemAction';

export interface Action {
	type: string;
	payload: Object;
}
