// import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  BsPlusCircle,
  BsBarChart,
  BsCalendarRange,
  BsHouseDoor,
} from "react-icons/bs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import ButtonLink from "./components/ButtonLink";
import Planner from "./pages/Planner";
import Gallery from "./pages/Gallery";
function App() {
  return (
    <Router>
      <div
        className="flex flex-col bg-white/50 h-screen overflow-x-hidden z-100"
        style={{ zIndex: "100" }}
      >
        <div className="bg-white text-2xl flex items-center justify-around border-b-4 border-lime-500 w-screen sticky top-0">
          <span className="text-lg lg:text-4xl ">SoCalxplor🏝</span>
          <ButtonLink tip="Home">
            <BsHouseDoor />
          </ButtonLink>
          <ButtonLink tip="Dashboard" link="/gallery">
            <BsBarChart />
          </ButtonLink>
          <ButtonLink tip="Post" link="/post">
            <BsPlusCircle />
          </ButtonLink>
          <ButtonLink tip="Schedule" link="/planner">
            <BsCalendarRange />
          </ButtonLink>

          <Avatar
            alt="alex"
            src="./images/profile.JPG"
            sx={{ width: 40, height: 40 }}
          />
        </div>

        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/post"}>
            <Posts />
          </Route>
          <Route exact path={"/planner"}>
            <Planner />
          </Route>
          <Route exact path={"/gallery"}>
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
