/**
 * Elizabeth Mabishi
 * Andela Javascript Checkpoint 1: Inverted Index
 * Date: 10th June 2016
 * version 1.1
 */

'use strict';

// Import the file reader
const fs = require('fs');

class Index {

  // Method to create an Index
  createIndex(filePath) {
    this.books = JSON.parse(fs.readFileSync(filePath));
    this.indexArray = [];

    /* For each document, turn to string, lowercase, remove special characters
     * and trim beginning of line spaces.
     Use forEach to iterate through each document obtaining its position in the document.
     */
    this.books.forEach((book, docIndex) => {

      var bookObjectString = JSON.stringify(book).toLowerCase()
      .replace(/\W/g, ' ').replace(/\s+/g, ' ')
      .trim();

      // Concatenate document and split at space to form individual words.
      // Map each word to its position in the document
      this.indexArray = this.indexArray.concat(bookObjectString
        .split(' ').map((word, wordIndex) => {
        return (word + ' : ' + docIndex + ' : ' + wordIndex);

      }));

    });
  }

  // Method to return inverted-index from create index method
  getIndex() {

    return this.indexArray;
  }

  // Method to search the index for a term
  searchIndex(term) {

    try {

      if (typeof term === 'string') {
        // Filter the index for a search term
        var results = this.indexArray.filter(wordStatistics => {

          // Ignore case globally through a Regular Expression
          const wordToSearch = new RegExp(term, 'gi');

          // if a true boolean is returned, wordStatistics is added to results array
          return wordToSearch.test(wordStatistics);

        });

        if (results.length === 0) {

          return 'No match has been made';
        }
        return results;

      } else {
        throw "Search term type invalid: not type string.";
      }

    } catch (error) {
      return error;
    }

  }

}

var index = new Index();
//index.createIndex('../books.json');
// console.log(index.getIndex());
// console.log(index.getIndex().length);
// console.log(index.searchIndex('and'));
// console.log(index.searchIndex('rudyard'));
// console.log(index.searchIndex('alice'));
// console.log(index.searchIndex('astronomy'));
// console.log(index.searchIndex('appropriate'));
// console.log(index.searchIndex(090));
// console.log(index.searchIndex(true));

module.exports = Index;