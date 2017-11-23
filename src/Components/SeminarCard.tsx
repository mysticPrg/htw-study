import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface Props {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
	readonly isOpen: boolean;

	readonly onOpen: (id: number) => void;
	readonly onClose: () => void;
}

interface State {
	height: number;
}

const Styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		boxShadow: '0 5px 15px 0 #0000002b',
		width: '300px',
		height: '200px',
		margin: '10px',
		position: 'relative',
		top: '0px',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		transition: 'height 0.2s, background-color 0.2s, outline 0.2s, top 0.2s, position 0.2s',
	},
	
	container_opened: {
		height: '400px',
		top: '5px',
		boxShadow: 'none',
		// backgroundColor: '#ffe000',
		backgroundColor: '#e4e4e4',
		// backgroundColor: '#5757ff',
		// outline: '1px solid black',
	},

	innerBox: {
		width: '100%',
		padding: '10px',
	},

	colorBar: {
		height: '20px',
		width: '100%',
		backgroundColor: '#5757ff',
	}
});

const contentStyles = StyleSheet.create({
	base: {
		position: 'absolute',
		outline: '1px solid black',
		left: 0,
		top: 0,
		display: 'none',
	},

	opened: {
		display: 'none',
	},
});

class SeminarCard extends React.Component<Props, State> {
	content: HTMLDivElement|null;
	state: State = {
		height: 0
	};

	constructor(props: Props) {
		super(props);

		this.onToggle = this.onToggle.bind(this);
	}

	componentDidUpdate() {
		if (this.content) {
			const rc = this.content.getClientRects();
			if (rc.length && this.state.height === 0 ) {
				this.setState({
					...this.state,
					// height: 200 + rc[0].height,
					height: 800,
				});
			}
		}
	}
	
	render() {
		let containerStyle, contentStyle;
		// const calced = StyleSheet.create({ get: {height: `${this.state.height}px`} });
		const calced = StyleSheet.create({ get: {height: `200px`} });

		if ( this.props.isOpen ) {
			containerStyle = css(Styles.container, Styles.container_opened, calced.get);
			contentStyle = css(contentStyles.base, contentStyles.opened);
		} else {
			containerStyle = css(Styles.container);
			contentStyle = css(contentStyles.base);
		}
		
		return (
			<div className={containerStyle} onClick={this.onToggle} onAnimationEndCapture={e => console.log(e)}>
				<div className={css(Styles.colorBar)}/>
				<div className={css(Styles.innerBox)}>
					<h2>{this.props.title}</h2>
					<p>{this.props.author}</p>
				</div>
				<div className={contentStyle} ref={ref => this.content = ref}>
					<p>contents: {this.props.content}</p>
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
					so many text<br />
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
