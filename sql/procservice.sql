CREATE PROCEDURE "DBA"."WeekMenu"()
RESULT (itemID varchar(5), itemName text, itemCourse text, itemPrice integer)
BEGIN
    select *
    from caterItems
END

CREATE SERVICE "weekmenu" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL WeekMenu();

ALTER PROCEDURE "DBA"."SetMenu"(IN chosenItemID varchar(5))
RESULT (status int)
BEGIN
   DECLARE @status int;
   IF (existentItem(chosenItemID) = 1)
   THEN BEGIN
        INSERT INTO caterWeekMenu(weekItemID, weekItem, weekItemPrice)
        SELECT itemID, itemName, itemPrice FROM caterItems WHERE itemID = chosenItemID;
        SET @status = 200;
   END
   ELSE BEGIN
        SET @status = 503;
   END
   ENDIF;
   SELECT @status;
END

CREATE SERVICE "setweek" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL SetMenu(:chosenItemID, :chosenItem, :chosenItemPrice);

ALTER PROCEDURE "DBA"."ClearMenu"()
RESULT (status int)
BEGIN
    DECLARE @status int;
    DELETE FROM caterWeekMenu;
    IF (existentMenu() > 0)
        THEN SET @status = 501;
    ELSE BEGIN
        SET @status = 200;
        END
    ENDIF;
    SELECT @status;
END

CREATE SERVICE "clearmenu" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL ClearMenu();

CREATE PROCEDURE "DBA"."WeekChosen"()
RESULT (weekItemID varchar(5), weekItem text, weekItemPrice integer)
BEGIN
    select *
    from caterWeekMenu
END

CREATE SERVICE "weekchosen" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" ON METHODS 'GET' AS CALL WeekChosen();

CREATE PROCEDURE "DBA"."SimpleReceipt"(in clientName varchar(50), in clientAddress text, in orderTotalPrice float)
RESULT ("status" int)
BEGIN
    DECLARE @status int;
    INSERT INTO caterOrderSimple(clientName, clientAddress, orderTotalPrice) VALUES
    (clientName, clientAddress, orderTotalPrice);
    SET @status = 200;
    SELECT @status;
END

CREATE SERVICE "simplereceipt" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL SimpleReceipt(:clientName, :clientAddress, :orderTotalPrice);

CREATE PROCEDURE "DBA"."FullReceipt"(in clientName varchar(50), in orderItemID varchar(5), in orderItemQty integer)
RESULT
BEGIN
END

CREATE PROCEDURE "DBA"."ClearReceipts"()
RESULT ("status" int)
BEGIN
    DECLARE @status int;
    DELETE FROM caterOrderFull;
    IF(existentReceiptFull() > 0)
    THEN SET @status =


END



CREATE
