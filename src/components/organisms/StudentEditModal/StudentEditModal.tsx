import { Checkbox, Label, ModalButton, SelectOption } from '@/components/atoms';
import { InputForm } from '@/components/molecules';

import { useEffect, useState } from 'react';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { StudentType } from '@/types/User';

interface StudentEditModalProps {
    isOpen: boolean;
    isPending: boolean;
    student: StudentType;
    onConfirmClick: (updatedStudent: StudentType) => void;
    onCancelClick: () => void;
}

const StudentEditModal = ({
    isOpen,
    isPending,
    student,
    onConfirmClick,
    onCancelClick,
}: StudentEditModalProps) => {
    const [formData, setFormData] = useState<StudentType>(student);
    const { generationList } = useGenerationStore();

    useEffect(() => {
        setFormData(student);
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev: StudentType) => ({
            ...prev,
            [id]: type === 'checkbox' ? !checked : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev: StudentType) => ({
            ...prev,
            [id]: +value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        onConfirmClick(formData);
    };

    if (!student) return null;
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
                isOpen ? 'block' : 'hidden'
            }`}
        >
            <div className="w-full max-w-[500px] rounded-xl border bg-gray-25 p-6">
                <section className="pb-6 text-center text-text-xl font-bold text-gray-900">
                    학생 정보 수정
                </section>
                <form className="flex flex-col gap-4 pb-6">
                    <InputForm
                        id="email"
                        label="이메일"
                        type="email"
                        defaultValue={student.email}
                        onChange={handleChange}
                        required
                        readonly
                    />
                    <InputForm
                        id="name"
                        label="이름"
                        defaultValue={student.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="flex flex-col gap-2">
                        <Label
                            className="ml-1"
                            htmlFor="generationId"
                            text="기수"
                            required
                        />
                        <SelectOption
                            id="generationId"
                            name="generation"
                            options={convertSelectType(generationList)}
                            placeholder="기수 선택"
                            value={student.generationId}
                            onChange={handleSelectChange}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            label="취업, 졸업 등으로 탈퇴한 회원입니다."
                            id="ssafy"
                            checked={!formData.ssafy}
                            onChange={handleChange}
                        />
                    </div>
                </form>

                <section className="flex space-x-2">
                    <ModalButton
                        type="button"
                        action="confirm"
                        onClick={handleSubmit}
                        isPending={isPending}
                    />
                    <ModalButton
                        type="button"
                        action="cancel"
                        onClick={onCancelClick}
                    />
                </section>
            </div>
        </div>
    );
};

export default StudentEditModal;
