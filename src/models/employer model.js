/**
 * @author VeroniKa <vsc1972@gmail.com>
 */
export class Employer {
    constructor(data) {
        if (data) {
            this._id = data._id;
            this.role = data.role;
            this.username = data.username;
            this.loginId = data.loginId;
            this.email = data.email;
            this.companyName = data.companyName;
            this.phone = data.phone;
            this.website = data.website;
            this.isLookingForEmployees = data.isLookingForEmployees;
            this.description = data.description;
            this.logo = data.logo;
            this.jobs = data.jobs;
        }
    }
    getLookingForEmployees() {
        return this.isLookingForEmployees ? 'yes' : 'no';
    }

    setLookingForEmployers(isLookingForEmployees) {
        this.isLookingForEmployees =
            isLookingForEmployees === 'yes' ? true : false;
    }
    getLogo() {
        return this.logo
            ? 'http://localhost:8000/employer/logo/' +
                  encodeURIComponent(this.logo)
            : undefined;
    }
    isAdmin() {
        return this.role === 'admin';
    }
}
