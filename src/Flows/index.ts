import seminarFlow from './SeminarFlow';
import systemFlow from './SystemFlow';

export async function rootFlow() {
	systemFlow();
	seminarFlow();
}