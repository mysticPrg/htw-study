import seminarFlow from './SeminarFlow';
import systemFlow from './SystemFlow';

export default async function rootFlow() {
	systemFlow();
	seminarFlow();
}