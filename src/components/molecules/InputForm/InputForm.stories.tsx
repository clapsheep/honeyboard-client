import { Meta, StoryObj } from '@storybook/react';
import InputForm from './InputForm';
const meta: Meta = {
    title: 'Components/Molecules/InputForm',
    component: InputForm,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof InputForm>;
export default meta;

type Story = StoryObj<typeof InputForm>;
export const Default: Story = {
    args: {
        id: 'input',
        label: '레이블',
        placeholder: 'placeholder',
        type: 'text',
        readonly: false,
        buttonName: 'button',
        value: '',
        onClick: () => {
            alert('클릭!');
        },
        errorMessage: '에러가 발생했습니다.',
        showLabel: true,
    },
};

export const Required: Story = {
    args: {
        id: 'input',
        label: '레이블',
        placeholder: 'placeholder',
        required: true,
        type: 'text',
        readonly: false,
        buttonName: 'button',
        value: '',
        onClick: () => {
            alert('클릭!');
        },
        errorMessage: '에러가 발생했습니다.',
        showLabel: true,
    },
};

export const WithoutButton: Story = {
    args: {
        id: 'input',
        label: '레이블',
        placeholder: 'placeholder',
        type: 'text',
        errorMessage: '에러가 발생했습니다.',
        readonly: false,
        showLabel: true,
    },
};
export const WithoutLabel: Story = {
    args: {
        id: 'input',
        label: '레이블',
        showLabel: false,
        placeholder: 'placeholder',
        type: 'text',
        errorMessage: '에러가 발생했습니다.',
        readonly: false,
    },
};
