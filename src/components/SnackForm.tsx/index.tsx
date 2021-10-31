import React from "react";
import { withBasicView } from "../view/withBasicView";
import { SnackForm } from "./SnackForm";

export const SnackFormPage: React.FC = () => {
    const SnackFormWithView = withBasicView(SnackForm);

    return <SnackFormWithView />
}