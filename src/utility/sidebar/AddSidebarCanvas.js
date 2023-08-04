
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export default function AddSidebarCanvas() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleTop, setVisibleTop] = useState(false);
    const [visibleBottom, setVisibleBottom] = useState(false);

    return (
        <>
            <div className="card">
                <div className="flex gap-2 justify-content-center">
                    <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} />
                    <Button icon="pi pi-arrow-left" onClick={() => setVisibleRight(true)} />
                    <Button icon="pi pi-arrow-down" onClick={() => setVisibleTop(true)} />
                    <Button icon="pi pi-arrow-up" onClick={() => setVisibleBottom(true)} />
                </div>

                <Sidebar visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <h2>Left Sidebar</h2>

                </Sidebar>

                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h2>Right Sidebar</h2>

                </Sidebar>

                <Sidebar visible={visibleTop} position="top" onHide={() => setVisibleTop(false)}>
                    <h2>Top Sidebar</h2>

                </Sidebar>

                <Sidebar visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)}>
                    <h2>Bottom Sidebar</h2>

                </Sidebar>
            </div>
        </>
    )
}
