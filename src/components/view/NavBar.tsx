import React from 'react';
import { Segment, Menu } from "semantic-ui-react";

export const Navbar: React.FC = () => {
    return (
        <Segment inverted style={{ borderRadius: 0 }} className='w-100'>
            <Menu inverted secondary stackable>
                <Menu.Item header>
                    SSHS Snack Data
                </Menu.Item>
            </Menu>
        </Segment>
    )
}