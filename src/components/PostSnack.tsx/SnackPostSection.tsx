import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Input, Segment } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishOCRLoading, finishPostLoading, startPostLoading } from "../../redux/loading/loadingSlice";

export const SnackPostSection: React.FC = () => {
    const snackDatas = useSelector((state: RootState) => state.snack.snackData);
    const loadingCurrent = useSelector((state: RootState) => state.loading.current);
    const dispatch = useDispatch();
    const [pwd, setPwd] = useState("");
    
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
        <Segment style={(loadingCurrent !== "PostLoading" && loadingCurrent !== "PostComplete")  ? { display: "None" } : {}} className="overflow-hidden">
            <Header as="h3" content="Post the Snack Data" />
            <Input value={pwd} fluid label="API-KEY" className="mb-4" onChange={(event) => setPwd(event.target.value)} />
            {loadingCurrent === "OCRComplete" && <Button floated="right" primary content="Submit" onClick={handleSubmit} />}
            {loadingCurrent === "PostLoading" && <Button floated="right" primary content="Submitting" loading />}
            {loadingCurrent === "PostComplete" && <Button floated="right" primary content="Submitted" disabled />}
        </Segment>
    )

}