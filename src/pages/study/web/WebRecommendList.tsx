import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router';

import { WebRecommendCards } from '@/components/templates';
import { useUserStore } from '@/stores/userStore';
import WebSiteCardSkeletonList from '@/components/templates/Skeletons/WebSiteCardSkeletonList';
import { convertSelectType } from '@/utils/convertSelectType';
import { useGenerationStore } from '@/stores/generationStore';

const WebRecommendList = () => {
    const { userInfo } = useUserStore();
    const { generationList } = useGenerationStore();
    const [generationId, setGenerationId] = useState<string>(
        userInfo!.generationId,
    );
    const { pathname } = useLocation();

    const ROUTES = [
        {
            path: 'study/web/concept',
            name: '웹 개념',
            isActive: false,
        },
        {
            path: 'study/web/recommend',
            name: '웹 추천',
            isActive: true,
        },
    ];

    return (
        <div>
            <Header
                titleProps={{ title: '웹 추천' }}
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
                            defaultValue={generationId}
                            options={convertSelectType(generationList)}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <div className="flex flex-col items-center justify-center gap-6 p-6">
                <div>서치 바 들어가는 자리</div>
                <Suspense fallback={<WebSiteCardSkeletonList />}>
                    <WebRecommendCards generationId={generationId} />
                </Suspense>
            </div>
        </div>
    );
};

export default WebRecommendList;
