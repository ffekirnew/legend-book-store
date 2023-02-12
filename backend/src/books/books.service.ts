import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  /**
   * Retrieves all books from the database.
   * 
   * @returns {Promise<Book[]>} A promise that resolves to a list of books.
   * @throws {NotFoundException} If no books exist in the database.
   */
  async getAllBooks(): Promise<Book[]> {
    const books: Book[] = await this.bookRepository.find();

    if (!books) {
      throw new NotFoundException(`No books are found in the database.`)
    }

    return books;
  }

  /**
   * Retrieves a book from the database by ID.
   *
   * @param {number} id - The ID of the book to retrieve.
   * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
   * @throws {NotFoundException} If the book with the specified ID is not found.
   */
  async getBookByID(id: number): Promise<Book> {
    const found: Book = await this.bookRepository.findOne({ where: { id }});

    if (!found) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    return found;
  }

  /**
   * Returns the file name of the book's cover.
   * 
   * @param {number} id - the ID o fthe book whose cover is to be retrieved.
   * @throws {NotFoundException} if the book with the said id doesn't exist in the database.
   * @returns {Promise<string>} a string that contains the file name of the book.
   */
  async getBookCover(id: number): Promise<string> {
    const book = await this.getBookByID(id);

    return book.coverImage;
  }

  /**
   * Adds a new book to the database.
   * 
   * @param createBookDto The book to be created
   * @returns A Promise that resolves to a Book entity that was just added to the database.
   */
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.category = createBookDto.category;
    book.backgroundStory = createBookDto.backgroundStory;
    book.exampleQuote = createBookDto.exampleQuote;
    book.synopsis = createBookDto.synopsis;
    book.price = createBookDto.price;
    book.coverImage = createBookDto.coverImage;

    return this.bookRepository.save(book);
  }

  /**
   * Updates a book in the database.
   * 
   * @param {number} id The id of the book to be updated.
   * @param {CreateBookDto} updateBookDto The data for the new book.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<Book>} A promise that resolves to the updated book.
   */
  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book: Book = await this.getBookByID(id);

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;
    book.price = updateBookDto.price;

    // Add the book to the database
    return await this.bookRepository.save(book);
  }

  /**
   * Deletes a book in the database.
   * 
   * @param {number} id The id of the book to be deleted.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<void>} Nothing.
   */
  async deleteBook(id: number): Promise<void> {
    const found: Book = await this.getBookByID(id);

    if (!found) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    
    await this.bookRepository.delete(id);
  }
}
