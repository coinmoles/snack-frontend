import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Loader } from "semantic-ui-react";
import { RootState } from "../../redux";
import { nextDay, prevDay, setSingleSnack } from "../../redux/snack/snackSlice";

export const SnackEdit: React.FC = () => {
    const dispatch = useDispatch();
    const [newSnack, setNewSnack] = useState("");
    const snackData = useSelector((state: RootState) => state.snack.snackData[state.snack.index]);
    const snackLoading = useSelector((state: RootState) => state.loading.snacks);
    useEffect(() => {
        if (snackData !== undefined) 
            setNewSnack(snackData.snack)
    }, [snackData]);

    if (snackLoading === "None")
        return <div />
    else if (snackLoading === "Loading")
        return <Loader active />
    else {
        const { year, month, day } = snackData;
        return (
            <Form style={{overflow: "hidden"}} className="mt-28">
                <Form.Group widths="equal">
                    <Form.Input fluid label="Year" value={year} placeholder="Year" />
                    <Form.Input fluid label="Month" value={month} placeholder="Month" />
                    <Form.Input fluid label="Day" value={day} placeholder="day" />
                </Form.Group>
                <Form.TextArea rows="5" value={newSnack} onChange={(event) => {setNewSnack(event.target.value);}} style={{resize: "None"}} />
                <Form.Group widths="equal">
                    <Form.Button fluid floated="left" icon="arrow left" onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(prevDay());
                    }}/>
                    <Form.Button fluid floated="right" icon="arrow right" onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(nextDay());
                    }} />
                </Form.Group>
            </Form>
        )
    }
}