import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useGenerationStore } from '@/stores/generationStore';
import { useUserStore } from '@/stores/userStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const AlgorithmConceptList = () => {
    const { generationList } = useGenerationStore();
    const { userInfo } = useUserStore();
    const [generation, setGeneration] = useState<string>(
        userInfo?.generationId ?? '',
    );
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const ROUTES = [
        {
            path: 'study/algorithm/concept',
            name: '알고리즘 개념',
            isActive: true,
        },
        {
            path: 'study/algorithm/problem',
            name: '알고리즘 문제풀이',
            isActive: false,
        },
    ];

    return (
        <>
            <Header
                titleProps={{ title: '알고리즘 개념' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button
                            onClick={() => {
                                navigate('create');
                            }}
                        >
                            글작성
                        </Button>

                        <SelectOption
                            id="generation"
                            defaultValue={generation}
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            onChange={(e) => {
                                setGeneration(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
        </>
    );
};

export default AlgorithmConceptList;
