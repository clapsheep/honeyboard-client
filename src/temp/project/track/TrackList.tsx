import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo } = useAuth();
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
                <div className="flex items-end justify-between">
                    <TabNavigation routes={ROUTES} />
                    <div className="flex gap-4">
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
