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

const colorKeyframes = {
	'0%': {
		paddingLeft: 0,
	},

	'100%': {
		color: 'red',
		paddingLeft: '10px',
	}
};

const colorKeyframesBack = {
	'100%': {
		paddingLeft: 0,
	},

	'0%': {
		color: 'red',
		paddingLeft: '10px',
	}
};

const Styles = style.create({
	normal: {
		color: 'blue',
		animationName: colorKeyframesBack,
		animationDuration: '0.2s',
		animationFillMode: 'forwards',
		':hover': {
			animationName: colorKeyframes,
			animationDuration: '0.2s',
			animationFillMode: 'forwards',
		},
	}
});

class SeminarCard extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		this.onToggle = this.onToggle.bind(this);
	}

	render() {
		return (
			<div className={css(Styles.normal)} id={`${this.props.id}`}>
				<p>title: {this.props.title}</p>
				<p>author: {this.props.author}</p>
				<p>contents: {this.props.content}</p>
				<button onClick={this.onToggle}>{this.props.isOpen ? 'Close' : 'Open'}</button>
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
