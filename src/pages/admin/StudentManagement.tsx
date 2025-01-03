import { SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, StudentEditModal, StudentList } from '@/components/organisms';
import StudentInfoSkeletonList from '@/components/templates/Skeletons/StudentInfoSkeletonList';
import { useStudentEdit } from '@/hooks/useStudentEdit';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router';

const StudentMangement = () => {
    const { pathname } = useLocation();
    const { generationList } = useGenerationStore();
    const ROUTES = [
        { path: 'admin/student', name: '학생목록', isActive: true },
    ];
    const [generationId, setGenerationId] = useState<number | null>(
        generationList.find((g) => g.active)?.id ?? null,
    );

    const {
        isOpen,
        selectedStudent,
        isPending,
        handleEdit,
        handleCancelClick,
        handleConfirmClick,
    } = useStudentEdit(generationId);

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
            <section className="my-6 max-h-[calc(100vh-210px)] flex-1 overflow-auto bg-gray-25 px-6 py-4">
                <Suspense fallback={<StudentInfoSkeletonList />}>
                    <StudentList
                        generationId={generationId}
                        onEdit={handleEdit}
                    />
                </Suspense>
            </section>
            {selectedStudent && (
                <StudentEditModal
                    isOpen={isOpen}
                    isPending={isPending}
                    student={selectedStudent}
                    onConfirmClick={handleConfirmClick}
                    onCancelClick={handleCancelClick}
                />
            )}
        </div>
    );
};

export default StudentMangement;
