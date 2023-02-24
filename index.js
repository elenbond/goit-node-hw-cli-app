const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contacts.addContact({ name, email, phone });
            return console.log(newContact);
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "10" });
// invokeAction({ action: "add", name: "Denis Zabolotnyi", email: "nati.zajka@gmail.com", phone: "(093) 004-3110" });
// invokeAction({ action: "remove", id: "uWEY3NyjJSiTI0Usi-V6D" });
invokeAction(argv);