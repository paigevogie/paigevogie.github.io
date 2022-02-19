import React from 'react';
import Layout from '../components/Layout';
import '../style/Dots.scss';

const Ring = () => <div className='ring'></div>;

const getRings = () => {
    const ringCount = 12;
    const Rings = [];

    for (let i = 0; i < ringCount; i++) {
        Rings.push(<Ring key={i}/>);
    }

    return Rings;
}

const Dots = () => (
    <Layout title="Dots">
      <div className="dots">
        <div className='rings'>
            {getRings()}
        </div>
      </div>
    </Layout>
);

export default Dots;
