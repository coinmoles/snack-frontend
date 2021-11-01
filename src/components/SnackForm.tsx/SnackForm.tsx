import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishPostLoading, resetPostLoading, startPostLoading } from "../../redux/loading/loadingSlice";
import { SnackEditSection } from "./SnackEditSection";
import { SnackUrlForm } from "./SnackUrlForm";

export const SnackForm: React.FC = () => {
    const snackDatas = useSelector((state: RootState) => state.snack.snackData)
    const postLoading = useSelector((state: RootState) => state.loading.post);
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
            dispatch(resetPostLoading());
            alert("Something Went Wrong(Probably a missing API KEY)");
        }
    }

    return (
        <Segment style={{overflow: "hidden"}}>
            <SnackUrlForm />
            <SnackEditSection />
            <Input value={pwd} label="API-KEY" onChange={(event) => setPwd(event.target.value)} />
            {postLoading === "None" && <Button floated="right" primary content="Submit" onClick={handleSubmit} />}
            {postLoading === "Loading" && <Button floated="right" primary content="Submitting" loading />}
            {postLoading === "Done" && <Button floated="right" primary content="Submitted" disabled />}
            

        </Segment>
    )
}