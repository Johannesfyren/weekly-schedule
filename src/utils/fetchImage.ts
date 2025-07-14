import { supabase } from "./supabaseClient";
export default async function fetchImage(imgUrl: string): Promise<string> {
    const { data } = await supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`PF/${imgUrl}`);
    console.log(data.publicUrl);
    return data.publicUrl;
}
