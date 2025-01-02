import { StudentInfo } from '@/components/molecules';
import { getStudentsAPI } from '@/services/admin/adminAPI';
import { StudentType } from '@/services/admin/types';
import { getGenerationName } from '@/services/common/generation';
import { useSuspenseQuery } from '@tanstack/react-query';

interface StudentListProps {
    generationId: number | null;

    onEdit: (student: StudentType) => void;
}

const StudentList = ({ generationId, onEdit }: StudentListProps) => {
    const { data: students } = useSuspenseQuery({
        queryKey: ['students', generationId],
        queryFn: () => getStudentsAPI(generationId),
    });

    if (students.length === 0)
        return (
            <div className="flex min-h-[200px] w-full items-center justify-center">
                <p className="text-lg text-gray-500">등록된 학생이 없습니다.</p>
            </div>
        );

    return (
        <div className="flex w-full items-center justify-center py-4">
            <div className="flex w-full flex-col items-center gap-1 px-8 py-3">
                <div className="grid w-full grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border border-gray-300 bg-gray-25 px-12 py-[5px] text-text-xl font-semibold">
                    <div>이름</div>
                    <div>기수</div>
                    <div>이메일</div>
                    <div>재적여부</div>
                    <div>수정</div>
                </div>

                <ul className="flex w-full flex-col gap-2">
                    {students.map((student) => (
                        <StudentInfo
                            key={student.userId}
                            userId={student.userId}
                            generationId={student.generationId}
                            name={student.name}
                            generationName={getGenerationName(
                                student.generationId,
                            )}
                            email={student.email}
                            ssafy={student.ssafy}
                            onClick={() => onEdit(student)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentList;
