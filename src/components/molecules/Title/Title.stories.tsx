import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';

const meta = {
    title: 'Components/Molecules/Title',
    component: Title,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className="w-full h-screen flex items-center px-3">
                <Story />
            </div>
        )
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        title: 'Honey Board Title Component Test',
        author: undefined,
        subTitle: {
            '프로젝트 목표': '사용자 경험 향상',
            '프로젝트 설명': '프로젝트 개요'
        },
        description: {
            '프로젝트 목표': '사용자 인터페이스를 개선하고 접근성을 향상시키는 것이 목표입니다.',
            '프로젝트 설명': '이 프로젝트는 현재 시스템의 UI/UX를 전면 개선하는 프로젝트입니다.'
        },
        isLiked: false,
        onClickLike: () => alert('북마크 클릭')
    }
};

// 좋아요가 된 상태
export const Liked: Story = {
    args: {
        ...Default.args,
        isLiked: true,
    }
};

// 작성자가 있는 경우
export const Author: Story = {
    args: {
        ...Default.args,
        author: '박성문',
    }
};

// 제목만 있는 경우
export const TitleOnly: Story = {
    args: {
        ...Default.args,
        author: undefined,
        subTitle: undefined,
        description: undefined,
        isLiked: undefined,
        onClickLike: undefined
    }
};

// 제목과 북마크가 있는 경우
export const TitleAndLiked: Story = {
    args: {
        ...Default.args,
        author: undefined,
        subTitle: undefined,
        description: undefined,
    }
};

// Sub Title이 1개인 경우
export const OneSubTitle: Story = {
    args: {
        ...Default.args,
        subTitle: {
            '프로젝트 설명': '프로젝트 개요'
        },
        description: {
            '프로젝트 설명': '이 프로젝트는 현재 시스템의 UI/UX를 전면 개선하는 프로젝트입니다.'
        },
    }
};

// 긴 제목과 설명
export const LongContent: Story = {
    args: {
        ...Default.args,
        title: '제목이 매우 길 때 어떻게 출력되는지 확인 중입니다. 이 설명은 여러 줄에 걸쳐 표시될 수 있으며, 레이아웃이 깨지지 않는지 테스트하기 위한 것입니다.',
        subTitle: {
            '프로젝트 목표': '장기적인 목표',
            '프로젝트 설명': '상세 설명'
        },
        description: {
            '프로젝트 목표': '프로젝트 목표 내용이 매우 길 때 어떻게 출력되는지 확인 중입니다. 이 설명은 여러 줄에 걸쳐 표시될 수 있으며, 레이아웃이 깨지지 않는지 테스트하기 위한 것입니다. Lorem ipsum dolor sit amet, te ipsum vidisse ancillae quo. Cu mei labore possit, nec natum consectetuer no. Usu dictas sanctus explicari ei, ferri voluptatum est ad. Omnis oratio graecis vim eu, no est nullam salutatus, tempor probatus reprimique at mei. Maiorum evertitur nec ex, luptatum reprehendunt ut nec.',
            '프로젝트 설명': '프로젝트 설명 내용이 매우 길 때 어떻게 출력되는지 확인 중입니다. 이 설명은 여러 줄에 걸쳐 표시될 수 있으며, 레이아웃이 깨지지 않는지 테스트하기 위한 것입니다. Lorem ipsum dolor sit amet, te ipsum vidisse ancillae quo. Cu mei labore possit, nec natum consectetuer no. Usu dictas sanctus explicari ei, ferri voluptatum est ad. Omnis oratio graecis vim eu, no est nullam salutatus, tempor probatus reprimique at mei. Maiorum evertitur nec ex, luptatum reprehendunt ut nec.'
        },
    }
};
