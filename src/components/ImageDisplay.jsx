import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firestore";
import { BsImage } from "react-icons/bs";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const ImageDisplay = ({ id }) => {
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    const imageRef = ref(storage, `${id}.jpeg`);
    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => console.log(err.message));
  }, [id]);
  return (
    <>
      <div>
        <Tooltip title="preview">
          <IconButton className="ml-auto">
            <BsImage onClick={handleOpen} />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img
              className="rounded-xl w-full h-full  shadow-lg"
              src={url}
              alt={id}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ImageDisplay;
