import { Meta, StoryObj } from '@storybook/react/*';
import Breadcrumb from './Breadcrumb';

const meta = {
    title: 'Components/Molecules/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        routes: [
            { path: '/', name: 'Home' },
            { path: '/about', name: 'About' },
        ],
    },
};
