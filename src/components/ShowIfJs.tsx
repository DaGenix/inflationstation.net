import React from "react";

type Props = {
    component?: React.ElementType,
    children?: React.ReactNode,
}

const ShowIfJs: React.FC<Props> = (props) => {
    const Component = props.component || "div";
    return (
        <Component className="show-if-js">
            {props.children}
        </Component>
    )
}

export default ShowIfJs;
