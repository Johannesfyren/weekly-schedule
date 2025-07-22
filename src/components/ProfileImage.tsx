import fetchImage from "../utils/fetchImage";
import { useEffect, useState } from "react";

export type profileImageType = {
    imgUrl?: string;
    size?: number;
    name: string;
};
export default function ProfileImage({ imgUrl, name }: profileImageType) {
    const [publicUrl, setPublicUrl] = useState("");

    useEffect(() => {
        console.log("test", imgUrl);
        if (imgUrl) {
            async function getImg() {
                setPublicUrl(await fetchImage(imgUrl!));
            }
            getImg();
        }
    }, [imgUrl]);

    return (
        <>
            <div className="avatar-big">
                {!publicUrl
                    ? name && name.slice(0, 2).toUpperCase()
                    : publicUrl && (
                          <img
                              src={publicUrl}
                              className="profile-pictures"
                          ></img>
                      )}
                <button className="btn-edit-pp">✍️</button>
                {/* TODO: ADD POSSIBILITY TO ADD/EDIT IMAGE */}
            </div>
        </>
    );
}
