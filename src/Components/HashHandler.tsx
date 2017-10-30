import * as React from 'react';

interface Props {
	readonly onHashChanged: (hash: string) => void;
}

interface State {
	readonly hash: string;
}

class HashHandler extends React.Component<Props, State> {
	state: State = {
		hash: ''
	};
	
	componentDidMount() {
		this.checkHash();
		window.addEventListener('hashchange', this.checkHash);
	}
	
	componentWillUnmount() {
		window.removeEventListener('hashchange', this.checkHash);
	}
	
	render() {
		return(<div style={{display: 'none'}} />);
	}
	
	private checkHash = () => {
		const newHash = window.location.hash;
		if ( this.state.hash !== newHash ) {
			this.props.onHashChanged(newHash);
			this.setState({
				...this.state,
				hash: newHash
			});
		}
	}
}

export default HashHandler;