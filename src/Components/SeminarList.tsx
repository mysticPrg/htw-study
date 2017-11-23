import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

import { Seminar } from '../Stores';
import SeminarCard from './SeminarCard';

interface Props {
	readonly seminars: Seminar[];
	readonly refresh: () => void;
	readonly onOpen: (id: number) => void;
	readonly onCloseAll: () => void;
}

const Styles = style.create({
	container: {
		padding: '10px',
	},

	list: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		padding: '0px',
		justifyContent: 'center',
	},
	
	listItem: {
		display: 'flex',
	}
});

class SeminarList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const cards = this.props.seminars.map((s, idx) => (
			<li key={idx} className={css(Styles.listItem)}>
				<SeminarCard
					id={s.id}
					title={s.title}
					content={s.content}
					author={s.author}
					isOpen={s.isOpen}
					onOpen={this.props.onOpen}
					onClose={this.props.onCloseAll}
				/>
			</li>
		));

		return (
			<div>
				<button onClick={this.props.refresh}>Refresh</button>
				<ol className={css(Styles.list)}>{cards}</ol>
			</div>
		);
	}
}

export default SeminarList;