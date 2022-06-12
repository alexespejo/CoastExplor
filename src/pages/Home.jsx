import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firestore";
import BeachInfo from "../components/BeachInfo";
const Home = () => {
  const [beaches, setBeaches] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "beaches"));
    setBeaches(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-1 overflow-y-scroll">
      <div className="flex flex-wrap justify-center ">
        {beaches.map((beach, i) => {
          return (
            <BeachInfo
              zip={beach.zip}
              name={beach.label}
              id={beach.id}
              directions={beach.directions}
              coord={beach.coordinates}
              bg_image={true}
              dating={beach.dating}
              exploring={beach.exploring}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
