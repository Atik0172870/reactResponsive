export class Invitation {
    constructor() {
        this.createInvitationCode = 'Y';
        this.sendInvitationEmail = 'Y';
        this.assignCredential = 'N';
        this.partNumber = '';
        this.credential = '';
        this.userId = 0;
    }
}

export class CreatePass {
    constructor() {
        this.passTemplateId = '';
        this.userId = '';
        this.email = '';
        this.userName = '';

    }
}

