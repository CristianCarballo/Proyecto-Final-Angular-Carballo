interface inscriptionStudent{
    id: number,
    firstName: string,
    lastName: string,
}

interface inscriptionCourse{
    id: number,
    name: string,
}

export interface Inscription {
    id: number;
    code: string;
    student: inscriptionStudent;
    date: Date;
    course: inscriptionCourse;
}
