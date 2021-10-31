import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { SnackEditSection } from "./SnackEditSection";
import { SnackUrlForm } from "./SnackUrlForm";

export const SnackForm: React.FC = () => {
    return (
        <Segment style={{overflow: "hidden"}}>
            <SnackUrlForm />
            <SnackEditSection />
            <Button floated="right" primary content="Submit" />
        </Segment>
    )
}