import React from "react";
import { withBasicView } from "../view/withBasicView";
import { PostSnack } from "./PostSnack";

export const PostSnackPage: React.FC = () => {
    const SnackFormWithView = withBasicView(PostSnack);

    return <SnackFormWithView />
}