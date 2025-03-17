class NotExistResourceError extends Error {
    constructor() {
        super("No such resource found.");
        this.name = "NotExistResourceError";
    }
}

export default NotExistResourceError;