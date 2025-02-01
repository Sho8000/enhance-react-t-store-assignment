import React from "react";
import "./LandingPage.css"
//import ReactPlayer from "react-player";

function ErrorPage() {
  return (
    <section className="video-container" style={{ height: "100vh", backgroundColor:"gray" }}>
    <div className="titleContainer">
      <h2 className="title">Not Found this Page,,,</h2>

    </div>

{/*     <ReactPlayer
      className="reactPlayer"
      url="/homevidnew.mp4"
      playing={true}
      controls={false}
      volume={null}
      muted={true}
      width="100%"
      height="100%"
      loop={true}
      playsinline={true}
    />
 */}  </section>
);
}

export default ErrorPage;
