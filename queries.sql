-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT 
    productname, categoryname
    FROM Product
join category ON product.CategoryId = category.id
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT 
      id, shipper.CompanyName, orderdate
      FROM 'order'
  JOIN shipper ON 'order'.shipvia = shipper.id
  WHERE orderdate < '2012-08-09'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT Productname, quantity FROM 'orderdetail'
      join Product 
    ON orderdetail.ProductId = product.Id
    where orderid = 10251
    order by productname
    
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. 
-- Displays 16,789 records.
SELECT id, shipname as CustomerCompanyName, employee.LastName as employeeLastName
    FROM 'order'
    join employee
        ON 'order'.employeeid = employee.id