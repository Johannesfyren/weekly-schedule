import fetchImage from "../utils/fetchImage";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import imgTest from "../assets/react.svg";
import Button from "./Button";

export type profileImageType = {
    imgUrl?: string;
    id: number;
    name: string;
};
export default function ProfileImage({ id, imgUrl, name }: profileImageType) {
    const [publicUrl, setPublicUrl] = useState("");
    const [videoStreamActivated, setVideoStreamActivated] = useState(false);
    const [showMediaMenu, setShowMediaMenu] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const inputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    let file: React.HTMLInputTypeAttribute;

    useEffect(() => {
        console.log("test", imgUrl);
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
                    video: { width: 500, height: 500 },
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

    const handleImgUpload = async (file: React.HTMLInputTypeAttribute) => {
        const { error } = await supabase.storage
            .from("profile-pictures")
            .upload(`PF/${name.replace(/[\sæøå]/gi, "")}image.png`, file, {
                cacheControl: "0",
                upsert: true,
            });
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
                <img
                    src={imgTest}
                    alt=""
                    className="btn-edit-pp"
                    onClick={() => setShowMediaMenu(true)}
                />

                {showMediaMenu && (
                    <div className="media-menu">
                        <div>
                            <input
                                type="file"
                                onChange={(event) => {
                                    console.log("event detected");
                                    file = event.target.files[0];
                                    if (file) {
                                        handleImgUpload(file);
                                    }
                                }}
                                ref={inputRef}
                                name="img-upload"
                                onClick={() => console.log("yo")}
                            />
                        </div>

                        <div
                            onClick={() => {
                                setVideoStreamActivated(true);
                            }}
                        >
                            Tag billede
                        </div>
                        {videoStreamActivated && (
                            <div className="video-frame">
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
                                                        handleImgUpload(blob)
                                                    );
                                                setVideoStreamActivated(false);
                                                setCapturedImage(null);
                                                videoRef.current.srcObject
                                                    .getTracks()[0]
                                                    .stop();
                                            }}
                                        ></Button>
                                    )}
                                </div>
                                <Button
                                    type="Secondary"
                                    clickEvent={() => {
                                        setVideoStreamActivated(false);
                                        setCapturedImage(null);
                                        videoRef.current.srcObject
                                            .getTracks()[0]
                                            .stop();
                                        setShowMediaMenu(false);
                                    }}
                                    name="Annullér"
                                ></Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {}
        </>
    );
}
