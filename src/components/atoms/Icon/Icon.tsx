import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    id: string;
    size?: number;
    color?: string;
}

const Icon = ({
    id,
    size = 24,
    color = 'currentColor',
    ...props
}: IconProps) => {
    return (
        <svg width={size} height={size} fill={color} {...props}>
            <use href={`/src/assets/icons/_sprite.svg#${id}`} />
        </svg>
    );
};

export default Icon;
