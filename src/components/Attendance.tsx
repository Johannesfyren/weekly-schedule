import { useEffect, useState } from "react";
import FavoritePerson from "./FavoritePerson";
import fetchImage from "../utils/fetchImage";
import christmasHat from "../assets/christmas-hat.png";

type attendType = {
    id: number;
    name: string;
    imgUrl?: string;
    canOpenProfile?: boolean;
    setSelectedAtt?: (name: number) => void;
    refetchAttendees?: boolean;
    setShowAttPicker?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Attendance({
    id,
    name,
    imgUrl = undefined,
    canOpenProfile = false,
    setSelectedAtt,
    refetchAttendees,
    setShowAttPicker,
}: attendType) {
    const [publicUrl, setPublicUrl] = useState("");

    useEffect(() => {
        if (imgUrl) {
            async function fetchImageFromUrl() {
                const url = await fetchImage(imgUrl!);
                setPublicUrl(url + "?t=" + Date.now()); //making this
            }
            fetchImageFromUrl();
        }
    }, [refetchAttendees, imgUrl]);

    return (
        <div
            className="attendant-container"
            onClick={() => {
                canOpenProfile && setSelectedAtt && setSelectedAtt(id);
                //@ts-ignore

                setSelectedAtt && setShowAttPicker(false);
            }}
        >
            <div className="avatar">
                {!imgUrl
                    ? name.slice(0, 2).toUpperCase()
                    : imgUrl &&
                      publicUrl && (
                          <img
                              src={publicUrl}
                              className="profile-pictures"
                          ></img>
                      )}
                {/* CHRISTMAS EDITION (CHRISTMAS HAT) START*/}
                <img
                    src={christmasHat}
                    width={"30px"}
                    style={{
                        position: "absolute",
                        top: "-16px",
                        left: "-10px",
                        rotate: "-22deg",
                    }}
                ></img>
                {/* CHRISTMAS EDITION (CHRISTMAS HAT) END */}
            </div>

            <p>{name} </p>
            <div
                style={{
                    marginLeft: "auto",
                    marginRight: "10px",
                }}
            >
                <FavoritePerson id={id} small={true} clickable={false} />
            </div>
        </div>
    );
}
