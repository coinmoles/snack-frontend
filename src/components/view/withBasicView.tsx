import React from 'react';
import { Navbar } from './NavBar';

export const withBasicView = (
    BaseComponent: React.ComponentType
) => {
    return class extends React.Component {
        render() {
            return (
                <div className='text-left'>
                    <div className="items-center w-screen min-h-screen">
                        <Navbar />
                        <div className="w-screen h-full flex items-center justify-center">
                            <div className="w-full max-w-7xl p-10">
                                <BaseComponent />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}