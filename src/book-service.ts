import type { Book } from './types.ts';
import {BookRepository} from './book-repository.ts';

export class BookService {
    private repo: BookRepository;

    constructor(repo: BookRepository) {
        this.repo = repo;
    }

    public getBooksSortedByYear(): Book[] {
        return this.repo.findAll().sort((x, y) => x.publishYear - y.publishYear);
    }

    public addBook(book: Book): void {
        const books = this.repo.findAll();
        books.push(book);
        this.repo.save(books);
    }
}