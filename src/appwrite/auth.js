import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount ({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            console.log("error in appwrite :: createAccount")
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createSession(email,password)
        } catch (error) {
            console.log("error in appwrite :: login")
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error in appwrite :: getCurrentUser")
            throw error
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()
export default authService