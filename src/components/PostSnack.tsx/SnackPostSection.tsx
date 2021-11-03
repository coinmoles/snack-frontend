import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Input, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishOCRLoading, finishPostLoading, startPostLoading } from "../../redux/loading/loadingSlice";

export const SnackPostSection: React.FC = () => {
    const snackDatas = useSelector((state: RootState) => state.snack.snackData);
    const loadingCurrent = useSelector((state: RootState) => state.loading.current);
    
    const [pwd, setPwd] = useState("");

    const dispatch = useDispatch();

    const hidePost = loadingCurrent !== "PostLoading" && 
        loadingCurrent !== "PostComplete" &&
        loadingCurrent !== "OCRComplete";
    const loadingButton = loadingCurrent === "PostLoading";
    const disableButton = loadingCurrent === "PostComplete";

    
    const handleSubmit = async () => {
        
        dispatch(startPostLoading())
        try {
            for (const snackData of snackDatas) 
            if(!/^\s*$/g.test(snackData.snack)) {
                await axios.post("https://snack-backend.herokuapp.com/snack/daily", snackData, {
                    headers: {
                        "x-api-key": pwd
                    }
                });
                await new Promise(f => setTimeout(f, 1000));
            }
            dispatch(finishPostLoading());
        } catch(err) {
            dispatch(finishOCRLoading());
            alert("Something Went Wrong(Probably a missing API KEY)");
        }
    }

    return (
        <Segment style={hidePost ? { display: "None" } : {}} className="overflow-hidden">
            <Header as="h3" content="Post the Snack Data" />
            <Input value={pwd} fluid label="API-KEY" className="mb-4" onChange={(event) => setPwd(event.target.value)} />
            <Button 
                primary
                floated="right"
                content="Submit"
                loading={loadingButton}
                disabled={disableButton}
                onClick={handleSubmit}
            />
        </Segment>
    )

}