import bojIcon from '/assets/images/bojIcon.png';
import sweaIcon from '/assets/images/sweaIcon.png';
import programmersIcon from '/assets/images/programmersIcon.png';
export const getPlatformInfo = (link: string) => {
    if (link.includes('www.acmicpc')) {
        return { platform: 'boj', icon: bojIcon };
    } else if (link.includes('swexpertacademy')) {
        return { platform: 'swea', icon: sweaIcon };
    } else if (link.includes('school.programmers')) {
        return { platform: 'programmers', icon: programmersIcon };
    }
    return null;
};
