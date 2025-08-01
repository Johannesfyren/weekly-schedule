// @ts-nocheck
import { supabase } from "./supabaseClient";
export type userType = {
    id: number;
    created_at: string;
    name: string;
    img_ref: string;
};
export default async function fetchUsers(
    id: string = "*"
): Promise<userType[] | null> {
    const { data, error } = await supabase.from("user").select(id);
    if (error) return null;
    return data;
}
