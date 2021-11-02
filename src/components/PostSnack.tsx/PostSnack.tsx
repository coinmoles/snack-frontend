import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { SnackPostSection } from "./SnackPostSection";
import { SnackImageSection } from "./SnackImageSection";
import { SnackUrlForm } from "./SnackUrlSection";

export const PostSnack: React.FC = () => {
    return (
        <Segment style={{overflow: "hidden"}}>
            <Header as="h1" content="Post Snack Data from Image" />
            <SnackUrlForm />
            <SnackImageSection />
            <SnackPostSection />
        </Segment>
    )
}