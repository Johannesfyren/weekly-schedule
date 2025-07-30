import { useEffect, useState } from "react";
import { motion } from "motion/react";
import fetchImage from "../utils/fetchImage";
type attendType = {
    name: string;
    imgUrl?: string;
    canOpenProfile?: boolean;
    setSelectedAtt?: (name: string) => void;
    refetchAttendees: boolean;
};

export default function Attendance({
    name,
    imgUrl = undefined,
    canOpenProfile = false,
    setSelectedAtt,
    refetchAttendees,
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
            onClick={() =>
                canOpenProfile && setSelectedAtt && setSelectedAtt(name)
            }
        >
            <div className="avatar">
                {!imgUrl
                    ? name.slice(0, 2).toUpperCase()
                    : imgUrl && (
                          <img
                              src={publicUrl}
                              className="profile-pictures"
                          ></img>
                      )}
            </div>

            <p>{name}</p>
        </div>
    );
}
