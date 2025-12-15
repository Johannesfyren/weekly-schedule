//@ts-nocheck
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import LoadingIndicator from "./LoadingIndicator";
import fallbackImg from "../assets/fallbackImg.svg";
import linkIcon from "../assets/link-ext-icon.svg";
import hollowHeart from "../assets/hollow-heart-icon.svg";
import filledHeart from "../assets/full-heart-icon.svg";

export default function RecipeItem({ url }) {
    const userID = localStorage.getItem("favoritePersonID");
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            const { data, error } = await supabase.functions.invoke(
                "URL_Parser",
                {
                    body: { url: url },
                }
            );
            if (error) return null;

            setContent(data);
            setIsLoading(false);
        };

        fetchMetaData();
    }, []);
    useEffect(() => {
        const getFavStatus = async () => {
            const { data, error } = await supabase
                .from("favorite_recipees")
                .select("*")
                .eq("user_id", userID)
                .eq("url", url);

            setIsFavorite(!data[0] ? false : true);
        };
        getFavStatus();
    }, []);

    const handleFavoriteRecipe = async () => {
        if (!userID) {
            toast.warning(
                `Du kan ikke gemme en opskrift uden at angive en favoritperson. Gå under "Check ind/ud" og markér en favorit`
            );

            return;
        }
        const isAlreadyFavorite = await checkUrlAlreadyFavorite(userID);
        if (isAlreadyFavorite) {
            try {
                const { data, error } = await supabase
                    .from("favorite_recipees")
                    .delete()
                    .eq("user_id", userID)
                    .eq("url", url);
                setIsFavorite(!isFavorite);
            } catch (e) {
                toast.error(
                    `Noget gik galt, og favoritstatus på opskriften blev ikke ændret`
                );
            }
        } else {
            try {
                const { data, error } = await supabase
                    .from("favorite_recipees")
                    .upsert([{ url: url, user_id: userID }]);
                setIsFavorite(!isFavorite);
            } catch (e) {
                toast.error(
                    `Noget gik galt, og favoritstatus på opskriften blev ikke ændret`
                );
            }
        }
    };

    const checkUrlAlreadyFavorite = async (userID) => {
        const { data, error } = await supabase
            .from("favorite_recipees")
            .select("*")
            .eq("user_id", userID)
            .eq("url", url);

        return !data[0] ? false : true;
    };
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                width: "100%",
                overflow: "auto",
                height: "130px",
                backgroundColor: "rgba(2, 49, 85, 0.8)",
                padding: "6px",
                borderRadius: "8px",
            }}
        >
            {isLoading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        width: "100%",
                    }}
                >
                    <LoadingIndicator />
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        width: "100%",
                    }}
                    className={isLoading ? "week-plan-cell-loading" : ""}
                >
                    <img
                        src={content?.images ? content?.images[0] : fallbackImg}
                        alt=""
                        height={"100%"}
                        width={"130px"}
                        style={{
                            objectFit: "cover",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <h1
                            style={{ fontSize: "1rem", wordWrap: "break-word" }}
                        >
                            {content?.title}
                        </h1>
                        <p
                            style={{
                                fontSize: "0.8rem",
                                wordWrap: "break-word",
                                color: "#f1f1f1",
                            }}
                        >
                            {content?.description}
                        </p>
                    </div>

                    <div
                        style={{
                            marginLeft: "auto",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            gap: "10px",
                        }}
                    >
                        <a href={url} target="_blank">
                            <img src={linkIcon} alt="" width={"20px"} />
                        </a>
                        <img
                            src={isFavorite ? filledHeart : hollowHeart}
                            alt=""
                            width={"20px"}
                            onClick={handleFavoriteRecipe}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
