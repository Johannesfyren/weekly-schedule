import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

type attendType = {
    name: string;
    imgUrl: string;
};

export default function Attendance({ name, imgUrl = "" }: attendType) {
    // useEffect(() => {
    //     async function fetchImage() {
    //         const { data, error } = await supabase.storage
    //             .from("profile-pictures")
    //             .download("PF/imageTest.png");
    //         if (error) console.log(error);
    //         console.log(data);
    //     }
    //     fetchImage();
    // }, []);

    return (
        <div className="attendant-container">
            <div className="avatar">
                {!imgUrl
                    ? name.slice(0, 2).toUpperCase()
                    : imgUrl && (
                          <img
                              src="src/assets/test.gif"
                              className="profile-pictures"
                          ></img>
                      )}
            </div>

            <p>{name}</p>
        </div>
    );
}
