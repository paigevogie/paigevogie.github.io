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
                <a href='/' className={pathname === '/' ? 'active': ''}>Home</a>
                <a href='/about' className={getClassName('about')}>About</a>
                <a href='/blog' className={getClassName('blog')}>Blog</a>
                <a href='/projects' className={getClassName('projects')}>Projects</a>
                <a href='/contact' className={getClassName('contact')}>Contact</a>
            </nav>
        );
    }
};

export default Nav;
