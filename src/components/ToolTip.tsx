import { useState } from "react";

export type TT = {
    text: string;
    placement: "top" | "bottom";
};
export default function ToolTip({ text }: TT) {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
        <div
            style={{
                display: "flex",
                position: "absolute",
                width: "15px",
                height: "15px",
                top: "-12px",
                right: "-12px",
                borderRadius: "50%",
                backgroundColor: "#e7e7e7ff",
                justifyContent: "center",
                alignItems: "center",
            }}
            onMouseEnter={() => setShowToolTip(true)}
            onMouseLeave={() => setShowToolTip(false)}
        >
            <span style={{ fontSize: "0.8rem", color: "blue" }}>?</span>
            {showToolTip && (
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        width: "200px",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        height: "auto",
                        top: "20px",
                        right: "0px",
                        backgroundColor: "#300276",
                        boxShadow: "0 0 5px white",
                        zIndex: "100",
                        borderRadius: "10px",
                        padding: "10px",
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
}
