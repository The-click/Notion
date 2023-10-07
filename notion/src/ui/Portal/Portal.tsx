import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal: React.FC<PortalProps> = (props) => {
    const { children, element = document.body } = props;

    const [container] = useState(() => document.createElement("div"));

    useEffect(() => {
        element.appendChild(container);

        return () => {
            element.removeChild(container);
        };
    }, []);

    return createPortal(children, container);
};
