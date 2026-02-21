// @ts-nocheck
import fetchImage from "../utils/fetchImage";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import editIcon from "../assets/edit-icon.svg";
import imgIcon from "../assets/black-image-icon.svg";
import camIcon from "../assets/black-cam-icon.svg";
import gifIcon from "../assets/gif-icon.gif";
import Button from "./Button";
import { GiphyFetch } from "@giphy/js-fetch-api";
const gf = new GiphyFetch("L53vPQVtedmucsVe3aImzYfIR0pVcA0o");
import GifGrid from "./GifGrid";
import imageCompression from "browser-image-compression";

export type profileImageType = {
    imgUrl?: string;
    id: number;
    name: string;
};
export default function ProfileImage({ id, imgUrl, name }: profileImageType) {
    const [publicUrl, setPublicUrl] = useState("");
    const [videoStreamActivated, setVideoStreamActivated] = useState(false);
    const [showMediaMenu, setShowMediaMenu] = useState(false);
    const [showGifContainer, setShowGifContainer] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [gifSearch, setGifSearch] = useState("");
    const [gifData, setGifData] = useState();
    const [selectedGif, setSelectedGif] = useState(null);
    const inputRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    let file: React.HTMLInputTypeAttribute;

    useEffect(() => {
        if (imgUrl) {
            async function getImg() {
                setPublicUrl(await fetchImage(imgUrl!));
            }
            getImg();
        }
    }, [imgUrl]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            navigator.mediaDevices
                .getUserMedia({
                    video: { width: 200, height: 200 },
                    audio: false,
                })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error(`An error occurred: ${err}`);
                });
        }
    }, [videoStreamActivated]);

    const fetchGifs = async () => {
        const { data: gifs } = await gf.search(gifSearch, {
            sort: "relevant",
            lang: "en",
            limit: 25,
            type: "gifs",
        });
        console.log(gifs);
        setGifData(gifs);
        return gifs;
    };
    const handleImgUpload = async (file: React.HTMLInputTypeAttribute) => {
        //TODO: Handle compression of images before storing
        //Test start
        const options = {
            maxSizeMB: 1, // target max file size
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);

            console.log("Original:", file.size / 1024, "KB");
            console.log("Compressed:", compressedFile.size / 1024, "KB");

            const { error } = await supabase.storage
                .from("profile-pictures")
                .upload(
                    `PF/${name.replace(/[\sæøå]/gi, "")}image.png`,
                    compressedFile,
                    {
                        cacheControl: "0",
                        upsert: true,
                    },
                );
            if (error) {
                console.error("Upload error:", error.message);
            } else {
                const { error } = await supabase
                    .from("user")
                    .update({
                        img_ref: `${name.replace(/[\sæøå]/gi, "")}image.png`,
                    })
                    .eq("id", id);

                if (error) {
                    console.log(error);
                    alert("Der skete en fejl ved upload af billede");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const takePicture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL("image/png");
            setCapturedImage(imageDataUrl);
        }
    };

    return (
        <>
            <div className="avatar-big">
                {!publicUrl
                    ? name && name.slice(0, 2).toUpperCase()
                    : publicUrl && (
                          <img
                              src={publicUrl}
                              className="profile-pictures"
                          ></img>
                      )}

                {/* USER MEDIA UPLOAD FUNCTIONALITY */}
                <div className="btn-edit-pp-container">
                    <img
                        src={editIcon}
                        alt=""
                        className="btn-edit-pp"
                        onClick={() => setShowMediaMenu(true)}
                    />
                </div>

                {showMediaMenu && (
                    <div className="media-menu">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "5px",
                                alignItems: "center",
                            }}
                        >
                            <img src={imgIcon} alt="" className="btn-edit-pp" />
                            <input
                                type="file"
                                onChange={(event) => {
                                    file = event.target.files[0];
                                    if (file) {
                                        handleImgUpload(file);
                                        setShowMediaMenu(false);
                                    }
                                }}
                                ref={inputRef}
                                name="img-upload"
                                style={{ padding: "-4px" }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "5px",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                src={camIcon}
                                alt=""
                                className="btn-edit-pp"
                                onClick={() => setVideoStreamActivated(true)}
                            />

                            <div
                                onClick={() => {
                                    setVideoStreamActivated(true);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                Tag billede
                            </div>
                        </div>
                        <div
                            onClick={
                                () => setShowGifContainer(true) //!showGifContainer
                            }
                        >
                            {showGifContainer ? (
                                <div>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setGifSearch(e.target.value);
                                            fetchGifs();
                                        }}
                                    />

                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateRows: "auto",
                                            gridTemplateColumns:
                                                "75px 75px 75px",
                                            width: "225px",
                                            height: "200px",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        {gifData &&
                                            gifData.map((gif, index) => {
                                                return (
                                                    <GifGrid
                                                        imgurl={
                                                            gif.images.downsized
                                                                .url
                                                        }
                                                        userID={id}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img src={gifIcon} alt="" height={"20px"} />
                                    <p style={{ color: "black" }}>Tilføj GIF</p>
                                </div>
                            )}
                        </div>

                        {videoStreamActivated && (
                            <div className="profile-container video-frame hide-scrollbar">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    <video id="video" ref={videoRef}></video>
                                    <button
                                        className="btn-camera"
                                        onClick={takePicture}
                                    >
                                        Tag billede
                                    </button>
                                </div>

                                <canvas ref={canvasRef}></canvas>
                                <div className="output">
                                    <img
                                        ref={imgRef}
                                        src={capturedImage}
                                        alt="Billede taget fremkommer her."
                                        style={{ justifySelf: "self-start" }}
                                    />
                                    {capturedImage && (
                                        <Button
                                            type={"Secondary"}
                                            name="Benyt billede"
                                            clickEvent={() => {
                                                // Convert dataURL to Blob for upload
                                                fetch(capturedImage)
                                                    .then((res) => res.blob())
                                                    .then((blob) =>
                                                        handleImgUpload(blob),
                                                    );
                                                setVideoStreamActivated(false);
                                                setCapturedImage(null);
                                                videoRef.current?.srcObject &&
                                                    videoRef.current.srcObject // @ts-ignore
                                                        .getTracks()[0]
                                                        .stop();
                                                setShowMediaMenu(false);
                                            }}
                                        ></Button>
                                    )}
                                </div>
                                <button
                                    type="Secondary"
                                    onClick={() => {
                                        setVideoStreamActivated(false);
                                        setCapturedImage(null);
                                        videoRef.current?.srcObject &&
                                            videoRef.current.srcObject // @ts-ignore
                                                .getTracks()[0]
                                                .stop();
                                        setShowMediaMenu(false);
                                    }}
                                    className="util_flex-end btn-secondary"
                                >
                                    Annullér
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {}
        </>
    );
}
