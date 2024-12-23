import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    id: string;
    size?: number;
    color?: string;
}

const Icon = ({
    id,
    size = 16,
    color = 'currentColor',
    ...props
}: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            fill={color}
            viewBox="0 0 16 16"
            {...props}
        >
            <use href={`/src/assets/icons/_sprite.svg#${id}`} />
        </svg>
    );
};

export default Icon;
