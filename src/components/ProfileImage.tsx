import fetchImage from "../utils/fetchImage";
import { useEffect, useState } from "react";

export type profileImageType = {
    imgUrl?: string;
    size?: number;
    name: string;
};
export default function ProfileImage({ imgUrl, name, size }: profileImageType) {
    const [publicUrl, setPublicUrl] = useState("");

    useEffect(() => {
        if (imgUrl) {
            async function getImg() {
                setPublicUrl(await fetchImage(imgUrl!));
            }
            getImg();
        }
    }, []);

    return (
        <div className="avatar">
            {!imgUrl
                ? name.slice(0, 2).toUpperCase()
                : publicUrl && (
                      <img src={publicUrl} className="profile-pictures"></img>
                  )}
            {/* TODO: ADD POSSIBILITY TO ADD/EDIT IMAGE */}
        </div>
    );
}
