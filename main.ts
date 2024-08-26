#! /usr/bin/env node

import { number, select } from "@inquirer/prompts";
import chalk from "chalk";

//interface for bank acc

interface BankAccount {
    accountNumber : number;
    userBalance : number;
    widhdraw(amount : number) : void; 
    deposit(amount : number) : void;
    checkBalance() : void;
}
                                        //BANK CLASS

//class for bank account

class BankAccount implements BankAccount{                             //implements allows the class to inherit interface properties..
   accountNumber: number;
   userBalance: number;

   constructor(accNum : number , urBalance : number){
    this.accountNumber = accNum;
    this.userBalance = urBalance;
   }

// widhdrawing money method
widhdraw(amount: any|number): void {
    if(this.userBalance >= amount){
        this.userBalance-=amount;
        console.log(chalk.green(`${amount}PKR widhdrawed successfully, if you haven't made this transaction please inform +92********** `));
        console.log(chalk.red(`\tRemaining Balance : ${this.userBalance}PKR\t`));
        console.log("-".repeat(70));
    }
    else{
        console.log(chalk.red("Insufficient balance, transaction failed!"));
    }
}

//depositing money method
deposit(amount: any|number): void {
    if(amount > 100){
        amount -+ 1;  // tax charges
        this.userBalance += amount;
        console.log(chalk.red("$1 deducted from your amount as tax charges.."));
        console.log("*".repeat(10));
        console.log(chalk.green(`$${amount} successfully deposited into you account balance`));
        console.log(chalk.blue(`\tRemaining Balance : ${this.userBalance}\t`));
        console.log("-".repeat(70));
    }
    else{
        this.userBalance += amount;
        console.log(chalk.green(`$${amount} successfully deposited into you account balance`));
        console.log(chalk.blue(`\tRemaining Balance : ${this.userBalance}\t`));
        console.log("-".repeat(70));
    }
}

//check balance method
checkBalance(): void {
    console.log(chalk.blue(`\tCurrent Balance : ${this.userBalance}\t`));
    console.log("-".repeat(70));
}
}

                                        //CUSTOMER CLASS
//customer class
class Customer{
    firstName : string;
    lastName : string;
    age : number;
    gender : string;
    mobileNumber : number;
    account : BankAccount;

    constructor(firstName : string,lastName : string,age : number,gender : string, mobileNumber : number ,account : BankAccount){
       
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//create bank accounts
const bankAccounts : BankAccount[] = [
    new BankAccount (10001,5000),
    new BankAccount (10002,10000),
    new BankAccount (10003,15000)
];

//create customers
const customers : Customer[]=[
    new Customer ("Ashna","Ghazanfar",17,"Female",+923312392814,bankAccounts[0]),
    new Customer ("Fatima","Zeeshan",15,"Female",+923312353781,bankAccounts[1]),
    new Customer ("Moiz","Akram",20,"Female",+923379326814,bankAccounts[2])
]

 async function interact(){
    do{
        const message1 = await number ({
        message:"Enter your account number :"
        })
        const customers1 = customers.find(customer => customer.account.accountNumber === message1);
        if(customers1){
            console.log("-".repeat(70));
            console.log(chalk.greenBright(`Welcome, ${customers1.firstName} ${customers1.lastName}`));
            const inputAnswer = await select({
                message:"Please select what you would like to do:",
                choices:[{value:"Deposit"},{value:"Widhdraw"},{value:"CheckBalance"},{value:"Exit"}]
            })
            if(inputAnswer === "Deposit"){
                const depositamount = await number({
                    message:"Enter the amount you want to deposit :"
            });
            customers1.account.deposit(depositamount);
            }
            if(inputAnswer === "Widhdraw"){
                const widhdrawamount = await number({
                    message:"Enter the amount you want to widhdraw :"
            });
            customers1.account.widhdraw(widhdrawamount);
            }
        if(inputAnswer === "CheckBalance" ){
           customers1.account.checkBalance()
        }
        if(inputAnswer === "Exit"){
           console.log(chalk.blueBright.bold("\n\tExiting the program..."));
           console.log("-".repeat(70));
           console.log(chalk.bgCyanBright("\tThank you for using MY BANK\t"));
           process.exit();
        }
    }
    else{
        console.log(chalk.red.italic("Incorrect account number! try again.."))
    }
} 
    while(true);
}
interact();
