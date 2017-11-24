import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

import { Seminar } from '../Stores';
import SeminarCard from './SeminarCard';
import SeminarBoard from './SeminarBoard';

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

		const openedCard = this.props.seminars.filter(seminar => seminar.isOpen)[0];
		let openedCardElm;
		if ( openedCard ) {
			openedCardElm = (
				<SeminarBoard
					id={openedCard.id}
					title={openedCard.title}
					author={openedCard.author}
					content={openedCard.content}
					isOpen={openedCard.isOpen}
				/>
			);
		}

		return (
			<div>
				{/* <button onClick={this.props.refresh}>Refresh</button> */}
				<ol className={css(Styles.list)}>{cards}</ol>
				{openedCardElm}
			</div>
		);
	}
}

export default SeminarList;