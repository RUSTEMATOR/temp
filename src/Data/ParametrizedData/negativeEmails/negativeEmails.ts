function generateRandomLetters(number: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < number; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export const NEGATIVE_EMAILS = [
    { email: 'automaton-anyything#kingbilly.xyz', error: 'The email is invalid.' },
    { email: `automaton-anyything@kingbilly-xyz`, error: 'The email is invalid.' },
    { email: `automaton-anyything@kingbilly_xyz`, error: 'The email is invalid.' },
    { email: `automaton-anyything@kingbilly..xyz`, error: 'The email is invalid.' },
    { email: '', error: 'This field must be completed.' },
    { email: `änyýthing@kingbilly.xyz`, error: 'The email is invalid.' },
    { email: `automaton-anyything@softs_wis..com`, error: 'The email is invalid.' },
    { email: `automaton-anyything.kingbilly.xyz`, error: 'The email is invalid.' },
    { email: `automaton-anyything@@kingbilly.com`, error: 'The email is invalid.' },
    { email: `automaton-anyything@king billy.com`, error: 'The email is invalid.' },
    { email: `automaton-anyything@kingbilly..com`, error: 'The email is invalid.' },
    { email: `automaton-anyything@`, error: 'The email is invalid.' },
    { email: `@kingbilly.xyz`, error: 'The email is invalid.' },
    { email: `automaton-anyything@kingbilly.abcde`, error: 'The email is invalid.' },
    { email: `.automaton-anyything@kingbilly.com`, error: 'The email is invalid.' },
    { email: `automaton-anyything.@kingbilly.xyz`, error: 'The email is invalid.' },
    { email: `automaton_99@кінгбіллі.com`, error: 'The email is invalid.' },
];

export const EMAIL_INPUT_ERROR_TEXT = 'is invalid'