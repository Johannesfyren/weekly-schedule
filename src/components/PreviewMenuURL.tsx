//@ts-nocheck
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../utils/supabaseClient";
export default function PreviewMenuURL({ url }) {
    const [content, setContent] = useState(null);
    const [mouseX, setMouseX] = useState<number>();
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
        };
        {
            console.log(content);
        }
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
                flexDirection: "row",
                zIndex: "1000",
                width: "400px",
                overflow: "auto",
                height: "100px",
                backgroundColor: "grey",
                transform: "translate(50%,50%)",
            }}
        >
            <img
                src={content?.images ? content?.images[0] : ""}
                alt=""
                height={"100%"}
            />
            <h1 style={{ fontSize: "1rem", wordWrap: "break-word" }}>
                {content?.title}
            </h1>
        </div>,
        document.body!
    );
}
