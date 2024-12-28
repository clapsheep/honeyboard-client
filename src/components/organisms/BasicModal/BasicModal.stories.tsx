import { Meta, StoryObj } from '@storybook/react';
import BasicModal from './BasicModal';

const meta: Meta = {
    title: 'Components/Organisms/BasicModal',
    component: BasicModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="flex h-[250px] w-[270px] items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BasicModal>;

export default meta;
type Story = StoryObj<typeof BasicModal>;

export const Default: Story = {
    args: {
        icon: 'caution',
        title: '진짜 이거에요?',
        subTitle: '진짜 그걸 제가요?',
        onCancelClick: () => alert('취소'),
        onConfirmClick: () => confirm('확인'),
    },
};
export const btn2: Story = {
    args: {
        title: '진짜 이거에요?',
        onCancelClick: () => alert('취소'),
        onConfirmClick: () => confirm('확인'),
    },
};

export const btn3: Story = {
    args: {
        icon: 'warning',
        title: '정말 삭제하시겠습니까?',
        subTitle: '삭제된 정보는 되돌릴 수 없습니다',
        onCancelClick: () => alert('취소'),
        onDeleteClick: () => confirm('진짜 삭제?'),
    },
};
