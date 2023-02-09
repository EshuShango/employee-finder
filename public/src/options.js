import inquirer from "inquirer";
import procedure from "./operation.js";
const options = async () => {
  const response = await inquirer.prompt([])

  await procedure(response.select);
};
export default options;
