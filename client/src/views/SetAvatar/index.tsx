import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import loader from "@/assets/images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styles from "./setAvatar.module.scss";
import { setAvatarRoute, setAvatarImageRoute } from "@/request/setAvatar";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions: object = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;
  const setProfilePicture = async () => {
    console.log(selectedAvatar);

    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem(apiUrl));
      const params = {
        id: user._id,
        image: avatars[selectedAvatar],
      };
      setAvatarRoute(params).then((res) => {
        if (res.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = res.image;
          localStorage.setItem(apiUrl, JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data: any = [];
      for (let i = 0; i < 4; i++) {
        const params = {};
        const images = await setAvatarImageRoute(params);
        const buffer = Buffer.from(images);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className={styles.setAvatar}>
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className={styles.setAvatar}>
          <div className={styles.titleContainer}>
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className={styles.avatars}>
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`${styles.avatar} ${
                    selectedAvatar === index ? styles.selected : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className={styles.submitBtn}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
