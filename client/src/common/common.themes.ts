interface colors {
    primary: string;
    secondary: string;
}

interface theme {
    colors: colors;
}

export const lightTheme: theme = {
    colors: {
        primary: '#000',
        secondary: '#fff',
    },
};

export const darkTheme: theme = {
    colors: {
        primary: '#fff',
        secondary: '#000',
    },
};
