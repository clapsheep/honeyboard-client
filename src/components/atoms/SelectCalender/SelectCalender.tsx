import Icon from '../Icon/Icon';

interface SelectCalenderProps {
    year: number;
    month: number;
    onClickLeft: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickRight: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectCalender = ({
    year,
    month,
    onClickLeft,
    onClickRight,
}: SelectCalenderProps) => {
    return (
        <section className="flex flex-col items-center">
            <section>
                <span className="text-base">{year}</span>
            </section>
            <section className="flex gap-2">
                <button
                    type="button"
                    onClick={onClickLeft}
                    aria-label="이전 월"
                >
                    <Icon id="left" aria-hidden="true"></Icon>
                </button>
                <h4 className="w-[3.75rem] text-center text-3xl font-semibold">
                    {month}월
                </h4>
                <button
                    type="button"
                    onClick={onClickRight}
                    aria-label="다음 월"
                >
                    <Icon id="right" aria-hidden="true"></Icon>
                </button>
            </section>
        </section>
    );
};

export default SelectCalender;
