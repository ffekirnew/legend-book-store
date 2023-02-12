import { Controller, Post, Body, UploadedFile, Req, UseInterceptors, Get, Put, Delete, Param, ParseIntPipe, Res, HttpCode, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Retrieves a book from the database by its ID.
   *
   * @returns {Promise<Book[]>} All books found in the database.
   * @throws {NotFoundException} If the no books exist in the database.
   */
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }
  
  /**
   * Retrieves a book from the database by its ID.
   *
   * @param {number} id - The ID of the book to retrieve.
   * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
   * @throws {NotFoundException} If the book with the specified ID is not found.
   */
  @Get("/:id")
  async getBookByID(@Param("id", ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.getBookByID(id);
  }

  /**
   * Returns the file name of the book's cover.
   * 
   * @param {number} id - the ID o fthe book whose cover is to be retrieved.
   * @throws {NotFoundException} if the book with the said id doesn't exist in the database.
   * @returns {Promise<string>} a string that contains the file name of the book.
   */
  @Get("/:id/cover")
  async getImage(@Param("id") id: number, @Res() res: Response,) {
    const imagePath = "./files/" + await this.booksService.getBookCover(id);

    const image = fs.readFileSync(imagePath);
    res.contentType('image/jpg');
    res.send(image);
  }

  /**
   * Creates a new book in the database.
   * 
   * @param {CreateBookDto} createBookDto The data for the new book.
   * @returns {Promise<Book>} A promise that resolves to the newly created book.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard())
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() coverImage,
  ) {
    createBookDto.coverImage = coverImage.filename;

    return this.booksService.createBook(createBookDto);
  }

  /**
   * Updates a book in the database.
   * 
   * @param {number} id The id of the book to be updated.
   * @param {CreateBookDto} updateBookDto The data for the new book.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<Book>} A promise that resolves to the updated book.
   */
  @Put(":id")
  @HttpCode(204)
  async updateBook(@Param("id", ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.booksService.updateBook(id, updateBookDto);
  }

  /**
   * Deletes a book in the database.
   * 
   * @param {number} id The id of the book to be deleted.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  @Delete(":id")
  @HttpCode(204)
  async deleteBook(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.booksService.deleteBook(id);
  }
}
