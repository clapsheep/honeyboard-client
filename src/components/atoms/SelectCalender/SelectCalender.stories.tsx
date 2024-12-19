import type { Meta, StoryObj } from '@storybook/react';
import SelectCalender from './SelectCalender';
import { useEffect, useState } from 'react';

const meta = {
    title: 'Components/Atoms/SelectCalender',
    component: SelectCalender,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SelectCalender>;

export default meta;

type Story = StoryObj<typeof SelectCalenderWithHooks>;

const SelectCalenderWithHooks = ({ year = 2024, month = 12 }) => {
    const [date, setDate] = useState({
        year: year,
        month: month,
    });

    useEffect(() => {
        setDate({
            year: year,
            month: month,
        });
    }, [year, month]);

    const decreaseDate = () => {
        setDate((prev) => ({
            ...prev,
            month: prev.month === 1 ? 12 : prev.month - 1,
            year: prev.month === 1 ? prev.year - 1 : prev.year,
        }));
    };

    const increaseDate = () => {
        setDate((prev) => ({
            ...prev,
            month: prev.month === 12 ? 1 : prev.month + 1,
            year: prev.month === 12 ? prev.year + 1 : prev.year,
        }));
    };

    return (
        <SelectCalender
            year={date.year}
            month={date.month}
            onClickLeft={decreaseDate}
            onClickRight={increaseDate}
        />
    );
};

export const Default: Story = {
    args: {
        year: 2024,
        month: 12,
    },
    render: (args) => (
        <SelectCalenderWithHooks year={args.year} month={args.month} />
    ),
};
