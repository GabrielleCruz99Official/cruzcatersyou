CREATE PROCEDURE "DBA"."WeekMenu"()
RESULT (itemID varchar(5), itemName text, itemCourse text, itemPrice integer)
BEGIN
    select *
    from caterItems
END

CREATE SERVICE 'weekmenu' TYPE JSON AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS CALL WeekMenu();

