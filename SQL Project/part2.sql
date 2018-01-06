CREATE TABLE TopCustomers (
    FirstName nvarchar(50),
    LastName nvarchar(50),
    Address nvarchar(50),
    City nvarchar(25),
    State nvarchar(2),
    PostalCode integer
);

INSERT INTO TopCustomers
SELECT FirstName, LastName, Address, City, State, PostalCode
FROM customers
INNER JOIN invoices USING (CustomerId)
WHERE Total >= 10
GROUP BY CustomerId
HAVING COUNT(*) = 1;
