import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Image, Ref } from "semantic-ui-react";
import { RootState } from "../../redux";

interface PosNull {
    notNull: false,
    x: null | undefined,
    y: null | undefined
}

interface PosNotNull {
    notNull: true,
    x: number,
    y: number
}

type Pos = PosNotNull | PosNull

export const SnackEditImage: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const ref = React.useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const [dragStart, setDragStart] = useState<Pos>({ notNull: false, x: null, y: null });
    const [topLeft, setTopLeft] = useState<Pos>({ notNull: false, x: null, y: null });
    const [bottomRight, setBottomRight] = useState<Pos>({ notNull: false, x: null, y: null })
    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setDragStart({ notNull: true, x: event.clientX, y: event.clientY });
        event.preventDefault();
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!dragStart.notNull)
            return;
        if (event.clientX === null || event.clientX === undefined || event.clientY === null || event.clientY === undefined)
            return;
        if (ref.current === undefined || ref.current === null)
            return

        const [x_left, x_right]: number[] = [dragStart.x, event.clientX]!.sort((a: number, b: number) => a - b)
        const [y_top, y_bottom] = [dragStart.y, event.clientY].sort((a: number, b: number) => a - b);
        const { x: x_base, y: y_base } = ref.current.getBoundingClientRect();
        const { clientWidth: width, clientHeight: height, naturalWidth, naturalHeight } = ref.current;

        const configPos = (x: number, y: number): PosNotNull => {
            return {
                notNull: true,
                x: Math.floor((x - x_base) * naturalWidth / width),
                y: Math.floor((y - y_base) * naturalHeight / height)
            }
        }

        setTopLeft(configPos(x_left, y_top));
        setBottomRight(configPos(x_right, y_bottom));
        setDragStart({ notNull: false, x: null, y: null })
    }


    return (
        <Container>
            <Ref innerRef={ref} >
                <Image
                    src={imageUrl}
                    onClick={() => {
                        console.log(topLeft);
                        console.log(bottomRight);
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            </Ref>
            <Form className="mt-3 overflow-hidden">
                <Form.Group widths="equal">
                    <Form.Input
                        disabled={!topLeft.notNull}
                        type="number"
                        onChange={(event) => setCols(parseInt(event.target.value))}
                        fluid
                        label="Cols" />
                    <Form.Input
                        disabled={!topLeft.notNull}
                        type="number"
                        onChange={(event) => setRows(parseInt(event.target.value))}
                        fluid
                        label="Rows" />
                </Form.Group>
                <Form.Button disabled={!topLeft.notNull} floated="right" content="OCR" />
            </Form>
        </Container>
    )
}