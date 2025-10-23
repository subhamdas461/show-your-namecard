import fs from "fs";

const CONTRIBUTORS_FILE = "./contributors.json";
const README_FILE = "./README.md";

function generateContributorRow({ name, role, github }) {
    const username = github.split("github.com/")[1];
    const avatar = `https://github.com/${username}.png`;
    const live = `https://${username}.github.io/`;

    return `| <img src="${avatar}" width="60" height="60" style="border-radius:50%;"> | **${name}** | ${role} | [GitHub](${github}) | [Live](${live}) |`;
}

function updateReadme() {
    const contributors = JSON.parse(
        fs.readFileSync(CONTRIBUTORS_FILE, "utf-8")
    );
    const readme = fs.readFileSync(README_FILE, "utf-8");

    const startTag = "<!-- CONTRIBUTORS-START -->";
    const endTag = "<!-- CONTRIBUTORS-END -->";

    const tableHeader = `
| Avatar | Name | Role | GitHub | Live Site |
|:--:|:--|:--|:--:|:--:|
`;
    const rows = contributors.map(generateContributorRow).join("\n");
    const table = `${startTag}\n${tableHeader}${rows}\n${endTag}`;

    // Replace existing contributor section
    const updatedReadme = readme.replace(
        new RegExp(`${startTag}[\\s\\S]*${endTag}`),
        table
    );

    fs.writeFileSync(README_FILE, updatedReadme);
    console.log("✅ README updated with contributors!");
}

updateReadme();
