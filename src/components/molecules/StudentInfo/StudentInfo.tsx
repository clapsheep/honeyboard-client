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
        <div className="flex h-full w-full items-center justify-between border border-gray-300 bg-gray-25 px-12 py-3">
            <span className="text-text-md font-semibold">{name}</span>
            <span>{gisu}</span>
            <span className="underline">{email}</span>
            <span>{isMember ? 'O' : 'X'}</span>

            <Button onClick={onClick} color="blue" aria-label="정보 수정">
                수정하기
            </Button>
        </div>
    );
};

export default StudentInfo;
