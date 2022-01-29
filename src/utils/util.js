export function genderToString(gender) {
    return gender === 'M' ? 'Laki-laki' : 'Perempuan';
}

export function calculateAge(dob) {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function emailChecker(email) {
    const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(email);
}

export function checkObjectValueIsEmpty(obj) {
    return Object.values(obj).some(x => x === null || x === '')
}
