/**
 * @author iRaphiki <imraphiki@gmail.com>
 */
// TODO: COMMENT CODE
export class Candidate {
    constructor(data) {
        if (data) {
            this._id = data._id;
            this.role = data.role;
            this.loginId = data.loginId;
            this.photo = data.photo;
            this.userName = data.userName;
            this.fullName = data.fullName;
            this.email = data.email;
            this.bootcamp = data.bootcamp;
            this.edition = data.edition;
            this.socialNetworks = {
                linkedin: data?.socialNetworks?.linkedin,
                github: data?.socialNetworks?.github,
            };
            this.languages = data.languages;
            this.isLookingForJob = data.isLookingForJob;
            this.description = data.description;
        }
    }
    getLookingForJob() {
        return this.isLookingForJob ? 'yes' : 'no';
    }

    setLookingForJob(isLookingForJob) {
        this.isLookingForJob = isLookingForJob === 'yes' ? true : false;
    }
    getPhoto() {
        return this.photo
            ? 'http://localhost:8000/candidate/photo/' +
                  encodeURIComponent(this.photo)
            : undefined;
    }
    isAdmin() {
        return this.role === 'admin';
    }
}
