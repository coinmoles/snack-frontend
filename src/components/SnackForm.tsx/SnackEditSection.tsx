import React from "react";
import { useSelector } from "react-redux";
import { Grid, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { SnackEdit } from "./SnackEdit";
import { SnackImage } from "./SnackImage";

export const SnackEditSection: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl)

    return (
        <Segment style={imageUrl === undefined ? { display: "None" } : {}}>
            <Header as="h3" content="Edit" />
            <Grid>
                <Grid.Column width="8">
                    <SnackImage />
                </Grid.Column>
                <Grid.Column width="8">
                    <SnackEdit />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}