import { Button } from '@/components/atoms';

interface StudentInfoProps {
    name: string;
    gisu: number;
    email: string;
    isMember?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudentInfo = ({
    name,
    gisu,
    email,
    onClick,
    isMember = true,
}: StudentInfoProps) => {
    return (
        <div className="grid w-full grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border border-gray-300 bg-gray-25 px-12 py-3 text-text-md font-semibold">
            <div>{name}</div>
            <div>{gisu}</div>
            <div className="underline">{email}</div>
            <div>{isMember ? 'O' : 'X'}</div>
            <div>
                <Button onClick={onClick} color="blue" aria-label="정보 수정">
                    수정하기
                </Button>
            </div>
        </div>
    );
};

export default StudentInfo;
