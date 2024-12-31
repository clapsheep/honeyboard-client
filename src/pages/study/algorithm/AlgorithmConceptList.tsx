import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useState } from 'react';
import { useLocation } from 'react-router';

const AlgorithmConceptList = () => {
    const [generation, setGeneration] = useState<string>('');
    const { pathname } = useLocation();

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

    const GENERATION_OPTIONS = {
        '13기': '13기',
        '12기': '12기',
        '11기': '11기',
    };

    return (
        <div>
            <Header
                titleProps={{ title: '알고리즘 개념' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button onClick={() => {}}>글작성</Button>

                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={GENERATION_OPTIONS}
                            onChange={(e) => {
                                setGeneration(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default AlgorithmConceptList;
