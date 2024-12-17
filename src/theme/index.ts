import { colors } from './colors';
import { typography } from './typography';
import { boxShadow } from './shadows';

export const theme = {
    extend: {
        colors,
        fontSize: typography,
        boxShadow,
    },
};
