const FIRST_NAMES = [
    "Avery", "Jordan", "Riley", "Casey", "Morgan",
    "Taylor", "Quinn", "Reese", "Emerson", "Rowan",
    "Hayden", "Skyler", "Elliot", "Finley", "Dakota",
    "Sawyer", "Peyton", "Cameron", "Jamie", "Drew"
];

const LAST_NAMES = [
    "Bennett", "Coleman", "Fletcher", "Hughes", "Mercer",
    "Nolan", "Pierce", "Sinclair", "Whitfield", "Ashford",
    "Barlow", "Chandler", "Donovan", "Ellison", "Grayson",
    "Hartley", "Ingram", "Keaton", "Lambert", "Marsh"
];

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

    // Random birth year based on chosen age.
    const birthYear = today.getFullYear() - age;

    // Random month/day, avoiding invalid Feb 30th type issues
    // by capping day at 28 for simplicity.
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

function generatePerson(minAge, maxAge) {
    const firstName = randomFromList(FIRST_NAMES);
    const lastName = randomFromList(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;

    const dob = generateDOB(minAge, maxAge);
    const age = calculateAge(dob);

    return {
        firstName,
        lastName,
        fullName,
        dob,
        age
    };
}

function renderPerson(person) {
    document.getElementById("firstName").textContent = person.firstName;
    document.getElementById("lastName").textContent = person.lastName;
    document.getElementById("fullName").textContent = person.fullName;
    document.getElementById("dob").textContent = formatDate(person.dob);
    document.getElementById("age").textContent = person.age;
}

function getAgeRange() {
    const minInput = document.getElementById("minAge");
    const maxInput = document.getElementById("maxAge");

    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);

    // Guard against invalid or reversed input.
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

function generateSSN() {
    // Valid-format SSN: avoids area 666 and 900+ (never issued),
    // avoids group 00 and serial 0000 (invalid by SSA rules).
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

document.addEventListener("DOMContentLoaded", () => {
    initializePersonalGenerator();
});
