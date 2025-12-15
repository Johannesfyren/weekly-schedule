//@ts-nocheck
import { useEffect, useState } from "react";

import styles from "../components/Events/event.module.css";
import { supabase } from "../utils/supabaseClient";
import recipeIcon from "../assets/recipe-icon.svg";
import Button from "./Button";
import LoadingIndicator from "./LoadingIndicator";
import PreviewMenuURL from "./PreviewMenuURL";
import RecipeItem from "./RecipeItem";
import filledHeart from "../assets/full-heart-icon.svg";

export default function RecipeCollection({
    recipeContainerOpen,
    setRecipeContainerOpen,
}) {
    const [recipees, setRecipees] = useState();
    const [favoriteRecipees, setFavoriteRecipees] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllRecipees, setShowAllRecipees] = useState(true);

    const todaysDate = new Date();
    useEffect(() => {
        const getURLEntries = async () => {
            const { data, error } = await supabase
                .from("menu_with_links")
                .select("*")
                .order("id", { ascending: false });
            if (error) return undefined;
            setRecipees(data);
            setIsLoading(false);
        };

        getURLEntries();
    }, []);

    useEffect(() => {
        const userID = localStorage.getItem("favoritePersonID");
        if (!userID) return;

        const getFavoriteRecipees = async () => {
            const { data, error } = await supabase
                .from("favorite_recipees")
                .select("*")
                .eq("user_id", userID)
                .order("id", { ascending: false });
            if (error) return undefined;
            setFavoriteRecipees(data);
            setIsLoading(false);
            console.log(data);
        };

        getFavoriteRecipees();
    }, []);

    return (
        recipeContainerOpen && (
            <div className="profile-container-bg">
                <div className="profile-container hide-scrollbar">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            backgroundColor: "rgba(6, 6, 148, 0.238)",
                            alignItems: "center",
                            padding: "0 10px 0 10px",
                            overflow: "visible",
                            height: "80px",
                        }}
                    >
                        <img src={recipeIcon} width={"60px"} alt="" />
                        <h1>Opskrifter</h1>
                        <div style={{ marginLeft: "auto" }}>
                            <Button
                                name="Luk"
                                type="Secondary"
                                customClass="mg-left-auto"
                                clickEvent={() => setRecipeContainerOpen(false)}
                            />
                        </div>
                    </div>
                    {/* HEADER PICKER */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            marginLeft: "20px",
                            marginTop: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        <h3
                            onClick={() => setShowAllRecipees(true)}
                            style={{ cursor: "pointer" }}
                            className={
                                showAllRecipees ? "util-bold " : "util-medium"
                            }
                        >
                            Alle opskrifter
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "4px",
                                cursor: "pointer",
                            }}
                        >
                            <h3
                                onClick={() => setShowAllRecipees(false)}
                                className={
                                    !showAllRecipees
                                        ? "util-bold "
                                        : "util-medium"
                                }
                            >
                                Mine favoritter
                            </h3>
                            <img src={filledHeart} alt="" width={"20px"} />
                        </div>
                    </div>
                    <hr></hr>
                    {/* SHOW ALL RECIPEES */}
                    {showAllRecipees && (
                        <div>
                            {recipees &&
                                recipees.map((recipeObj) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                marginBottom: "20px",
                                                padding: "20px",
                                            }}
                                            key={recipeObj.created_at}
                                        >
                                            <h2>
                                                {"Uge " +
                                                    recipeObj.week +
                                                    " - " +
                                                    recipeObj.year}
                                            </h2>
                                            {recipeObj.mon_link && (
                                                <RecipeItem
                                                    url={recipeObj.mon_link}
                                                    key={recipeObj.mon_link}
                                                />
                                            )}
                                            {recipeObj.tue_link && (
                                                <RecipeItem
                                                    url={recipeObj.tue_link}
                                                    key={recipeObj.tue_link}
                                                />
                                            )}
                                            {recipeObj.wed_link && (
                                                <RecipeItem
                                                    url={recipeObj.wed_link}
                                                    key={recipeObj.wed_link}
                                                />
                                            )}
                                            {recipeObj.thu_link && (
                                                <RecipeItem
                                                    url={recipeObj.thu_link}
                                                    key={recipeObj.thu_link}
                                                />
                                            )}
                                            {recipeObj.fri_link && (
                                                <RecipeItem
                                                    url={recipeObj.fri_link}
                                                    key={recipeObj.fri_link}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {/* SHOW Favorite RECIPEES */}
                    {!showAllRecipees && (
                        <div>
                            {favoriteRecipees &&
                                favoriteRecipees.map((recipeObj) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                marginBottom: "20px",
                                                padding: "20px",
                                            }}
                                            key={recipeObj.url}
                                        >
                                            {recipeObj && (
                                                <RecipeItem
                                                    url={recipeObj.url}
                                                    key={recipeObj.url}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        )
    );
}
