import { Meta, StoryObj } from '@storybook/react';
import FilterChip from './FilterChip';
import { useState } from 'react';

const meta: Meta = {
    title: 'Components/Molecules/FilterChip',
    component: FilterChip,
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
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof FilterChip>;

type FilterChipHooksProps = {
    optionGroups: { category: string; options: { value: string; label: string }[] }[];
    selectedValues: Record<string, string[]>;
    generationId: string | null;
};

const FilterChipWithHooks = (args: FilterChipHooksProps) => {
    const [selectedValues, setSelectedValues] = useState(args.selectedValues);
    const [generationId, setGenerationId] = useState<string | null>(args.generationId);

    const handleClickOption = (category: string, value: string) => {
        setSelectedValues((prev) => {
            const currentValues = prev[category] || [];
            const isSelected = currentValues.includes(value);

            return {
                ...prev,
                [category]: isSelected
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value],
            };
        });
    };

    const handleToggleGenerationFilter = () => {
        setGenerationId((prev) => (prev === null ? '13' : null));
    };

    return (
        <FilterChip
            optionGroups={args.optionGroups}
            selectedValues={selectedValues}
            onClickOption={handleClickOption}
            generationId={generationId || ''} // 기본값으로 빈 문자열 처리
            onGenerationClick={handleToggleGenerationFilter}
        />
    );
};

export const Default: Story = {
    args: {
        optionGroups: [
            {
                category: 'languageName',
                options: [
                    { value: 'java', label: 'Java' },
                    { value: 'python', label: 'Python' },
                    { value: 'cpp', label: 'C++' },
                ],
            },
        ],
        selectedValues: { languageName: ['java', 'python', 'cpp'] },
        generationId: null, // null 상태를 명시적으로 설정
    },
    render: (args) => (
        <FilterChipWithHooks
            optionGroups={args.optionGroups}
            selectedValues={args.selectedValues}
            generationId={args.generationId}
        />
    ),
};

export const WithInitialSelection: Story = {
    args: {
        optionGroups: [
            {
                category: 'languageName',
                options: [
                    { value: 'java', label: 'Java' },
                    { value: 'python', label: 'Python' },
                    { value: 'cpp', label: 'C++' },
                ],
            },
        ],
        selectedValues: { languageName: ['java', ] },
        generationId: '13', // 유효한 generationId
    },
    render: (args) => (
        <FilterChipWithHooks
            optionGroups={args.optionGroups}
            selectedValues={args.selectedValues}
            generationId={args.generationId}
        />
    ),
};
