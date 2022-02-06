export function genderToString(gender) {
    return gender === 'M' ? 'Laki-laki' : 'Perempuan';
}

export function calculateAge(dob) {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function validEmail(email) {
    const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return pattern.test(email);
}

export function validPhoneNumber(mb) {
    const pattern = new RegExp("\\+62\\s\\d{3}[-.;\\s]??\\d{3}[-.;\\s]??\\d{3,4}|\\(0\\d{2,3}\\)\\s?\\d+|0\\d{2,3}\\s?\\d{6,7}|\\+62\\s?361\\s?\\d+|\\+62\\d+|\\+62\\s?(?:\\d{3,}-)*\\d{3,5}\\n");
    return pattern.test(mb);
}

export function checkObjectValueIsEmpty(obj) {
    return Object.values(obj).some(x => x === null || x === '')
}
