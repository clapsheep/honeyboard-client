import { Meta, StoryObj } from '@storybook/react';
import ChatInput from './ChatInput';
import { fn } from '@storybook/test';
import { useState, useEffect, useRef } from 'react';

// 입력값에 따른 textarea 높이 조절 훅
const useAutoHeight = (value: string) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '0px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    return textareaRef;
};

interface ChatInputProps {
    id: string;
    value: string;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const RenderChatInput = (args: ChatInputProps) => {
    const [value, setValue] = useState('');
    const textareaRef = useAutoHeight(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        args.onChange(e);
    };

    return (
        <ChatInput
            {...args}
            value={value}
            onChange={handleChange}
            textareaRef={textareaRef}
        />
    );
};

const meta: Meta<typeof ChatInput> = {
    title: 'Components/Atoms/ChatInput',
    component: ChatInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            return (
                <div className="w-[412px]">
                    <Story />
                </div>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
    render: RenderChatInput,
    args: {
        id: 'sendChat',
        value: '',
        onChange: fn((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            return e.target.value;
        }),
        onKeyDown: fn((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                alert('엔터 제출');
            }
        }),
        onClick: fn(() => alert('작동')),
    },
};
