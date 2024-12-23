import type { Meta, StoryObj } from '@storybook/react';
import ButtonPDF from './ButtonPDF';

const meta = {
    title: 'Components/Atoms/ButtonPDF',
    component: ButtonPDF,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ButtonPDF>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onClick: () => alert('PDF 다운로드 클릭'),
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        onClick: () => alert('disabled false 상태'),
    },
};
