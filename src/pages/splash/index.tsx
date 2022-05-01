import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chokidrImg from "../../assets/images/chokidr.png";
import phoneImg from "../../assets/images/iphone.png";
import macMonitorImg from "../../assets/images/macMonitor.png";
import "../../assets/styles/splash.scss";
import Button from "../../components/Button";
import CarouselNavigation from "../../components/CarouselNavigation";



const Splash = () => {
  const [splashScreenId, setSplashScreenId] = useState<Number>(1);
  const [carouselId, setCarouselId] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="splash">
      {splashScreenId === 0 && (
        <div className="min-h-100vh flex fd-column justify-center items-center">
          <div className="chokidr-title">C H O K I D R</div>
          <div className="splash-img">
            <img src={chokidrImg} alt={"Chokidr"} />
          </div>
        </div>
      )}
      {splashScreenId === 1 && (
        <div className="splash-menu flex fd-column items-center">
          <div className="splash-menu-head  flex fd-column w100 h100 ">
            <div className="splash-boldText">Flagship Features</div>
            <div>
              <div className="splash-para">
                Decentralized, Connected, Simplified.
              </div>
              <div className="text-center">
                <img
                  src={carouselId === 2 ? macMonitorImg : phoneImg}
                  alt="phone"
                />
              </div>
            </div>
            <div className="text-center m-auto">
              <CarouselNavigation
                counts={3}
                defaultView={1}
                getValue={(id: number) => {
                  setCarouselId(id);
                }}
              />
            </div>
          </div>
          <div className="splash-navigation flex-center-center fd-column flex-1 w100 h100">
            {/* <div>
              <div className="chokidr-title">C H O K I D R</div>
            </div> */}
            <div className="splash-signup-btn btn">
              <Button
                outlined={false}
                title={"Sign Up"}
                onClick={() => navigate('/signup')}
              />
            </div>
            <div className="splash-login-btn btn">
              <Button
                outlined={true}
                title={"Log In"}
                onClick={() => navigate('/signin')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Splash;
