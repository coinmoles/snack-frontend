import React from "react";
import { useSelector } from "react-redux";
import { Grid, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { SnackEdit } from "./SnackEdit";
import { SnackImage } from "./SnackImage";
import { SnackRowAndCol } from "./SnackRowAndCol";

export const SnackImageSection: React.FC = () => {
    const imageLoading = useSelector((state: RootState) => state.loading.image)

    return (
        <Segment style={imageLoading === "None" ? { display: "None" } : {}}>
            <Header as="h3" content="Read Snack Data from Image & Edit" />
            <Grid>
                <Grid.Column width="8">
                    <SnackImage />
                </Grid.Column>
                <Grid.Column width="8">
                    <SnackRowAndCol />
                    <SnackEdit />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}