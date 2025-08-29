//@ts-nocheck
import StarIcon from "../assets/favorite-star.svg?react";
import StarIconFilled from "../assets/star-icon-filled.svg?react";
import { motion, scale } from "motion/react";
import { useState } from "react";
import ToolTip from "./ToolTip";

export type favPersonType = {
    id: number;
    visibleWhenUnchecked?: boolean;
    small?: boolean;
    clickable?: boolean;
};

export default function FavoritePerson({
    id,
    visibleWhenUnchecked = false,
    small = false,
    clickable = true,
    favoritePerson,
    setFavoritePerson,
}: favPersonType) {
    // const [favoritePerson, setFavoritePerson] = useState(
    //     localStorage.getItem("favoritePersonID")
    // );

    function handleFavoritePerson(personID: number) {
        const currentID = localStorage.getItem("favoritePersonID");

        if (currentID && currentID === personID.toString()) {
            // Same ID clicked → clear it
            localStorage.setItem("favoritePersonID", "");
            return "";
        } else {
            // Different ID or no ID → store new one
            localStorage.setItem("favoritePersonID", personID.toString());
            return personID.toString();
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                position: "relative",
            }}
        >
            {/*Tooltip not shown on every attendant, only when the star is possible to be set */}
            {visibleWhenUnchecked && (
                <ToolTip
                    text={
                        "Sæt denne bruger som standardbruger. Ved efterfølgende klik på “Tjek ind/ud” åbnes standardbrugeren automatisk. Valget gemmes kun lokalt på denne enhed."
                    }
                />
            )}

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
            >
                {favoritePerson && favoritePerson == id ? (
                    <StarIconFilled
                        style={
                            small
                                ? { width: "20px", height: "20px" }
                                : { width: "30px", height: "30px" }
                        }
                        className="star-icon"
                        onClick={() =>
                            clickable &&
                            setFavoritePerson(handleFavoritePerson(id))
                        }
                    />
                ) : (
                    visibleWhenUnchecked && (
                        <StarIcon
                            style={{ width: "30px", height: "30px" }}
                            className="star-icon"
                            onClick={() =>
                                clickable &&
                                setFavoritePerson(handleFavoritePerson(id))
                            }
                        />
                    )
                )}
            </motion.div>
        </div>
    );
}
