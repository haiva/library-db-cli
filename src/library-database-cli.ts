/**********************************************
 npm install readline-sync
 npm install @types/readline-sync --save-dev
 npm install chalk@4
 npm install @types/chalk --save-dev
 npm install @types/node --save-dev
**********************************************/
import * as fs from 'fs';
import * as readline from 'readline-sync';
import chalk from 'chalk';

interface Book {
    name: string;
    author: string;
    isbn: string;
    year: number;
}

const filename = process.argv[2];

if(!filename) {
    console.log(chalk.red('Please provide a filename as a command-line argument.'));
    process.exit(1);
}

function readDatabase(): Book[] {
    if(!fs.existsSync(filename)) return[];

    const data = fs.readFileSync(filename, 'utf-8');
    return data.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [name, author, isbn, year] = line.split('/');
            return { name, author, isbn, year: parseInt(year) };
        })
        .sort((x, y) => x.year-y.year);
}

function saveDatabase(books: Book[]) {
    books.sort((x, y) => x.year - y.year);
    const data = books.map(b => `${b.name}/${b.author}/${b.isbn}/${b.year}`).join('\n');
    fs.writeFileSync(filename, data, 'utf-8');
}

function getValidYear(): number {
    while (true) {
        const input = readline.question(chalk.green("Publishing year: "));
        const year = parseInt(input);
        
        if (!isNaN(year) && input.trim() !== '' && Number.isInteger(year)) {
            return year;
        }
        
        console.log(chalk.red("Invalid input. Please enter a numeric year."));
    }
}

function mainMenu() {
    while(true) {
        console.log(chalk.greenBright.bold.underline('\nLibrary Database'));
        console.log(chalk.green('1. Add a new book to the db'));
        console.log(chalk.green('2. View all books in the db, sorted by publishing year'));
        console.log(chalk.green('Q. Exit'));
        const choice = readline.question(chalk.green.bold('\nEnter your choice: '));
    
        switch (choice) {
            case '1': {
                const name = readline.question(chalk.green("Book's name: "));
                const author = readline.question(chalk.green("Author's name: "));
                const isbn = readline.question(chalk.green("ISBN: "));
                const year = getValidYear();

                const newBook: Book = { name, author, isbn, year };

                console.log(chalk.greenBright.underline.bold("\nSummary of new book:"));
                console.log(chalk.gray(`Name: ${newBook.name}, Author: ${newBook.author}, ISBN: ${newBook.isbn}, Year: ${newBook.year}`));

                const confirm = readline.question(chalk.greenBright.bold("Do you want to update the library database with this book? (y/n): ")).toLowerCase();
                if (confirm === 'y') {
                    const books = readDatabase();
                    books.push(newBook);
                    saveDatabase(books);
                    console.log(chalk.greenBright.bold("Database updated."));
                }
                break;
            }
            case '2': {
                const books = readDatabase();
                console.log(chalk.greenBright.bold.underline('\nCurrent Database Content (sorted by publishing year)'));
                books.forEach(b => {
                    console.log(chalk.gray(`[${b.year}] ${b.name.padEnd(20)} | ${b.author.padEnd(20)} | ISBN: ${b.isbn}`));
                });
                break;
            }
            case 'Q': {
                console.log(chalk.greenBright.bold("Exiting, thanks for using the Library Database!"));
                process.exit(0);
            }
            default:
                console.log(chalk.red("Invalid choice. Please enter another."));
        }
    }        
}

mainMenu();
