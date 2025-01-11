import { Button, Input } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useGenerationMutations } from '@/hooks/useGeneration';
import { useGenerationStore } from '@/stores/generationStore';
import { useModalStore } from '@/stores/modalStore';
import { GenerationType } from '@/types/common/type';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const GenerationManagement = () => {
    const ROUTES = [
        { path: 'admin/generation', name: '기수관리', isActive: true },
    ];

    const { pathname } = useLocation();
    const { generationList } = useGenerationStore();
    const { openModal, closeModal } = useModalStore();
    const [newGenerationNumber, setNewGenerationNumber] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedGenerationId, setSelectedGenerationId] = useState<
        number | null
    >(null);
    const { addMutation, deleteMutation, activeMutation } =
        useGenerationMutations();

    useEffect(() => {
        const initializeActiveGeneration = () => {
            const activeGen = generationList.find((gen) => gen.active);
            if (activeGen) {
                setSelectedGenerationId(activeGen.id);
            }
        };

        initializeActiveGeneration();
    }, []);

    useEffect(() => {
        const activeGen = generationList.find((gen) => gen.active);
        if (activeGen) {
            setSelectedGenerationId(activeGen.id);
        }
    }, [generationList]);

    const isDuplicateGeneration = (name: string): boolean => {
        return generationList.some((gen) => gen.name === name);
    };

    const handleAddGeneration = async () => {
        if (!newGenerationNumber || isNaN(Number(newGenerationNumber))) return;

        if (isDuplicateGeneration(newGenerationNumber)) {
            openModal({
                title: '기수 등록 실패',
                subTitle: '이미 존재하는 기수입니다.',
                onCancelClick: closeModal,
            });
            return;
        }

        const newGeneration: GenerationType = {
            id: generationList.length + 1,
            name: newGenerationNumber,
            active: false,
        };

        addMutation.mutate(newGeneration, {
            onSuccess: () => {
                setNewGenerationNumber('');
            },
            onError: () => {
                openModal({
                    title: '기수 등록 실패',
                    subTitle: '기수 등록에 실패했습니다.',
                    onCancelClick: closeModal,
                });
            },
        });
    };

    const handleEditComplete = async () => {
        if (selectedGenerationId) {
            activeMutation.mutate(selectedGenerationId, {
                onSuccess: () => {
                    setIsEditMode(false);
                    setSelectedGenerationId(null);
                },
                onError: () => {
                    openModal({
                        title: '기수 활성화 실패',
                        subTitle: '기수 활성화에 실패했습니다.',
                        onCancelClick: closeModal,
                    });
                },
            });
        }
    };

    const handleDeleteGeneration = (generationId: number) => {
        openModal({
            title: '기수 삭제',
            subTitle: '정말 삭제하시겠습니까?',
            onConfirmClick: () => {
                deleteMutation.mutate(generationId, {
                    onSuccess: () => {
                        closeModal();
                    },
                    onError: () => {
                        openModal({
                            title: '기수 삭제 실패',
                            subTitle: '기수 삭제에 실패했습니다.',
                            onCancelClick: closeModal,
                        });
                    },
                });
            },
            onCancelClick: closeModal,
        });
    };

    return (
        <>
            <Header
                titleProps={{ title: '기수관리' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-between">
                    <TabNavigation routes={ROUTES} />
                    <Button
                        onClick={() =>
                            isEditMode
                                ? handleEditComplete()
                                : setIsEditMode(true)
                        }
                    >
                        {isEditMode ? '완료' : '편집'}
                    </Button>
                </div>
            </Header>
            <div className="my-10 flex flex-1 justify-center">
                <section className="my-4min-w-[400px] mx-6 rounded-lg bg-white p-4 shadow-sm">
                    <div className="flex h-full flex-col justify-between space-y-2">
                        <div>
                            <div className="grid grid-cols-[80px_1fr_80px] gap-4">
                                <div className="text-center text-text-md font-medium">
                                    활성화
                                </div>
                                <div className="text-center text-text-md font-medium">
                                    기수명
                                </div>
                                <div className="text-center text-text-md font-medium">
                                    삭제
                                </div>
                            </div>

                            <div className="max-h-[calc(100vh-340px)] overflow-y-auto">
                                {generationList.map((generation) => (
                                    <div
                                        key={generation.id}
                                        className="grid grid-cols-[80px_1fr_80px] items-center gap-4 border-t py-2.5"
                                    >
                                        <div className="flex justify-center">
                                            <input
                                                type="radio"
                                                name="activeGeneration"
                                                checked={
                                                    isEditMode
                                                        ? generation.id ===
                                                          selectedGenerationId
                                                        : generation.active
                                                }
                                                onChange={() =>
                                                    isEditMode &&
                                                    setSelectedGenerationId(
                                                        generation.id,
                                                    )
                                                }
                                                disabled={!isEditMode}
                                                className="h-4 w-4 cursor-pointer"
                                            />
                                        </div>
                                        <div className="text-center text-text-md">
                                            {generation.name}
                                        </div>
                                        <div className="flex justify-center">
                                            <Button
                                                color={
                                                    isEditMode ? 'red' : 'gray'
                                                }
                                                onClick={() =>
                                                    handleDeleteGeneration(
                                                        generation.id,
                                                    )
                                                }
                                                disabled={!isEditMode}
                                            >
                                                삭제
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-[1fr_80px] items-center gap-4 border-t py-2.5">
                            <div className="flex items-center gap-2">
                                <Input
                                    id="generation"
                                    type="number"
                                    value={newGenerationNumber}
                                    onChange={(e) =>
                                        setNewGenerationNumber(e.target.value)
                                    }
                                    placeholder="기수 입력 (숫자만)"
                                />
                                <span className="text-text-md text-gray-600">
                                    기
                                </span>
                            </div>
                            <Button
                                onClick={handleAddGeneration}
                                disabled={
                                    !newGenerationNumber ||
                                    isNaN(Number(newGenerationNumber))
                                }
                            >
                                등록
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default GenerationManagement;
