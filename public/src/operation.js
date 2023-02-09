import { dbConnect } from "../config/connect.js";
import inquirer from "inquirer";
import options from "./options.js";

const procedure = async (select) => {
  switch (select) {};

  const continuePrompt = async () => {
    const response = await inquirer.prompt([
      {
        type: "confirm",
        message: "Would you like to continue?",
        name: "continue",
      },
    ]);
    if (response.continue) {
      await options();
    } else {
      process.exit();
    }
  };
  await continuePrompt();
}


export default procedure.js; 