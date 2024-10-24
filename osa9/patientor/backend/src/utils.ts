import { NewPatientEntry, Gender } from "../../shared/types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender =(param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }

    return date;
};

const parseString = (str: unknown): string => {
    if(!isString(str)) {
        throw new Error('Incorrect or missing data');
    }

    return str;
};

const toNewPatientEntry = (object: unknown) => {

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'occupation' in object && 'gender' in object &&
        'ssn' in object && 'dateOfBirth' in object) {

        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            occupation: parseString(object.occupation),
            gender: parseGender(object.gender),
            ssn: parseString(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;