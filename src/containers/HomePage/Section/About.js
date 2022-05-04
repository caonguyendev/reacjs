import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./About.scss";

class About extends Component {
  render() {
    console.log("check props", this.props);
    return (
      <>
        <section className="section-about">
          <div className="section-container container">
            <div className="section-title">
              <h1>Truyền thông nói về BookingCare</h1>
            </div>
            <div className="section-content">
              <iframe
                width="50%"
                height="320"
                src="https://www.youtube.com/embed/tyvdzl8Mpzw?list=RDtyvdzl8Mpzw"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return ();
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
