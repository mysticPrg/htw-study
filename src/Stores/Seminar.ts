export interface Seminar {
	id: number;
	title: string;
	content: string;
	author: string;
	isOpen: boolean;
}

export interface SeminarState {
	seminars: Seminar[];
	openCardID: number;
	showList: Seminar[];
}

export const seminarInitialState: SeminarState = {
	seminars: [],
	openCardID: NaN,
	showList: [],
};
