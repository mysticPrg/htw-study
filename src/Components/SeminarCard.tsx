import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

const barImg = require('../Resources/bar.png');

interface Props {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
	readonly isOpen: boolean;

	readonly onOpen: (id: number) => void;
	readonly onClose: () => void;
}

const Styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		boxShadow: '0 5px 15px 0 #0000002b',
		width: '300px',
		height: '200px',
		margin: '25px',
		position: 'relative',
		top: '0px',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		transition: 'height 0.2s, background-color 0.2s, outline 0.2s, top 0.2s, position 0.2s',
	},
	
	container_opened: {
		top: '5px',
		boxShadow: 'none',
		backgroundColor: '#ced9f3',		
	},

	innerBox: {
		width: '280px',
		padding: '10px',
	},

	colorBar: {
		height: '20px',
		width: '100%',
		backgroundColor: '#765f67',
		backgroundImage: `url(${barImg})`,
		transition: 'background-image 0.2s',
	},

	colorBar_opened: {
		backgroundImage: 'none',
	}
});

class SeminarCard extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		this.onToggle = this.onToggle.bind(this);
	}

	render() {
		let containerStyle, barStyle;
		if ( this.props.isOpen ) {
			containerStyle = css(Styles.container, Styles.container_opened);
			barStyle = css(Styles.colorBar, Styles.colorBar_opened);
		} else {
			containerStyle = css(Styles.container);
			barStyle = css(Styles.colorBar);
		}
		
		return (
			<div className={containerStyle} onClick={this.onToggle} onAnimationEndCapture={e => console.log(e)}>
				<div className={barStyle}/>
				<div className={css(Styles.innerBox)}>
					<h2>{this.props.title}</h2>
					<p>{this.props.author}</p>
				</div>
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
