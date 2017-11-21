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

interface State {
	height: number;
}

const Styles = style.create({
	base: {
		// outline: '1px solid black',
		backgroundColor: '#FFFFFF',
		boxShadow: '0 5px 15px 0px #0000002b',
		width: '300px',
		height: '200px',
		margin: '10px',
		padding: '10px',
		transition: 'height 0.2s, background-color 0.2s, outline 0.2s',
	},
	
	opened: {
		height: '400px',
		backgroundColor: '#ffe000',
		outline: 'none',
	}
});

const contentStyles = style.create({
	base: {
		position: 'absolute',
		left: 0,
		top: 0,
		display: 'none',
	},

	opened: {
		display: 'block',
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
					height: 200 + rc[0].height,
				});
			}
		}
	}
	
	render() {
		let containerStyle, contentStyle;
		const calced = style.create({ get: {height: `${this.state.height}px`} });

		if ( this.props.isOpen ) {
			containerStyle = css(Styles.base, Styles.opened, calced.get);
			contentStyle = css(contentStyles.base, contentStyles.opened);
		} else {
			containerStyle = css(Styles.base);
			contentStyle = css(contentStyles.base);
		}
		
		return (
			<div className={containerStyle} onClick={this.onToggle} onAnimationEndCapture={e => console.log(e)}>
				<div>
					<p>title: {this.props.title}</p>
					<p>author: {this.props.author}</p>
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
