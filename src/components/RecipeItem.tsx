//@ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import LoadingIndicator from "./LoadingIndicator";
import fallbackImg from "../assets/fallbackImg.svg";
import linkIcon from "../assets/link-ext-icon.svg";
export default function RecipeItem({ url }) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            setContent(data);
            setIsLoading(false);
        };
        {
            console.log(content);
        }

        fetchMetaData();
    }, []);
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                width: "100%",
                overflow: "auto",
                height: "120px",
                backgroundColor: "rgba(2, 49, 85, 1)",
                padding: "4px",
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
                        width={"120px"}
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
                    {/* this section mister AI */}
                    <div
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        <a href={url} target="_blank">
                            <img src={linkIcon} alt="" width={"20px"} />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
