import { StudentInfo } from '@/components/molecules';

interface Student {
    name: string;
    gisu: number;
    email: string;
    isMember?: boolean;
}

interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
}

const StudentList = ({ students, onEdit }: StudentListProps) => {
    return (
        <div className="flex w-[1152px] items-center justify-center bg-gray-100 py-4">
            <div className="flex w-[1090px] flex-col items-center gap-1">
                <div className="grid w-full grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border border-gray-300 bg-gray-25 px-12 py-[5px] text-text-xl font-semibold">
                    <div>이름</div>
                    <div>기수</div>
                    <div>이메일</div>
                    <div>재적여부</div>
                    <div>수정</div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    {students.map((student, index) => (
                        <StudentInfo
                            key={`${student.email}-${index}`}
                            name={student.name}
                            gisu={student.gisu}
                            email={student.email}
                            isMember={student.isMember}
                            onClick={() => onEdit(student)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentList;
