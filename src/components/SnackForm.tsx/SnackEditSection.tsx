import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { SnackEditForm } from "./SnackEditForm";
import { SnackEditImage } from "./SnackEditImage";

export const SnackEditSection: React.FC = () => {
    return (
        <Segment>
            <Header as="h3" content="Edit" />
            <Grid>
                <Grid.Column width="8">
                    <SnackEditImage />
                </Grid.Column>
                <Grid.Column width="8">
                    <SnackEditForm />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}