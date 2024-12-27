import type { Meta, StoryObj } from '@storybook/react';
import StudentInfo from './StudentInfo';
import { action } from '@storybook/addon-actions';

const meta = {
    title: 'Components/molecules/StudentInfo',
    component: StudentInfo,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[1000px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof StudentInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: '박성문',
        gisu: 12,
        email: 'sevenknights@ssafy.com',
        isMember: false,
        onClick: action('Default button clicked'),
    },
};
