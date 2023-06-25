import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./landing.css";
import Feed from "../Feed/feed";
import NavigationSidebar from "../nav/index.js";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Feed />
      <div className="row">
        <div className="landing-page">
          <header>
            <div className="container text-center">
              <h1>Welcome to Your Fitness App</h1>
              <p>
                Get fit, stay healthy, and reach your fitness goals with our
                personalized fitness app.
              </p>
            </div>
          </header>

          <section className="request-exercises">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <h2>Request Exercises from Trainers</h2>
                  <p>
                    Our app allows you to connect with experienced trainers who
                    can create custom workout plans just for you.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/routine")}
                  >
                    Request Exercises
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="fitness-posts">
            <div className="container">
              <div className="row">
                <div className="col-md-7"></div>
                <div className="col-md-5">
                  <h2>Share Your Fitness Journey</h2>
                  <p>
                    Stay motivated and inspire others by posting your fitness
                    progress and achievements.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/post")}
                  >
                    Post Fitness Updates
                  </button>
                </div>
              </div>
            </div>
          </section>

          <footer>
            <div className="container text-center">
              <h4>Use the app today and start your fitness journey!</h4>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Start your journey!
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
