import {styled} from "linaria/react";
import {theme} from "../theme";
import React from "react";

const SelectWrapper = styled.div`
    position: relative;
    &::after {
        content: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='10' height='10' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='%230048BA' /></g></svg>");
        top: 4px;
        right: 4px;
        position: absolute;
    }
`;

const SelectElement = styled.select`
    height: 2rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    background-color: unset;
    appearance: none;
    padding: 2px;
    width: 100%;

    &:focus-visible {
        outline: ${theme.focusOutlineSize} solid ${theme.colors.secondary};
    }
`

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    const {
        children,
        ...rest
    } = props;
    return (
        <SelectWrapper>
            <SelectElement {...rest}>
                {children}
            </SelectElement>
        </SelectWrapper>
    )
}

export default Select;
