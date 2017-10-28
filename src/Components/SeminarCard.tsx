import * as React from 'react';
import { StyleSheet as style, css } from 'aphrodite';

interface Props {
	// readonly key: number;
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
}

interface State {
	readonly isOpen: boolean;
}

const Styles = style.create({
	normal: {
		color: 'blue',
		':hover': {
			color: 'red'
		}
	},
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