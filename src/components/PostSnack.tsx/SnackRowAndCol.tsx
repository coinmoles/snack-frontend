import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Header } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishSnackLoading, resetPostLoading, startSnackLoading } from "../../redux/loading/loadingSlice";
import { setCards } from "../../redux/rect/rectSlice";
import { initSnack } from "../../redux/snack/snackSlice";
import { imageToSnack } from "../../utils/imageToSnack";

export const SnackRowAndCol: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const imageLoading = useSelector((state: RootState) => state.loading.image);
    const { xStart, xStop, yStart, yStop } = useSelector((state: RootState) => state.rect)
    const dispatch = useDispatch();
    const [yCard, setYCard] = useState<number>(0);
    const [xCard, setXCard] = useState<number>(0);

    const handleSubmit = async () => {
        if (imageUrl === undefined)
            return;

        const linspace = (start: number, stop: number, card: number): number[] => {
            let arr: number[] = [];
            let step = (stop - start) / card;
            for (let i = 0; i < card + 1; i++) {
                arr.push(Math.floor(start + (step * i)));
            }
            return arr;
        }

        dispatch(setCards({ xCard, yCard }))
        dispatch(startSnackLoading());
        dispatch(resetPostLoading());
        const snackDatas = await imageToSnack(imageUrl, linspace(yStart, yStop, yCard), linspace(xStart, xStop, xCard));

        dispatch(initSnack(snackDatas));
        dispatch(finishSnackLoading());
    }

    return (
        <Form className="mt-3 overflow-hidden" onSubmit={handleSubmit}>
            <Header as="h4" content="Set Column & Row Number" />
            <Form.Group widths="equal">
                <Form.Input
                    disabled={imageLoading === "Loading"}
                    type="number"
                    onChange={(event) => setXCard(parseInt(event.target.value))}
                    fluid
                    label="Col Num" />
                <Form.Input
                    disabled={imageLoading === "Loading"}
                    type="number"
                    onChange={(event) => setYCard(parseInt(event.target.value))}
                    fluid
                    label="Row Num" />
            </Form.Group>
            <Form.Button disabled={imageLoading === "Loading"} floated="right" content="OCR" />
        </Form>
    )
}