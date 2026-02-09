import * as fs from 'fs';
import type { Book } from './types.ts';

export class BookRepository {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public findAll(): Book[] {
        if(!fs.existsSync(this.filePath)) return [];

        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return data.split('\n')
                .filter(line => line.trim().length > 0)
                .map(line => this.parseLine(line));
        } catch (error) {
            throw new Error('Failed to read the database file: ${this.filePath}');
        }
    }

    private parseLine(line: string): Book {
        const [name, author, isbn, publishYear] = line.split('/');
        return {name, author, isbn, publishYear: parseInt(publishYear) || 0};
    }

    public save(books: Book[]): void {
        const content = books
            .map(book => `${book.name}/${book.author}/${book.isbn}/${book.publishYear}`)
            .join('\n');
        fs.writeFileSync(this.filePath, content, 'utf-8');
    }
}
