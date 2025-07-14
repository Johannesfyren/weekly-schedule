import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import fetchImage from "../utils/fetchImage";
type attendType = {
    name: string;
    imgUrl?: string;
    canOpenProfile?: boolean;
};

export default function Attendance({
    name,
    imgUrl = "",
    canOpenProfile = false,
}: attendType) {
    const [publicUrl, setPublicUrl] = useState("");
    useEffect(() => {
        if (imgUrl) {
            async function gogo() {
                setPublicUrl(await fetchImage(imgUrl));
            }
            gogo();
        }
    }, []);

    return (
        <div
            className="attendant-container"
            onClick={() => canOpenProfile && console.log("yo opened")}
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
