import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useState } from 'react';
import { useLocation } from 'react-router';

const FinalList = () => {
    const { pathname } = useLocation();
    const [generation, setGeneration] = useState<string>('');
    const ROUTES = [{ path: '/final', name: '프로젝트', isActive: true }];

    const GENERATION_OPTIONS = {
        '13기': '13기',
        '12기': '12기',
        '11기': '11기',
    };

    return (
        <div>
            <Header
                titleProps={{ title: '파이널 프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button onClick={() => {}}>팀 생성</Button>

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

export default FinalList;
