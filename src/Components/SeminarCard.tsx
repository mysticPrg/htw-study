import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

interface Props {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
	readonly isOpen: boolean;

	readonly onOpen: (id: number) => void;
	readonly onClose: () => void;
}

const Styles = style.create({
	base: {
		border: '1px solid black',
		width: '300px',
		height: '200px',
		margin: '10px',
		padding: '10px',
		transition: 'height 0.2s',
	},
	
	closed: {
	},
	
	opened: {
		height: '400px',
	}
});

class SeminarCard extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		this.onToggle = this.onToggle.bind(this);
	}

	render() {
		const divOpenStyle = this.props.isOpen ? Styles.opened : Styles.closed;
		const divStyle = css(Styles.base, divOpenStyle);
		
		return (
			<div className={divStyle} id={`${this.props.id}`} onClick={this.onToggle}>
				<p>title: {this.props.title}</p>
				<p>author: {this.props.author}</p>
				<p>contents: {this.props.content}</p>
			</div>
		);
	}

	private onToggle = () => {
		if ( !this.props.isOpen ) {
			this.props.onOpen(this.props.id);
		} else {
			this.props.onClose();
		}
	}
}

export default SeminarCard;
