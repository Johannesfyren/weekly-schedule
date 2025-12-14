//@ts-nocheck
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../utils/supabaseClient";
import fallbackImg from "../assets/fallbackImg.svg";
import LoadingIndicator from "./LoadingIndicator";

export default function PreviewMenuURL({ url }) {
    const [content, setContent] = useState(null);
    const [mouseX, setMouseX] = useState<number>(-1000); // initial "render-flicker" happens off screen
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

            setContent(data);
            setIsLoading(false);
        };

        fetchMetaData();
    }, []);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            //Hvis man hover helt til højre, så rykker vi pop-upboksen lidt
            if (e.clientX > window.innerWidth * 0.8) {
                setMouseX(e.clientX - 600);
                //Hvis man hover helt til venstre, så flytter vi pop-upboksen lidt
            } else if (e.clientX < window.innerWidth * 0.2) {
                setMouseX(e.clientX - 350);
            } else {
                setMouseX(e.clientX - 400);
            }
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return createPortal(
        <div
            style={{
                position: "absolute",
                top: "150px",
                left: `${mouseX}px`,
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                zIndex: "1000",
                width: "400px",
                overflow: "auto",
                height: "120px",
                backgroundColor: "rgba(2, 49, 85, 1)",
                transform: "translate(50%,50%)",
                padding: "4px",
                borderRadius: "8px",
                boxShadow: "0 0 10px 0",
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
                </div>
            )}
        </div>,
        document.body!
    );
}
