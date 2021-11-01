import React from "react";
import { useSelector } from "react-redux";
import { Grid, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { SnackEditForm } from "./SnackEditForm";
import { SnackEditImage } from "./SnackEditImage";

export const SnackEditSection: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl)

    return (
        <Segment style={imageUrl === undefined ? { display: "None" } : {}}>
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