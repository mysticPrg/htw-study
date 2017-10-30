import { SeminarState } from './Seminar';
import { SystemState } from './System';
export * from './Seminar';
export * from './System';

export default interface RootState {
	seminar: SeminarState;
	system: SystemState;
}