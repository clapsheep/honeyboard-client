import type { Meta, StoryObj } from '@storybook/react';
import EmailVerificationModal from './EmailVerificationModal';

const meta = {
    title: 'Components/Organisms/EmailVerificationModal',
    component: EmailVerificationModal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-100">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof EmailVerificationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        email: 'example@email.com',
        onClose: () => {},
        onSubmit: (email: string, code: string) => {
            console.log('Email:', email, 'Code:', code);
        },
    },
};
