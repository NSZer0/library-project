const {findAuthorById, checkIfUserBorrowedBook} = require("./books.js");

function findAccountById(aryAccounts, strId)
{
  return aryAccounts.find((oAccount) => oAccount.id === strId);
}

function sortAccountsByLastName(aryAccounts)
{
  return aryAccounts.sort((oAccountA, oAccountB) =>
    oAccountA.name.last.toLowerCase() < oAccountB.name.last.toLowerCase() ? -1 : 1);
}

function getTotalNumberOfBorrows({id}, aryBooks)
{
  return aryBooks.reduce((nBorrowTotal, oBook) => nBorrowTotal += checkIfUserBorrowedBook(oBook, id), 0);
}

function getBooksPossessedByAccount({id}, aryBooks, aryAuthors)
{
  return aryBooks.reduce((aryResult, oBook) => {
    if (checkIfCurrentlyBorrowed(oBook, id))
    {
      const oCurrentBook = {
        ...oBook,
        author: findAuthorById(aryAuthors, oBook.authorId)
      }

      aryResult.push(oCurrentBook);
    }

    return aryResult;
  }, []);
}

// Helper functions
const checkIfCurrentlyBorrowed = (oBook, strId) =>
  oBook.borrows.some((borrow) => borrow.id === strId && !borrow.returned);

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
