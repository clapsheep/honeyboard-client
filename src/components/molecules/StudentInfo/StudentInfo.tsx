import { Button } from '@/components/atoms';
import { StudentType } from '@/types/admin/types';

interface StudentInfoProps extends StudentType {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudentInfo = ({
    name,
    generationName,
    email,
    onClick,
    ssafy,
}: StudentInfoProps) => {
    return (
        <li className="grid w-full grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border border-gray-300 bg-gray-25 px-12 py-3 text-text-md font-semibold">
            <div>{name}</div>
            <div>{generationName}</div>
            <div className="underline">{email}</div>
            <div>{ssafy ? 'O' : 'X'}</div>
            <div>
                <Button onClick={onClick} color="blue" aria-label="정보 수정">
                    수정하기
                </Button>
            </div>
        </li>
    );
};

export default StudentInfo;
