import { useEffect, useState } from "react";
import { motion } from "motion/react";
import fetchImage from "../utils/fetchImage";
type attendType = {
    name: string;
    imgUrl?: string;
    canOpenProfile?: boolean;
    setSelectedAtt?: (name: string) => void;
};

export default function Attendance({
    name,
    imgUrl = "",
    canOpenProfile = false,
    setSelectedAtt,
}: attendType) {
    const [publicUrl, setPublicUrl] = useState("");

    useEffect(() => {
        console.log("get new img");
        if (imgUrl) {
            async function gogo() {
                setPublicUrl(await fetchImage(imgUrl));
            }
            gogo();
        }
    }, [imgUrl]);

    return (
        <div
            className="attendant-container"
            onClick={() =>
                canOpenProfile && setSelectedAtt && setSelectedAtt(name)
            }
        >
            {console.log("rerender attn profile")}
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
