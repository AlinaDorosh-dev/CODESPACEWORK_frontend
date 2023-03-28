/**
 * @fileoverview Function to obtain "X" skills where 'X' represents the quantity, returns an array of skills without repetitions
 * @author Daniel Sánchez Gonzalez
 */

const mokcSkills = (quantity) => {

    const skills = ["Mongo","Express","HTML5", "ReactJS", "CSS3", "JavaScript", "MySQL", "SASS", "NextJS", "TypeScript", "Bootstrap", "NodeJS", "Git", "Python", "Django", "Java", "C#", "C++", "C", "PHP", "Ruby", "Swift", "Kotlin", "Go", "Rust", "R", "Scala", "Perl", "Objective-C", "Angular", "VueJS", "Ionic", "Flutter", "Laravel", "Symfony", "ASP.NET", "Ruby on Rails", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Firebase", "Heroku", "Netlify", "Vercel", "DigitalOcean", "Terraform", "Ansible", "Travis CI", "Circle CI", "GitLab CI", "GitHub Actions", "Bitbucket Pipelines", "Bash", "PowerShell", "GraphQL", "REST", "JSON", "XML", "YAML", "Markdown", "Jira", "Confluence", "Trello", "Slack", "Discord", "Zoom", "Google Meet", "Microsoft Teams", "WebRTC", "WebSockets"];
    let skillsArray = [];

    for (let i = 0; i < quantity ; i++) {
        let randomSkill = skills[Math.floor(Math.random() * skills.length)];
        skillsArray.push(randomSkill);
        skills.splice(skills.indexOf(randomSkill), 1);
    }
    return skillsArray;
}

export default mokcSkills;