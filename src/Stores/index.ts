import { SeminarState } from './Seminar';
export * from './Seminar';

export default interface RootState {
	seminar: SeminarState;
}