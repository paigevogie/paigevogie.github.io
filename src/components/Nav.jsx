import React from 'react';

class Nav extends React.Component {
    state = {
        pathname: '/'
    };

    componentDidMount() {
        typeof window !== `undefined` && this.setState({ pathname: window.location.pathname });
    }

    getClassName = path => (
        this.state.pathname.includes(path) ? 'active' : ''
    );

    render () {
        const { getClassName, state } = this;
        const { pathname } = state;

        return (
            <nav>
                <a href='/' className={pathname === '/' ? 'active home': 'home'}>Home</a>
                <a href='/about/' className={`about ${getClassName('about')}`}>About</a>
                <a href='/blog/' className={`blog ${getClassName('blog')}`}>Blog</a>
                <a href='/projects/' className={`projects ${getClassName('projects')}`}>Projects</a>
            </nav>
        );
    }
};

export default Nav;
