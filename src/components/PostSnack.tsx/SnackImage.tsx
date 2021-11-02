import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Image, Ref } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishImageLoading, finishSnackLoading, resetPostLoading, startSnackLoading } from "../../redux/loading/loadingSlice";
import { setBaseRect } from "../../redux/rect/rectSlice";

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

export const SnackImage: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const ref = React.useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const [dragStart, setDragStart] = useState<Pos>({ notNull: false, x: null, y: null });

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

        const { x: x_base, y: y_base } = ref.current.getBoundingClientRect();
        const { clientWidth, clientHeight, naturalWidth, naturalHeight } = ref.current;
        
        const configX = (x: number): number =>
            Math.floor((x - x_base) * naturalWidth / clientWidth);
        const configY = (y: number): number =>
            Math.floor((y - y_base) * naturalHeight / clientHeight);

        const [xStart, xStop]: number[] = [dragStart.x, event.clientX]
            .sort((a: number, b: number) => a - b)
            .map(configX);
        const [yStart, yStop] = [dragStart.y, event.clientY]
            .sort((a: number, b: number) => a - b)
            .map(configY);

        dispatch(setBaseRect({ xStart, xStop, yStart, yStop }));
        dispatch(finishImageLoading());
        dispatch(resetPostLoading());
        setDragStart({ notNull: false, x: null, y: null });
    }

    return (
        <Container>
            <Header as="h4" content="Snack Image (Drag to select the table)" />
            <Ref innerRef={ref} >
                <Image
                    crossOrigin="Anonymous"
                    src={imageUrl}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            </Ref>
        </Container>
    )
}