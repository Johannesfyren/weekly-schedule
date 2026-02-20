import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";

export default function GifGrid({ imgurl, userID }) {
    const handleImgSave = async () => {
        const { data, error } = await supabase
            .from("user")
            .update({ img_ref: imgurl })
            .eq("id", userID)
            .select();
        if (error) {
            toast.error("Noget gik galt, prøv igen!");
        }
        if (data) {
            toast.success("Nyt profilbillede valgt!");
        }
    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                handleImgSave();
            }}
        >
            <img
                src={imgurl}
                width={"75px"}
                height={"75px"}
                alt=""
                className="hover-border-wide"
            />
        </div>
    );
}
