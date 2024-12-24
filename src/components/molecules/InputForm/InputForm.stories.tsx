import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputForm from './InputForm';

const meta = {
    title: 'Components/Molecules/InputForm',
    component: InputForm,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof InputForm>;

export const Default: Story = {
    args: {
        label: '이메일',

        type: 'email',
        placeholder: '이메일을 입력해주세요.',
        onChange: fn((e) => console.log(e.target.value)),
    },
};

export const WithError: Story = {
    args: {
        label: '이메일',

        type: 'email',
        placeholder: '이메일을 입력해주세요.',
        onChange: fn((e) => console.log(e.target.value)),

        errorMessage: '이메일 형식이 올바르지 않습니다.',
    },
};
