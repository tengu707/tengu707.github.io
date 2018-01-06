SELECT * FROM customers
INNER JOIN invoices USING (CustomerId)
INNER JOIN invoice_items USING (InvoiceId)
WHERE TrackId IN (8, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 41, 42, 45, 47, 52, 53);

UPDATE customers
SET SupportRepId = 6
WHERE EXISTS (
    SELECT * FROM customers
    INNER JOIN invoices USING (CustomerId)
    INNER JOIN invoice_items USING (InvoiceId)
    WHERE TrackId IN (8, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 41, 42, 45, 47, 52, 53)
);
