import { Meta, StoryObj } from '@storybook/react/*';
import Checkbox from './Checkbox';

const meta: Meta = {
    title: 'Components/Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        id: 'checkbox',
        label: 'Checkbox',
        checked: false,
    },
};
