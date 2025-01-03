import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    WebConceptCards,
} from '@/components/templates';
import { useGenerationStore } from '@/stores/generationStore';
import { useUserStore } from '@/stores/userStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router';

const WebConceptList = () => {
    const { userInfo } = useUserStore();
    const { generationList } = useGenerationStore();
    const [generationId, setGenerationId] = useState<string | null>(
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
                            options={convertSelectType(generationList)}
                            defaultValue={generationId}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <div className="flex flex-col items-center justify-center gap-6 p-6">
                <div>서치 바 들어가는 자리</div>
                <Suspense fallback={<ProjectCardSkeletonList />}>
                    <WebConceptCards generationId={generationId} />
                </Suspense>
            </div>
        </div>
    );
};

export default WebConceptList;
