export const NavItem = [
  {
      name: '메인페이지',
      path: '/',
      icon: 'calendar',
  },
  {
      name: '프로젝트',
      icon: 'document',
      children: [
          {
              name: '관통 프로젝트',
              path: '/track',
          },
          {
              name: '파이널 프로젝트',
              path: '/final',
          },
      ],
  },
  {
      name: '학습',
      icon: 'pen',
      children: [
          {
              name: '알고리즘',
              path: '/algorithm',
          },
          {
              name: '웹',
              path: '/web',
          },
      ],
  },
  {
      name: '음악',
      icon: 'music',
      children: [
          {
              name: '플레이리스트',
              path: '/music/list',
          },
          {
              name: '노래 신청',
              path: '/music/search',
          },
      ],
  },
  {
      name: '학생관리',
      icon: 'edit-user',
      children: [
          {
              name: '학생 관리',
              path: '/admin/student',
          },
          {
              name: '기수 추가',
              path: '/admin/generation',
          },
      ],
  },
];