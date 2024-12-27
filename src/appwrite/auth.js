import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (!conf.appwriteUrl || !conf.appwriteProjectId) {
            throw new Error("Appwrite configuration is missing");
        }
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return this.login({ email, password });
        } catch (error) {
            console.error("Error in Appwrite :: createAccount", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createSession(email, password);
        } catch (error) {
            console.error("Error in Appwrite :: login", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            console.log("Error in Appwrite :: getCurrentUser", error);
            throw error;
        }
    }
    

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in Appwrite :: logout", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
