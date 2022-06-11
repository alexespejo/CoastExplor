import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firestore";
import ImageDisplay from "./ImageDisplay";
import ButtonLink from "./ButtonLink";
import Map from "./Map";
import Rating from "./Rating";
import { BsFillPinMapFill } from "react-icons/bs";
import {
  FaSwimmer,
  FaHamburger,
  FaPeopleArrows,
  // FaParking,
  FaWalking,
  FaWineGlassAlt,
  // FaStar,
} from "react-icons/fa";
import { WiSunset } from "react-icons/wi";

const BeachInfo = ({
  zip,
  name,
  id,
  directions,
  coord,
  dating = null,
  exploring = null,
  bg_image = false,
}) => {
  const [weather, setWeather] = useState();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function dataMount() {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=4f820b31777f48729e101835220506&q=${zip}&days=10&aqi=no&alerts=no`
      );
      const data = await response.json();
      setWeather(data);
    }
    const imageRef = ref(storage, `${id}.jpeg`);
    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log(err.message));
    dataMount();
  }, [zip, id]);
  return (
    <div
      className="border-2 border-lime-500 rounded-xl  m-2 w-full lg:w-1/3  shadow-xl"
      style={
        bg_image
          ? {
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
            }
          : null
      }
    >
      <div className="bg-sand w-full h-full rounded-lg p-2 ">
        <h1 className="flex items-center justify-between font-bold text-xl border-b-lime-500 border-b-2 mb-2">
          {name}
          <ButtonLink tip="Directions" link={directions}>
            <BsFillPinMapFill />
          </ButtonLink>
          <ImageDisplay id={id} />
        </h1>
        <div className="flex justify-between flex-col-reverse ">
          <div className="flex flex-col justify-evenly items-start text-sm w-full relative">
            <div className="flex re">
              <div>
                {weather !== undefined
                  ? weather.forecast.forecastday.map((x, i) => {
                      return (
                        <div key={i}>
                          <h1 className="font-bold">
                            {i === 0
                              ? "Today"
                              : i === 1
                              ? "Tomorrow"
                              : x.date.slice(5) + "-" + x.date.substring(0, 4)}
                          </h1>
                          <div className="flex items-center">
                            <h3>Avg. temp: {x.day.avgtemp_c}&deg;C</h3>

                            <img
                              src={`https:${x.day.condition.icon}`}
                              className="h-10 w-10 mr-1"
                              alt={x.day.condition.text}
                            />
                            {x.day.condition.text}
                          </div>
                        </div>
                      );
                    })
                  : "loading"}
              </div>
              <div className="flex h-full  justify-around flex-col p-5 text-xl ml-auto absolute top-0 right-0">
                {dating !== null ? (
                  <>
                    <Rating rating={dating.beachWalks}>
                      <FaWalking /> Walks
                    </Rating>
                    <Rating rating={dating.fineDine}>
                      <FaWineGlassAlt /> Dining
                    </Rating>
                    <Rating rating={dating.sightSeeing}>
                      <WiSunset /> Sunset
                    </Rating>
                  </>
                ) : (
                  ""
                )}
                {exploring !== null ? (
                  <>
                    <Rating rating={exploring.crowds}>
                      <FaPeopleArrows /> Crowds
                    </Rating>
                    <Rating rating={exploring.food}>
                      <FaHamburger /> Food
                    </Rating>
                    <Rating rating={exploring.swimming}>
                      <FaSwimmer /> Swimming
                    </Rating>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Map lati={coord.latitude} long={coord.longitude} />
        </div>
      </div>
    </div>
  );
};

export default BeachInfo;
