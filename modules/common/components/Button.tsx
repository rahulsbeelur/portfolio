import { IconType, SVGIcons } from '../../../icons/SVGIcons';

type Position = 'left' | 'right';

interface ButtonProps {
    classes: string;
    isDisabled?: boolean;
    text?: string;
    icon?: {
        src: IconType;
        position: Position;
        width?: number;
        height?: number;
        className?: string;
    };
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    mouseover?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    ariaLabel?: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
    const { classes, isDisabled, text, icon, onClick, mouseover, ariaLabel } = props;
    return (
        <button
            disabled={isDisabled}
            aria-label={ariaLabel}
            className={`flex ${
                icon?.position === 'right' ? 'flex-row-reverse' : 'flex-row'
            } ${classes}`}
            onClick={onClick}
            onMouseEnter={mouseover}>
            {icon && (
                <SVGIcons
                    type={icon.src}
                    width={icon?.width}
                    height={icon?.height}
                    className={icon.className}
                />
            )}
            {text}
        </button>
    );
};
