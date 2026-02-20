import { supabase } from "./supabaseClient";
export default async function fetchImage(imgUrl: string): Promise<string> {
    //It only includes HTTPS if it is outside Supabase (hence we just return the image url)
    if (imgUrl.includes("https")) {
        return imgUrl;
    }
    const { data } = await supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`PF/${imgUrl}`);

    return data.publicUrl;
}
