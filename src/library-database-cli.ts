import * as readline from 'readline-sync';
import chalk from 'chalk';
import { BookRepository } from './book-repository.ts';
import { BookService } from './book-service.ts';

const filePath = process.argv[2];

if (!filePath) {
    console.error(chalk.red("Please provide a filename as a command-line argument."));
    process.exit(1);
}

const service = new BookService(new BookRepository(filePath));

function startCli() {
    let running = true;

    while (running) {
        console.log(chalk.greenBright.bold.underline('\nLibrary Database'));
        console.log(chalk.green('1. Add a new book to the db'));
        console.log(chalk.green('2. View all books in the db, sorted by publishing year'));
        console.log(chalk.green('Q. Exit'));
        const choice = readline.question(chalk.green.bold('\nEnter your choice: '));

        switch (choice) {
            case '1':
                addNewBook();
                break;
            case '2':
                printBooks();
                break;
            case 'Q':
            case 'q':
                console.log(chalk.greenBright.bold("Exiting, thanks for using the Library Database!"));
                running = false;
                break;
            default:
                console.log(chalk.red("Invalid choice. Please enter another."));
        }
    }
}

function addNewBook() {
        const name = readline.question(chalk.green("Book's name: "));
        const author = readline.question(chalk.green("Author's name: "));
        const isbn = readline.question(chalk.green("ISBN: "));
        const year = getValidYear();

    if (isNaN(year)) {
        console.log(chalk.red("Invalid input. Please enter a numeric year."));
        return;
    }

    const newBook = { name, author, isbn, publishYear: year };
    console.log(chalk.greenBright.underline.bold("\nSummary of new book:"));
    console.log(chalk.gray(`Name: ${newBook.name}, Author: ${newBook.author}, ISBN: ${newBook.isbn}, Year: ${newBook.publishYear}`));

    const confirm = readline.question(chalk.greenBright.bold("Do you want to update the library database with this book? (y/n): ")).toLowerCase();

    if (confirm.toLowerCase() === 'y') {
        service.addBook({ name, author, isbn, publishYear: year });
        console.log(chalk.greenBright.bold("Database updated."));
    }
}

function printBooks() {
    const books = service.getBooksSortedByYear();
    console.log(chalk.greenBright.bold.underline('\nCurrent Database Content (sorted by publishing year)'));
    books.forEach(b => {
        console.log(chalk.gray(`[${b.publishYear}] ${b.name.padEnd(20)} | ${b.author.padEnd(20)} | ISBN: ${b.isbn}`));
    });
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

startCli();