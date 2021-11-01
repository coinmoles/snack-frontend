import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";
import { RootState } from "../../redux";
import { SnackEditSection } from "./SnackEditSection";
import { SnackUrlForm } from "./SnackUrlForm";

export const SnackForm: React.FC = () => {
    const snackDatas = useSelector((state: RootState) => state.snack.snackData)
    const [pwd, setPwd] = useState("");
    
    const handleSubmit = async () => {
        for (const snackData of snackDatas) 
            if(!/^\s*$/g.test(snackData.snack)) {
                axios.post("https://snack-backend.herokuapp.com/snack/daily", snackData, {
                    headers: {
                        "x-api-key": pwd
                    }
                })
            await new Promise(f => setTimeout(f, 1000));
        }
    }

    return (
        <Segment style={{overflow: "hidden"}}>
            <SnackUrlForm />
            <SnackEditSection />
            <Input value={pwd} label="api-key" onChange={(event) => setPwd(event.target.value)} />
            <Button floated="right" primary content="Submit" onClick={handleSubmit} />
        </Segment>
    )
}