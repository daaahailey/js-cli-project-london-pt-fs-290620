const API = require("./lib/API")("./lib/db.json");
const readlineSync = require("readline-sync");
const chalk = require("chalk");



const displayBudget = (budgetLists) => {
  console.log(chalk.inverse.bold("Let's find out where you can go with your budget!"));
  console.log("=========================");
  console.log("====  ", chalk.cyan("Your budget"), "  ====");
  console.log("=========================");
  for (const budgetList of budgetLists) {   
      console.log(`     ${budgetList.id}: ${budgetList.budget}`);
      console.log("-------------------------");
  }
};

const displaySuggestions = (budgetLists) => {
 
  console.log("=========================");
  console.log("====  ", chalk.cyan("Places we suggest"), "  ====");
  console.log("=========================");
  const suggestion = API.read("budgetLists")
  for (const budgetList of budgetLists) {
    console.log(`     ${suggestion.suggestions}`);
    console.log("-------------------------");
  }
};

const pickYourBudget = (budgetLists) => { 
    displayBudget(budgetLists);
    const budgetChoice = readlineSync.question(
      chalk.bold("Please choose a number for your budget ")
    );
    const suggestion = API.read("budgetLists", budgetChoice);
    if (suggestion !== undefined) {
      console.log(chalk.inverse(`You've selected ${suggestion.budget}`));
      console.log("=========================");
      console.log("===  ", chalk.cyan("You can go to"), "  ===");
      console.log("=========================");  
      console.log(`following places >>> ${suggestion.suggestions}`);
      console.log(suggestion.comments);
      //if I tried to write like the one above, its shows [object object]..
    } else {
      console.log(chalk.red("You should choose from 1 - 3"));
      pickYourBudget();
  }
 
};


const suggestNewDestinations = (budgetLists) => {
  console.log("=================================");
  console.log("       Leave comments here");
  console.log("=================================");
  const budgetList = API.read("budgetLists");
  const where = readlineSync.question("Where do you recommend? ");
  const tellMeBudget = readlineSync.question("How much did it cost? ");
  const rating = readlineSync.question("Rating (1-10) ");
  const opinion = readlineSync.question("How was your experience? ");

  // const budgetPlaces = API.read("budgetLists");
  // const budgetList = pickYourBudget(budgePlaces)

  // API.create("budgetLists", newSuggestions);

  budgetList.push({
    budget: tellMeBudget,
    suggestions: where,
    rating: rating,
    comments: opinion,
  });

  
  // update new suggestion in the API
  API.update("budgetLists", budgetList);
  console.log("=================================");
  console.log("   ",chalk.cyan("Thanks for your suggestion!"));
  console.log("=================================");
};


const mainMenu = () => {
  console.log("");
  console.log(chalk.cyan("Travel ideas with budget!"));
  console.log("=================================");
  console.log(" [1] Let's find out where to go ");
  console.log(" [2] Share your experiences ");
  console.log("=================================");

  const mainMenuAnswer = readlineSync.question(
    chalk.bold("Please choose a number from above ")
  );
 
  if (mainMenuAnswer === "1") {
    //shows budget choices
    const budgetLists = API.read("budgetLists");
    pickYourBudget(budgetLists);

    mainMenu();

  } else if (mainMenuAnswer === "2") {
    const budgetLists = API.read("budgetLists");
    suggestNewDestinations(budgetLists);

  } else {
    console.log(chalk.red(`Please write down "number"`));
    mainMenu();
  }
   mainMenu();
};

mainMenu();







// const leaveComment = () => {
//   displayBudget(budgetList);
//   const choice = readlineSync.question(
//     chalk.bold("Please choose a number for your budget ")
//   );

//     const budgetList = API.read("budgetLists");

//     const rating = readlineSync.question("Rating");
//     const opinion = readlineSync.question("What do you think?");

// };