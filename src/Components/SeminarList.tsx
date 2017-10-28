import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

import { Seminar } from '../Stores';
import SeminarCard from './SeminarCard';

interface Props {
	readonly seminars: Seminar[];
	readonly refresh: () => void;
}

const Styles = style.create({
	list: {
		display: 'block'
	}
});

class SeminarList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const cards = this.props.seminars.map((s, idx) => (
			<li key={idx} className={css(Styles.list)}>
				<SeminarCard
					id={s.id}
					title={s.title}
					content={s.content}
					author={s.author}
				/>
			</li>
		));

		return (
			<div>
				<button onClick={this.props.refresh}>Refresh</button>
				<ol>{cards}</ol>
			</div>
		);
	}
}

export default SeminarList;