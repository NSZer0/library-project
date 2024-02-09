const {getBooksByStatus} = require("./books.js");

function getTotalBooksCount(aryBooks)
{
  return aryBooks.length;
}

function getTotalAccountsCount(aryAccounts)
{
  return aryAccounts.length;
}

function getBooksBorrowedCount(aryBooks)
{
  return aryBooks.filter((oBook) => getBooksByStatus(oBook, true)).length;
}

function getMostCommonGenres(aryBooks)
{
  const aryGenres = aryBooks.reduce((result, oBook) => {
    const genre = result.find((item) => item.name === oBook.genre);
    if (!genre)
    {
        result.push({
            name: oBook.genre,
            count: 1,
        });

        return result;
    }
    
    genre.count += 1;
    return result;
  }, []);

  aryGenres.sort((oGenreA, oGenreB) => oGenreB.count - oGenreA.count);

  return aryGenres.slice(0,5);
}

function getMostPopularBooks(aryBooks)
{
  const aryBooksByPopularity = aryBooks.map((oBook) => {
    return {
        name: oBook.title,
        count: oBook.borrows.length,
    };
  });

  aryBooksByPopularity.sort((oBookA, oBookB) => oBookB.count - oBookA.count);
  
  return aryBooksByPopularity.slice(0,5);
}

function getMostPopularAuthors(aryBooks, aryAuthors)
{
  const aryAuthorsByPopularity = aryAuthors.map((oAuthor) => {
    const aryBooksByAuthor = aryBooks.filter((oBook) => oBook.authorId === oAuthor.id);
    const nTotalBooksBorrowed = aryBooksByAuthor.reduce((nTotalBorrowed, oBook) => oBook.borrows.length, 0);
    return {
        name: `${oAuthor.name.first} ${oAuthor.name.last}`,
        count: nTotalBooksBorrowed,
    };
  });

  aryAuthorsByPopularity.sort((oAuthorA, oAuthorB) => oAuthorB.count - oAuthorA.count);
  
  return aryAuthorsByPopularity.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
