export class Message {
    constructor(public message: string, public isUserMessage: boolean, public isOnWriting: boolean) {
        this.message = message;
        this.isUserMessage = isUserMessage;
        this.isOnWriting = isOnWriting;
    }
}
