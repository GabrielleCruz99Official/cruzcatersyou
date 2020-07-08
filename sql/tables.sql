CREATE TABLE caterItems (
	itemID varchar(5) NOT NULL,
	itemName text NOT NULL,
	itemType text NOT NULL,
	itemPrice int NOT NULL,
	CONSTRAINT pkID PRIMARY KEY(itemID)
);

CREATE TABLE caterMenu (
	menuID varchar(5) NOT NULL,
	menuItem text NOT NULL,
	menuItemPrice int NOT NULL,
	CONSTRAINT pkMenuID PRIMARY KEY(menuID),
	CONSTRAINT fkID FOREIGN KEY(menuID) REFERENCES caterItems
);

CREATE TABLE caterOrders (
	orderName varchar(16) NOT NULL,
	orderID varchar(5) NOT NULL,
	orderItem text NOT NULL,
	orderItemQty int NOT NULL,
	orderItemQtyPrice int NOT NULL,
	CONSTRAINT pkName PRIMARY KEY(orderName),
	CONSTRAINT fkID FOREIGN KEY(orderID) REFERENCES caterItems
);

