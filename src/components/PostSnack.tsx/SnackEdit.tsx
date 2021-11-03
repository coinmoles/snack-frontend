import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Header, Loader } from "semantic-ui-react";
import { RootState } from "../../redux";
import { deleteSingleSnack, nextDay, prevDay, setSingleSnack } from "../../redux/snack/snackSlice";

export const SnackEdit: React.FC = () => {
    const snackData = useSelector((state: RootState) => state.snack.snackData[state.snack.index]);
    const loadingCurrent = useSelector((state: RootState) => state.loading.current);
    
    const [newSnack, setNewSnack] = useState("");
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        setNewSnack(snackData !== undefined ? snackData.snack : "");
    }, [snackData]);
    
    const disableEdit = loadingCurrent !== "OCRComplete";
    
    const year = snackData !== undefined ? snackData.year : "";
    const month = snackData !== undefined ? snackData.month : "";
    const day = snackData !== undefined ? snackData.day : "";

    return (
        <Form style={{overflow: "hidden"}}>
            <Header as="h4" content="Edit Snack Data" />
            <Form.Group widths="equal">
                <Form.Input 
                    fluid
                    label="Year"
                    placeholder="Year"
                    value={year}
                    disabled={disableEdit} 
                />
                <Form.Input 
                    fluid
                    label="Month"
                    placeholder="Month" 
                    value={month}
                    disabled={disableEdit} 
                />
                <Form.Input  
                    fluid 
                    label="Day"
                    placeholder="Day" 
                    value={day}
                    disabled={disableEdit}
                />
            </Form.Group>

            <Form.TextArea 
                rows="5"
                value={newSnack}
                disabled={disableEdit} 
                onChange={(event) => setNewSnack(event.target.value)} 
                style={{resize: "None"}} 
            />
            
            <Container className="overflow-hidden mb-3">
                <Form.Button  
                    floated="right" 
                    content="Delete" 
                    color="red" 
                    disabled={disableEdit}
                    onClick={() => dispatch(deleteSingleSnack())} 
                />
            </Container>
            
            <Form.Group widths="equal">
                <Form.Button 
                    fluid 
                    floated="left" 
                    icon="arrow left" 
                    disabled={disableEdit} 
                    onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(prevDay());
                    }}
                />
                <Form.Button 
                    fluid 
                    floated="right" 
                    icon="arrow right"  
                    disabled={disableEdit} 
                    onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(nextDay());
                    }} 
                />
            </Form.Group>
        </Form>
    )
}