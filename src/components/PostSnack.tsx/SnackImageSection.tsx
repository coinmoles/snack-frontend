import React from "react";
import { useSelector } from "react-redux";
import { Grid, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { SnackCropped } from "./SnackCropped";
import { SnackEdit } from "./SnackEdit";
import { SnackImage } from "./SnackImage";
import { SnackRowAndCol } from "./SnackRowAndCol";

export const SnackImageSection: React.FC = () => {
    const loadingCurrent = useSelector((state: RootState) => state.loading.current)
    
    const fullImageShow = loadingCurrent === "ImageExist" || 
        loadingCurrent === "ImageSectionSelected" ||
        loadingCurrent === "OCRLoading";
    const croppedImageShow = loadingCurrent === "OCRComplete" ||
        loadingCurrent === "PostLoading" ||
        loadingCurrent === "PostComplete";

    return (
        <Segment style={loadingCurrent === "NoImage" ? { display: "None" } : {}}>
            <Header as="h3" content="Read Snack Data from Image & Edit" />
            <Grid>
                <Grid.Column width="8">
                    {fullImageShow && 
                        <SnackImage />}
                    {croppedImageShow &&
                        <SnackCropped />}
                </Grid.Column>
                <Grid.Column width="8">
                    <SnackRowAndCol />
                    <SnackEdit />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}