import type { Meta, StoryObj } from '@storybook/react';
import Persona from './Persona';

const meta = {
    title: 'Components/Atoms/Persona',
    component: Persona,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Persona>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: '박성문',
        generation: '12',
    },
};
