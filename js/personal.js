const FIRST_NAMES = [
    "Wei", "Fatima", "Carlos", "Aisha", "Liam",
    "Yuki", "Diego", "Priya", "Malik", "Elena",
    "Kwame", "Sofia", "Arjun", "Ngozi", "Hiro",
    "Mateo", "Amara", "Dmitri", "Layla", "Noah",
    "Mei", "Omar", "Isabella", "Kenji", "Zara",
    "Lucas", "Aaliyah", "Ravi", "Chidi", "Emma"
];

const LAST_NAMES = [
    "Nguyen", "Garcia", "Kim", "Patel", "Silva",
    "Okafor", "Kowalski", "Hassan", "Yamamoto", "Rossi",
    "Kumar", "Diallo", "Andersson", "Santos", "Ivanov",
    "Chen", "Abara", "Muller", "Osei", "Novak",
    "Ferreira", "Choi", "Haddad", "Larsen", "Mendez",
    "Wang", "Adeyemi", "Kovac", "Reyes", "Singh"
];

const STATE_AREA_CODES = {
    "Alabama": "205",
    "Alaska": "907",
    "Arizona": "602",
    "Arkansas": "501",
    "California": "213",
    "Colorado": "303",
    "Connecticut": "203",
    "Delaware": "302",
    "Florida": "305",
    "Georgia": "404",
    "Hawaii": "808",
    "Idaho": "208",
    "Illinois": "312",
    "Indiana": "317",
    "Iowa": "515",
    "Kansas": "316",
    "Kentucky": "502",
    "Louisiana": "504",
    "Maine": "207",
    "Maryland": "410",
    "Massachusetts": "617",
    "Michigan": "313",
    "Minnesota": "612",
    "Mississippi": "601",
    "Missouri": "314",
    "Montana": "406",
    "Nebraska": "402",
    "Nevada": "702",
    "New Hampshire": "603",
    "New Jersey": "201",
    "New Mexico": "505",
    "New York": "212",
    "North Carolina": "704",
    "North Dakota": "701",
    "Ohio": "216",
    "Oklahoma": "405",
    "Oregon": "503",
    "Pennsylvania": "215",
    "Rhode Island": "401",
    "South Carolina": "803",
    "South Dakota": "605",
    "Tennessee": "615",
    "Texas": "214",
    "Utah": "801",
    "Vermont": "802",
    "Virginia": "804",
    "Washington": "206",
    "West Virginia": "304",
    "Wisconsin": "414",
    "Wyoming": "307"
};

const STATE_NAMES = Object.keys(STATE_AREA_CODES);

function randomFromList(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDOB(minAge, maxAge) {
    const today = new Date();
    const age = randomInt(minAge, maxAge);
    const birthYear = today.getFullYear() - age;
    const birthMonth = randomInt(0, 11);
    const birthDay = randomInt(1, 28);
    const dob = new Date(birthYear, birthMonth, birthDay);
    return dob;
}

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }
    return age;
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function generateSSN() {
    let area;
    do {
        area = randomInt(1, 899);
    } while (area === 666);

    const group = randomInt(1, 99);
    const serial = randomInt(1, 9999);

    const areaStr = String(area).padStart(3, "0");
    const groupStr = String(group).padStart(2, "0");
    const serialStr = String(serial).padStart(4, "0");

    return `${areaStr}-${groupStr}-${serialStr}`;
}

function generatePhone(state) {
    const areaCode = STATE_AREA_CODES[state];

    let exchange;
    do {
        const first = randomInt(2, 9);
        const rest = randomInt(0, 99);
        exchange = `${first}${String(rest).padStart(2, "0")}`;
    } while (exchange.endsWith("11"));

    const subscriber = String(randomInt(0, 9999)).padStart(4, "0");

    return `(${areaCode}) ${exchange}-${subscriber}`;
}

function generatePerson(minAge, maxAge) {
    const firstName = randomFromList(FIRST_NAMES);
    const lastName = randomFromList(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;

    const dob = generateDOB(minAge, maxAge);
    const age = calculateAge(dob);
    const ssn = generateSSN();
    const state = randomFromList(STATE_NAMES);
    const phone = generatePhone(state);

    return {
        firstName,
        lastName,
        fullName,
        dob,
        age,
        ssn,
        state,
        phone
    };
}

function renderPerson(person) {
    document.getElementById("firstName").textContent = person.firstName;
    document.getElementById("lastName").textContent = person.lastName;
    document.getElementById("fullName").textContent = person.fullName;
    document.getElementById("dob").textContent = formatDate(person.dob);
    document.getElementById("age").textContent = person.age;
    document.getElementById("ssn").textContent = person.ssn;
    document.getElementById("state").textContent = person.state;
    document.getElementById("phone").textContent = person.phone;
}

function getAgeRange() {
    const minInput = document.getElementById("minAge");
    const maxInput = document.getElementById("maxAge");

    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);

    if (isNaN(min) || min < 0) min = 0;
    if (isNaN(max) || max > 120) max = 120;
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }

    return { min, max };
}

function initializePersonalGenerator() {
    const regenerateBtn = document.getElementById("regenerateBtn");

    regenerateBtn.addEventListener("click", () => {
        const { min, max } = getAgeRange();
        const person = generatePerson(min, max);
        renderPerson(person);
    });

    const { min, max } = getAgeRange();
    renderPerson(generatePerson(min, max));
}

document.addEventListener("DOMContentLoaded", () => {
    initializePersonalGenerator();
});