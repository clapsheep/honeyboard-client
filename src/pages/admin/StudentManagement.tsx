import { SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, StudentEditModal, StudentList } from '@/components/organisms';
import StudentInfoSkeletonList from '@/components/templates/Skeletons/StudentInfoSkeletonList';
import { StudentType } from '@/services/admin/types';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router';

const StudentMangement = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
        null,
    );

    const { generationList } = useGenerationStore();
    const [generationId, setGenerationId] = useState<number | null>(
        generationList.find((g) => g.active)?.id ?? null,
    );
    const { pathname } = useLocation();
    const ROUTES = [
        { path: 'admin/student', name: '학생목록', isActive: true },
    ];

    const handleEdit = (student: StudentType) => {
        setSelectedStudent(student);
        setIsOpen(true);
    };

    return (
        <div>
            <Header
                titleProps={{ title: '학생관리' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <SelectOption
                            defaultValue={generationId ?? null}
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            onChange={(e) => {
                                setGenerationId(+e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <Suspense fallback={<StudentInfoSkeletonList />}>
                <StudentList generationId={generationId} onEdit={handleEdit} />
            </Suspense>
            {selectedStudent && (
                <StudentEditModal
                    isOpen={isOpen}
                    student={selectedStudent}
                    onConfirmClick={() => {}}
                    onCancelClick={() => {
                        setIsOpen(false);
                        setSelectedStudent(null);
                    }}
                />
            )}
        </div>
    );
};

export default StudentMangement;
