CREATE TABLE caterItems (
	itemID varchar(5) NOT NULL,
	itemName text NOT NULL,
	itemCourse text NOT NULL,
	itemPrice int NOT NULL,
	CONSTRAINT pkID PRIMARY KEY(itemID)
);

CREATE TABLE caterWeekMenu (
  	weekItemID varchar(5) NOT NULL,
  	weekItem text NOT NULL,
  	weekItemPrice int NOT NULL,
  	CONSTRAINT pkWeekItem PRIMARY KEY(weekItem),
  	CONSTRAINT fkID FOREIGN KEY(weekItemID) REFERENCES caterItems(itemID)
  );

INSERT INTO caterItems(itemID, itemName, itemCourse, itemPrice) values
('APP01', 'Spring Rolls(10 pcs)', 'Appetizer', '12'),
('APP02', 'Chicken Pasta Salad', 'Appetizer', '8'),
('APP03', 'Summer Rolls(3 pcs)', 'Appetizer', '6'),
('ENT01', 'Kare-Kare', 'Main', '10'),
('ENT02', 'Sweet and Sour Fish', 'Main', '12'),
('ENT03', 'Roasted Chicken', 'Main', '12'),
('DES01', 'Mini Cheesecake', 'Dessert', '6'),
('DES02', 'Leche Flan', 'Dessert', '8'),
('DES03', 'Apple Crumble', 'Dessert', '6');

CREATE TABLE caterOrderSimple(
    clientName varchar(50) NOT NULL,
    clientAddress text NOT NULL,
    orderTotalPrice float NOT NULL,
    CONSTRAINT pkClient PRIMARY KEY(clientName)
);

CREATE TABLE caterOrderFull(
    clientName2 varchar(50) NOT NULL,
    orderItemID varchar(5) NOT NULL,
    orderItem text NOT NULL,
    orderItemPrice int NOT NULL,
    orderItemQty int NOT NULL,
    CONSTRAINT pkClient PRIMARY KEY(clientName2),
    CONSTRAINT fkName FOREIGN KEY(clientName2) REFERENCES caterOrderSimple(clientName) ON DELETE CASCADE,
    CONSTRAINT fkItem FOREIGN KEY(orderItemID) REFERENCES caterItems(itemID) ON DELETE CASCADE
);


