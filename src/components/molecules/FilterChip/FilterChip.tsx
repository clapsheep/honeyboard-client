import { CalendarTag } from '@/components/atoms';

interface Option {
    value: string;
    label: string;
}

interface OptionGroup {
    category: string;
    options: Option[];
}

interface FilterChipProps {
    optionGroups: OptionGroup[];
    selectedValues: Record<string, string[]>;
    onClickOption: (category: string, value: string) => void;
    generationId: string | null;
    onGenerationClick: () => void;
}

const FilterChip = ({
    optionGroups,
    selectedValues,
    onClickOption,
    generationId,
    onGenerationClick,
}: FilterChipProps) => {
    return (
        <section className="flex gap-3">
            {optionGroups.map((group) => (
                <div key={group.category} className="flex gap-3">
                    {group.options.map((option) => (
                        <CalendarTag
                            key={option.value}
                            color={
                                selectedValues[group.category]?.includes(
                                    option.value,
                                )
                                    ? 'blue'
                                    : 'regular'
                            }
                            onClick={() =>
                                onClickOption(group.category, option.value)
                            }
                        >
                            {option.label}
                        </CalendarTag>
                    ))}
                </div>
            ))}

            <CalendarTag
                color={generationId ? 'blue' : 'regular'}
                onClick={onGenerationClick}
            >
                내 기수만 보기
            </CalendarTag>
        </section>
    );
};

export default FilterChip;
