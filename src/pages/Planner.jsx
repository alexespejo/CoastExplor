import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
// import { sendMessage } from "../twilio";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firestore";
import BeachInfo from "../components/BeachInfo";
import { FaMap, FaHeart } from "react-icons/fa";
const Planner = () => {
  const [beaches, setBeaches] = useState([]);
  const [selectedBeach, selectBeach] = useState(null);
  const [data, showData] = useState(false);
  const [invites, setInvites] = useState("");
  const [adventureType, setType] = useState(false);
  const [value, setValue] = useState("");

  const textAreaChange = (event) => {
    setValue(event.target.value);
  };

  const contact = [
    {
      label: "Alex Espejo",
      phone: "562-335-2217",
    },
    {
      label: "Alex Mayo",
      phone: "",
    },
  ];
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "beaches"));
    setBeaches(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  const handleChange = (event) => {
    selectBeach(event.target.value);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    // console.log(document.getElementById("beaches-info"));
    getData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center   ">
      <div className="  flex flex-col mx-10 my-5 p-5 bg-white/60 rounded-3xl w-full ">
        <h1 className="text-2xl lg:text-4xl">Plan your next Adventure</h1>
        <form
          action="http://192.168.1.202:5001/sendsms"
          method="POST"
          enctype="multipart/form-data"
        >
          <Box sx={{ minWidth: 120 }} className="my-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Beaches</InputLabel>
              <Select
                name="beach"
                labelId="demo-simple-select-label"
                value={selectedBeach}
                label="Beaches"
                onChange={handleChange}
              >
                {beaches.map((beach, i) => {
                  return <MenuItem value={beach.label}>{beach.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          {selectedBeach !== null ? (
            <Button className="self-end" onClick={() => showData(!data)}>
              Explore
            </Button>
          ) : (
            ""
          )}

          <Stack spacing={2}>
            <h1 className="text-lg text-grey-500 w-full flex">
              Plan
              <AvatarGroup max={3} className="ml-auto z-0">
                {invites.length !== 0
                  ? invites.map((x) => {
                      return (
                        <Avatar
                          className="z-0"
                          alt={x.label}
                          src="image"
                          sx={{ width: 20, height: 20 }}
                        />
                      );
                    })
                  : ""}
              </AvatarGroup>
            </h1>
            <Autocomplete
              disablePortal
              id="invities"
              options={contact}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Contacts" />
              )}
            />

            <Button
              className="self-end"
              onClick={() =>
                setInvites((i) => [
                  ...i,
                  document.getElementById("invities").value,
                ])
              }
            >
              Add Invite
            </Button>
            <div className="flex items-center justify-between">
              <h1>
                Date Type:{" "}
                <span className="font-bold">
                  {adventureType ? "Dater" : "Explorer"}
                </span>
              </h1>
              <div className="flex items-center">
                <FaMap
                  className={`text-2xl ${
                    adventureType ? "text-slate-600" : "text-yellow-900"
                  } `}
                />
                <Switch
                  name="date_type"
                  {...label}
                  onChange={() => setType(!adventureType)}
                />
                <FaHeart
                  className={`text-2xl ${
                    adventureType ? "text-red-600" : "text-slate-600"
                  }`}
                />
              </div>
            </div>
            {selectedBeach !== null && data ? (
              <>
                <BeachInfo
                  zip={beaches[selectedBeach].zip}
                  name={beaches[selectedBeach].label}
                  id={beaches[selectedBeach].id}
                  directions={beaches[selectedBeach].directions}
                  coord={beaches[selectedBeach].coordinates}
                  dating={adventureType ? beaches[selectedBeach].dating : null}
                  exploring={
                    !adventureType ? beaches[selectedBeach].exploring : null
                  }
                />
              </>
            ) : (
              ""
            )}
            <TextField
              id="datetime-local"
              label="Beach Date"
              type="datetime-local"
              name="date_time"
              defaultValue="2022-06-24T10:30"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              className="my-2"
              label="Description"
              name="description"
              multiline
              maxRows={4}
              value={value}
              onChange={textAreaChange}
            />
          </Stack>
          <input type="submit" value={"submit"} />
        </form>
      </div>
      {/* <Button onClick={sendMessage("hello world")}>Send Message</Button> */}
    </div>
  );
};

export default Planner;
