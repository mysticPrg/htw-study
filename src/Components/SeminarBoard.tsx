import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface Props {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly content: string;
	readonly isOpen: boolean;
}

const Styles = StyleSheet.create({
	hide: {
		outline: '1px solid black',
	}
});

class SeminarBoard extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<div className={css(Styles.hide)}>
				Contents... {this.props.content}
			</div>
		);
	}
}

export default SeminarBoard;