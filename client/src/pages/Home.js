import './Home.css';

const Home = () => {
    const githubUsername = process.env.REACT_APP_GITHUB_USERNAME || 'your-username';
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Notes App!</h1>
        <p className="hero-subtitle">
          A simple full-stack application built with React and Express
        </p>
        <div className="hero-buttons">
          <a href="/notes" className="btn btn-primary">
            View Notes
          </a>
          <a 
            href={`https://github.com/${githubUsername}/notes-app`} //meant to go to student's github repo
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="features-section">
        <h2>What's Included</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>React Frontend</h3>
            <p>Modern React application with routing and responsive design</p>
          </div>
          <div className="feature-card">
            <h3>Express Backend</h3>
            <p>RESTful API with proper routing and error handling</p>
          </div>
          <div className="feature-card">
            <h3>MongoDB Database</h3>
            <p>NoSQL database for storing and retrieving notes</p>
          </div>
          <div className="feature-card">
            <h3>Azure Deployment</h3>
            <p>Ready for deployment to Azure App Service with GitHub Actions</p>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <h2>Tech Stack</h2>
        <div className="tech-items">
          <span className="tech-item">React</span>
          <span className="tech-item">Express.js</span>
          <span className="tech-item">MongoDB</span>
          <span className="tech-item">Node.js</span>
          <span className="tech-item">Azure</span>
        </div>
      </div>
    </div>
  );
};

export default Home;