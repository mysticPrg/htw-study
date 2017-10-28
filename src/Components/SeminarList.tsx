import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

import { Seminar } from '../Stores';
import SeminarCard from './SeminarCard';

interface Props {
	readonly seminars: Seminar[];
}

const Styles = style.create({
	normal: {}
});

class SeminarList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const cards = this.props.seminars.map((s, idx) => (
			<li key={idx}>
				<SeminarCard
					id={s.id}
					title={s.title}
					content={s.content}
					author={s.author}
				/>
			</li>
		));

		return (
			<div className={css(Styles.normal)}>
				<ol>{cards}</ol>
			</div>
		);
	}
}

export default SeminarList;