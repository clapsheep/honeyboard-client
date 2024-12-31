import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { useLocation } from 'react-router';

const TrackList = () => {
    const { pathname } = useLocation();
    const [generation, setGeneration] = useState<string>('');
    const ROUTES = [{ path: '/track', name: '프로젝트', isActive: true }];

    const { userInfo } = useUserStore();
    const GENERATION_OPTIONS = {
        '13기': '13기',
        '12기': '12기',
        '11기': '11기',
    };

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
                            <Button onClick={() => {}}>프로젝트 생성</Button>
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
