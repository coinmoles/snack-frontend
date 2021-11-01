import React from "react";
import { useSelector } from "react-redux";
import { Image } from "semantic-ui-react";
import { RootState } from "../../redux";

export const SnackEditImage: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);

    return (
        <Image src={imageUrl}>
        </Image>
    )
}