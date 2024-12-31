import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import Breadcrumb from './Breadcrumb';

const meta = {
    title: 'Components/Molecules/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        pathname: '/study/web/concept',
    },
};
