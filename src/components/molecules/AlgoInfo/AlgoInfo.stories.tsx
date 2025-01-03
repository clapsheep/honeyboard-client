import { Meta, StoryObj } from '@storybook/react';
import AlgoInfo from './AlgoInfo';
import { useState } from 'react';

const meta: Meta = {
    title: 'Components/Molecules/AlgoInfo',
    component: AlgoInfo,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="flex items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AlgoInfo>;

export default meta;

type Story = StoryObj<typeof AlgoInfo>;

type AlgoInfoHooksProps = {
    memory: string;
    runtime: string;
    languageId: string;
};

const AlgoInfoWithHooks = (args: AlgoInfoHooksProps) => {
    const [memory, setMemory] = useState(args.memory);
    const [runtime, setRuntime] = useState(args.runtime);
    const [languageId, setlanguageId] = useState(args.languageId);

    const handleMemoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setMemory(value);
    };

    const handleRuntimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setRuntime(value);
    };

    return (
        <AlgoInfo
            memory={memory}
            runtime={runtime}
            languageId={languageId}
            onMemoryChange={handleMemoryChange}
            onRuntimeChange={handleRuntimeChange}
            onLanguageClick={(langId) => setlanguageId(langId)}
        />
    );
};

export const Default: Story = {
    args: {
        memory: '19396',
        runtime: '125',
        languageId: '1',
    },
    render: (args) => (
        <AlgoInfoWithHooks
            memory={args.memory}
            runtime={args.runtime}
            languageId={args.languageId}
        />
    ),
};

export const WithoutValue: Story = {
    args: {
        memory: '',
        runtime: '',
        languageId: '1',
    },
    render: (args) => (
        <AlgoInfoWithHooks
            memory={args.memory}
            runtime={args.runtime}
            languageId={args.languageId}
        />
    ),
};
