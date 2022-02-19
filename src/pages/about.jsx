import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from "react-helmet"
import '../style/About.scss';

const About = () => (
    <Layout title="About" className="about" subtitle={<p>Find me all over the web <b>@paigevogie</b>.</p>}>
      <Helmet>
          <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
      </Helmet>
      <div className='iframes'>
        <iframe src='https://open.spotify.com/embed/playlist/37i9dQZF1EUMDoJuT8yJsl?utm_source=generator' width='275' height='275' frameBorder='0' allowFullScreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>
        <iframe src='https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df' height='275' width='275' frameBorder='0' scrolling='no'></iframe>
        <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="paigevogie" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/paigevogie?trk=profile-badge"></a></div>
      </div>
    </Layout>
);

export default About;
