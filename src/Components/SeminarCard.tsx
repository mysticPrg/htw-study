import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

interface Props {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
}

interface State {
	readonly isOpen: boolean;
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

class SeminarCard extends React.Component<Props, State> {

	readonly state: State = {
		isOpen: false
	};

	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<div className={css(Styles.normal)}>
				<p>{this.props.title}</p>
				<p>{this.props.author}</p>
				<button onClick={this.toggle}>{this.state.isOpen ? 'Close' : 'Open'}</button>
			</div>
		);
	}

	private toggle = () => {
		this.setState({
			...this.state,
			isOpen: !this.state.isOpen
		});
	}
}

export default SeminarCard;
