//@ts-nocheck
import { useEffect, useState } from "react";

import styles from "../components/Events/event.module.css";
import { supabase } from "../utils/supabaseClient";
import recipeIcon from "../assets/recipe-icon.svg";
import Button from "./Button";
import LoadingIndicator from "./LoadingIndicator";
import PreviewMenuURL from "./PreviewMenuURL";
import RecipeItem from "./RecipeItem";

export default function RecipeCollection({
    recipeContainerOpen,
    setRecipeContainerOpen,
}) {
    const [recipees, setRecipees] = useState();
    const [isLoading, setIsLoading] = useState(true);

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
            console.log(data);
        };

        getURLEntries();
    }, []);

    useEffect(() => {
        const fetchMetaData = async () => {
            const { data, error } = await supabase.functions.invoke(
                "URL_Parser",
                {
                    body: { url: url },
                }
            );
            if (error) return null;
            console.log(data);
            setRecipees(data);
            setIsLoading(false);
        };

        fetchMetaData();
    }, []);

    return (
        recipeContainerOpen && (
            <div
                className="profile-container-bg"
                onClick={(e) => console.log(e.target)}
            >
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
                                    >
                                        <h1>
                                            {"Uge " +
                                                recipeObj.week +
                                                " - " +
                                                recipeObj.year}
                                        </h1>
                                        {recipeObj.mon_link && (
                                            <RecipeItem
                                                url={recipeObj.mon_link}
                                            />
                                        )}
                                        {recipeObj.tue_link && (
                                            <RecipeItem
                                                url={recipeObj.tue_link}
                                            />
                                        )}
                                        {recipeObj.wed_link && (
                                            <RecipeItem
                                                url={recipeObj.wed_link}
                                            />
                                        )}
                                        {recipeObj.thu_link && (
                                            <RecipeItem
                                                url={recipeObj.thu_link}
                                            />
                                        )}
                                        {recipeObj.fri_link && (
                                            <RecipeItem
                                                url={recipeObj.fri_link}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    );
}
