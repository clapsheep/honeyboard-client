import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    WebConceptCards,
} from '@/components/templates';
import { useUserStore } from '@/stores/userStore';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router';

const WebConceptList = () => {
    const { userInfo } = useUserStore();
    const [generation, setGeneration] = useState<string>(
        userInfo!.generationId,
    );
    const { pathname } = useLocation();
    const ROUTES = [
        {
            path: 'study/web/concept',
            name: '웹 개념',
            isActive: true,
        },
        {
            path: 'study/web/recommend',
            name: '웹 추천',
            isActive: false,
        },
    ];

    const GENERATION_OPTIONS = [
        { value: '13', label: '13기' },
        { value: '12', label: '12기' },
        { value: '11', label: '11기' },
    ];

    return (
        <div>
            <Header
                titleProps={{ title: '웹 개념' }}
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
                            defaultValue={userInfo!.generationId}
                            onChange={(e) => {
                                setGeneration(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <div className="flex flex-col items-center justify-center gap-6 p-6">
                <div>서치 바 들어가는 자리</div>
                <Suspense fallback={<ProjectCardSkeletonList />}>
                    <WebConceptCards generationId={generation} />
                </Suspense>
            </div>
        </div>
    );
};

export default WebConceptList;
