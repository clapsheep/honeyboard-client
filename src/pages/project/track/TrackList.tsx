import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useGenerationStore } from '@/stores/generationStore';
import { useUserStore } from '@/stores/userStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo } = useUserStore();
    const { generationList } = useGenerationStore();
    const [generation, setGeneration] = useState<string>(
        userInfo?.generationId ?? '',
    );
    const ROUTES = [{ path: '/track', name: '프로젝트', isActive: true }];
    return (
        <>
            <Header
                titleProps={{ title: '관통 프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        {userInfo?.role === 'ADMIN' ? (
                            <Button
                                onClick={() => {
                                    navigate('create');
                                }}
                            >
                                프로젝트 생성
                            </Button>
                        ) : null}
                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            defaultValue={generation}
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

export default TrackList;
