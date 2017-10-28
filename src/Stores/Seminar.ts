export interface Seminar {
	id: number;
	title: string;
	content: string;
	author: string;
}

export interface SeminarState {
	seminars: Seminar[];
}