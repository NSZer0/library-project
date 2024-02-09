function findAuthorById(aryAuthors, nId)
{
  return aryAuthors.find((author) => author.id === nId);
}

function findBookById(aryBooks, strId)
{
  return aryBooks.find((book) => book.id === strId);
}

function partitionBooksByBorrowedStatus(aryBooks)
{
  return [filterBooksByStatus(aryBooks, true), filterBooksByStatus(aryBooks, false)];
}

function getBorrowersForBook(oBook, aryAccounts)
{
  const aryAccountsWithBookStatus = [];
  const aryMatchingAccounts = aryAccounts.filter((account) => checkIfUserBorrowedBook(oBook, account.id));
  for(const strAccountName in aryMatchingAccounts)
  {
    const oAccount = aryMatchingAccounts[strAccountName];
    const bBookReturned = getBookStatusForUser(oBook, oAccount.id)
    const oCurrentAccount = {
      ...oAccount,
      returned: bBookReturned
    };

    aryAccountsWithBookStatus.push(oCurrentAccount);

    if(aryAccountsWithBookStatus.length === 10)
      break;
  }

  return aryAccountsWithBookStatus;
}

// Helper functions
const filterBooksByStatus = (aryBooks, bCheckIfCheckedOut) =>
  aryBooks.filter((book) => getBooksByStatus(book, bCheckIfCheckedOut));

const getBooksByStatus = ({borrows}, bCheckIfCheckedOut) =>
  bCheckIfCheckedOut ? borrows.some((borrow) => !borrow.returned) : borrows.every((borrow) => borrow.returned);

const getBookStatusForUser = (oBook, strUserId) =>
  oBook.borrows.find((borrow) => borrow.id === strUserId).returned;

const checkIfUserBorrowedBook = (oBook, strId) =>
  oBook.borrows.some((borrow) => borrow.id === strId);

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  checkIfUserBorrowedBook,
  getBooksByStatus,
};
