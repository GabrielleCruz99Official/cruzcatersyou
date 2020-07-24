CREATE PROCEDURE "DBA"."WeekMenu"()
RESULT (itemID varchar(5), itemName text, itemCourse text, itemPrice integer)
BEGIN
    select *
    from caterItems
END

CREATE SERVICE 'weekmenu' TYPE JSON AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL WeekMenu();

CREATE PROCEDURE "DBA"."SetMenu"(in chosenItemID varchar(5), in chosenItem text, in chosenItemPrice integer)
RESULT (status int)
BEGIN
   DECLARE @status int;
   IF (existentItem(weekItemID) = 1)
   THEN BEGIN
        INSERT INTO caterWeekMenu(weekItemID, weekItem, weekItemPrice) VALUES
        (chosenItemID, chosenItem, chosenItemPrice);
        SET @status = 200;
   END
   ELSE BEGIN
        SET @status = 503;
   END
   ENDIF;
END

CREATE SERVICE "setweek" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL SetMenu(:chosenItemID, :chosenItem, :chosenItemPrice);

CREATE PROCEDURE "DBA"."ClearMenu"()
RESULT ("status" int)
BEGIN
    DECLARE @status int;
    DELETE FROM caterMenu;
    IF EXISTS (SELECT * FROM caterMenu)
        THEN SET @status = 501;
    ELSE BEGIN
        SET @status = 200;
        END
    ENDIF;
    SELECT @status;
END;

CREATE SERVICE 'clearmenu' TYPE JSON AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL ClearMenu();
