interface passwordStates {
    awful: {
        text: string
        color: string
        password: string
    }
    weak: {
        text: string
        color: string
        password: string
    }

    strong: {
        text: string
        color: string
        password: string
    }

    perfect: {
        text: string
        color: string
        password: string
    }
}

export const PASSWORD_STATES = {
    awful: {
        text: 'Awful is too short (minimum is 8 characters)',
        color: 'rgb(218, 56, 19)',
        password: '1',
    },

    weak: {
        text: 'Weak must include at least one special symbol, such as !@#$%^*()-+= ...',
        color: 'rgb(255, 201, 10)',
        password: '12345678'
    },

    strong: {
        text: 'Strong ',
        color: 'rgb(57, 133, 234)',
        password: '12345678_'
    },

    perfect: {
        text: 'Perfect ',
        color: 'rgb(124, 178, 90)',
        password: '12345678_Az'
    }
}