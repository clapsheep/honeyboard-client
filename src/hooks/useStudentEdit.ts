import { updateStudentAPI } from '@/api/adminAPI';
import { StudentType } from '@/types/User';
import { queryClient } from '@/utils/common/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useStudentEdit = (generationId: number | null) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
        null,
    );

    const { mutateAsync: updateStudent, isPending } = useMutation({
        mutationFn: (formData: StudentType) => {
            return updateStudentAPI(selectedStudent!.userId, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students', generationId],
            });
        },
    });

    const handleEdit = (student: StudentType) => {
        setSelectedStudent(student);
        setIsOpen(true);
    };

    const handleCancelClick = () => {
        setIsOpen(false);
        setSelectedStudent(null);
    };

    const handleConfirmClick = async (formData: StudentType) => {
        try {
            await updateStudent(formData);
            setIsOpen(false);
            setSelectedStudent(null);
        } catch (error) {
            console.error('학생 정보 업데이트 실패:', error);
        }
    };

    return {
        isOpen,
        selectedStudent,
        isPending,
        handleEdit,
        handleCancelClick,
        handleConfirmClick,
    };
};
