import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [generation, setGeneration] = useState<string>('');
    const ROUTES = [{ path: '/track', name: '프로젝트', isActive: true }];

    const { userInfo } = useUserStore();
    const GENERATION_OPTIONS = [
        { value: '13', label: '13기' },
        { value: '12', label: '12기' },
        { value: '11', label: '11기' },
    ];

    return (
        <div>
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

export default TrackList;
