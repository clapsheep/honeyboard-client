import Icon from '../Icon/Icon';

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <Icon id={checked ? 'checkbox-checked' : 'checkbox-default'} />
            <label htmlFor={id}>{label}</label>
            <input
                type="checkbox"
                id={id}
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};

export default Checkbox;
