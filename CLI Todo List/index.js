const { program } = require("commander");
const fs = require("fs");


const addTodo = (options) => {
  // 1. read the todo json file
  const stringeData = fs.readFileSync("./db.json", "utf-8");
  const data = JSON.parse(stringeData);
  // 2. push opject into array
  const newTodo = {
    id: Date.now(),
    title: options.title,
    date: options.date,
  };
  data.push(newTodo);
//   3. wtite in json file
fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
}

// Display todo list
const listTodos = ()=> {
    const stringData = fs.readFileSync('./db.json', 'utf-8');
    const data = JSON.parse(stringData);
    console.log(data);
};

// Update todo
const updateTodo = (options) => {
     console.log(options);
    // read file
    const stringData = fs.readFileSync('./db.json', 'utf-8');
    const data = JSON.parse(stringData);

    // find todo
    const  todo = data.find((item) => item.id == options.id);

    if(!todo) {
        console.log("todo not found");
        return;
    }

    // update values
    todo.title = options.title;
    todo.date = options.date;

    // save values
    fs.writeFileSync('./db.json',JSON.stringify(data, null,2));

      console.log("Todo updated successfully.");
};

// Delete todo
const deleteTodo = (options) => {
    // read file
    const stringdata = fs.readFileSync('./db.json', 'utf-8');
    const data = JSON.parse(stringdata);

    // remove to do
    const newData = data.filter((item) => item.id !== Number(options.id));

    if(newData.length === data.length) {
        console.log("Todo not found");
        return;
    };

    // save file
    fs.writeFileSync('./db.json', JSON.stringify(newData, null, 2));
    
    console.log("Todo deleted successfully.");

};


program
  .command("addTodo")
  .description("add a todo with title and date")
  .requiredOption("-t, --title <string>", "title of the todo")
  .requiredOption("-d, --date <string>", "date of the todo")
  .action(addTodo);

program
.command("listTodos")
.description("Display all todos")
.action(listTodos);

program
.command("updateTodo")
.description("update a todo")
.requiredOption("-i, --id <number>" , "todo id")
.requiredOption("-t, --title <string>" , "update title")
.requiredOption("-d, --date <string>", "update date")
.action(updateTodo);

program
.command("deleteTodo")
.description("delete a todo")
.requiredOption("-i, --id <number>", "todo id")
.action(deleteTodo);

program.parse();
